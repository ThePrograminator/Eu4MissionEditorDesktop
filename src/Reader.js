import React, { useContext } from "react";

import Factory from "./helper/Factory";

const electron = window.require("electron");
const fs = electron.remote.require("fs");
const dialog = electron.remote.dialog;
var path = require("path");

const singleVariableMapping = [
  { name: "slot", type: "int" },
  { name: "generic", type: "boolean" },
  { name: "ai", type: "boolean" },
  { name: "has_country_shield", type: "boolean" },
  { name: "icon", type: "string" },
  { name: "position", type: "int" },
  { name: "completed_by", type: "string" },
];
let seriesId = 0;
let missionId = 0;

const Reader = {
  asyncHandleFile: async (file, availableId, callback) => {
    var fileContent;
    try {
      fileContent = fs.readFileSync(file).toString();
    } catch (err) {
      return;
      // Here you get the error when the file was not found,
      // but you also get any other error
    }
    const correctedPath = file.replace(/\\/g, "/");
    var fileName = path.basename(correctedPath);
    seriesId = 0;
    missionId = 0;

    const extName = path
      .extname(correctedPath)
      .toLocaleLowerCase()
      .substring(1);

    let fileObj = {
      name: fileName,
      fullDirPath: file,
      type: extName,
    };
    console.log("fileObj", fileObj);

    let allSeries = [];
    let allMissions = [];
    let allMissionTabs = [];

    var wholeString = fileContent;
    console.log("wholeString", wholeString);
    let regex = new RegExp("#.+\r\n", "g");
    wholeString = wholeString.replace(regex, "\r\n");
    while (true) {
      var first = wholeString.indexOf("{");
      if (first === -1) break;

      //Find series
      var index = Reader.findClosingBracketIndex(wholeString, first);
      var stringArr = wholeString.substring(0, ++index);
      var seriesText = Reader.cleanUpSeries(stringArr);
      const series = Reader.handleSeries(seriesText);
      allSeries.push(series);

      //remove series from string
      wholeString = wholeString.substring(++index, wholeString.length);
      console.log("\n");
    }

    console.log("allSeries", allSeries);

    allSeries.map((series) =>
      series.missions.map((mission, index) => {
        mission.position.x = series.slot * 150;
        if (mission.data.position !== -1)
          mission.position.y = mission.data.position * 150;
        else {
          mission.data.position = index + 1;
          mission.position.y = mission.data.position * 150;
        }
        if (mission.data.completed_by !== "") {
          let date = mission.data.completed_by.split(".");
          let year = date[0];
          let month = date[1];
          let day = date[2];
          mission.data.year = year;
          mission.data.month = month;
          mission.data.day = day;
        }
        mission.data.selectedSeries = series.id;

        allMissions.push(mission);
      })
    );
    const connections = Reader.createConnections(allMissions);
    const newMissionTab = Factory.createDefaultMissionTab(
      availableId,
      fileName.substring(0, fileName.indexOf(".")),
      extName
    );
    newMissionTab.series = allSeries;
    newMissionTab.missions = allMissions;
    newMissionTab.edges = connections;
    console.log("newMissionTab", newMissionTab);
    newMissionTab.edges.map((edge) => {
      newMissionTab.missions.push(edge);
    });
    newMissionTab.importedMissionLastId = missionId;
    newMissionTab.importedSeriesLastId = seriesId;
    console.log("newMissionTab", newMissionTab);
    allMissionTabs.push(newMissionTab);

    console.log("allMissionTabs", allMissionTabs);
    callback(allMissionTabs);
  },
  handleBlockBracketString: function (line, splitCleanedUp) {
    var stringConcat = "";
    var lineStart = line;
    let level = 1;
    var levelIncreased = false;
    while (true) {
      lineStart++;
      var bracketText = splitCleanedUp[lineStart];

      //inline doesn't count towards the level
      if (bracketText.search("{.+}") != -1) {
        //levelIncreased = true;
        //stringConcat += bracketText + "\n";
        //continue;
      } else if (bracketText.search("{") != -1) {
        levelIncreased = true;
        level++;
      } else if (bracketText.search("}") != -1) {
        level--;
      }

      if (level === 0) {
        break;
      } else {
        var tabs = "";
        if (level !== 1) {
          var startingIndex = levelIncreased ? 2 : 1;
          for (let index = startingIndex; index < level; index++) {
            tabs += "\t";
          }
          levelIncreased = false;
        }

        stringConcat += tabs + bracketText + "\n";
      }
    }

    return { lineStart, stringConcat };
  },
  handleBlockBracketArray: function (line, splitCleanedUp) {
    var arr = [];
    var lineStart = line;
    let level = 1;
    while (true) {
      lineStart++;
      var bracketText = splitCleanedUp[lineStart];
      bracketText = bracketText.trim();

      if (bracketText.search("{") !== -1) {
        level++;
      } else if (bracketText.search("}") !== -1) {
        level--;
      }

      if (level === 0) {
        break;
      } else {
        arr.push(bracketText);
      }
    }

    return { lineStart, arr };
  },
  handleInlineBracket: function (string) {
    var inlineString = string.trim();
    inlineString = inlineString.substring(
      inlineString.indexOf("{") + 1,
      inlineString.length - 1
    );
    inlineString = inlineString.trim();
    if (inlineString === "") return "";
    const elements = inlineString.split(" ");

    return elements;
  },
  switchVariableType: function (variable, value) {
    let type = null;
    for (let index = 0; index < singleVariableMapping.length; index++) {
      const element = singleVariableMapping[index];
      if (element.name === variable) {
        type = element.type;
        break;
      }
    }
    if (variable === "has_country_shield") {
      console.log("Reader has_country_shield value", value);
    }

    switch (type) {
      case "int":
        return parseInt(value);
      case "string":
        return value;
      case "boolean":
        if (value === "yes") return true;
        else return false;
      default:
        return null;
    }
  },
  findSeriesVariable: function (str) {
    if (str === "potential_on_load" || str === "potential") {
      return true;
    }
    return false;
  },
  handleMission: function (lineStart, splitCleanedUp) {
    let first = true;
    var availableId = `node_${missionId.toString()}`;
    let newMission = Factory.createDefaultMission(availableId);
    let foundPosition = false;
    for (var line = lineStart; line < splitCleanedUp.length; line++) {
      var string = splitCleanedUp[line];
      string = string.trim();
      if (!first && string === "}") {
        lineStart = line;
        break;
      }
      if (!first && string.search("=") === -1) {
        continue;
      }
      var variable = string.split("=");
      variable[0] = variable[0].trim();
      variable[1] = variable[1].trim();
      if (first) {
        newMission.data = {
          ...newMission.data,
          label: variable[0],
        };
        first = false;
        continue;
      }
      // No Bracket
      if (string.search("{") === -1) {
        newMission.data = {
          ...newMission.data,
          [variable[0]]: this.switchVariableType(variable[0], variable[1]),
        };
        if (variable[0] === "position") {
          foundPosition = true;
        }
        continue;
      }

      //Inline Brackets
      if (string.search("{.+}") !== -1) {
        newMission.data = {
          ...newMission.data,
          [variable[0]]: this.handleInlineBracket(string),
        };
        continue;
      }

      //Not inline Bracket
      if (string.search("{") !== -1) {
        if (variable[0] !== "required_missions") {
          let { lineStart, stringConcat } = this.handleBlockBracketString(
            line,
            splitCleanedUp
          );
          line = lineStart;

          newMission.data = {
            ...newMission.data,
            [variable[0]]: stringConcat,
          };
        } else {
          let { lineStart, arr } = this.handleBlockBracketArray(
            line,
            splitCleanedUp
          );
          line = lineStart;

          newMission.data = {
            ...newMission.data,
            [variable[0]]: arr,
          };
        }
      }
    }
    console.log("mission", newMission);
    missionId++;
    return { lineStart, newMission, foundPosition };
  },
  handleSeries: function (str) {
    var splitCleanedUp = str.split("\n");
    let first = true;
    var availableId = `series_${seriesId.toString()}`;
    let newSeries = Factory.createDefaultSeries(availableId);
    for (var line = 0; line < splitCleanedUp.length; line++) {
      var string = splitCleanedUp[line];
      if (!first && string.search("=") === -1) {
        continue;
      }
      var variable = string.split("=");
      variable[0] = variable[0].trim();
      variable[1] = variable[1].trim();
      if (first) {
        newSeries = {
          ...newSeries,
          name: variable[0],
        };
        first = false;
        continue;
      }
      // No Bracket
      if (string.search("{") === -1) {
        newSeries = {
          ...newSeries,
          [variable[0]]: this.switchVariableType(variable[0], variable[1]),
        };
        continue;
      }

      // Bracket
      if (string.search("{") != -1) {
        //Series Bracket Variable
        if (this.findSeriesVariable(variable[0])) {
          let { lineStart, stringConcat } = this.handleBlockBracketString(
            line,
            splitCleanedUp
          );
          line = lineStart;

          newSeries = {
            ...newSeries,
            [variable[0]]: stringConcat,
          };
          continue;
        }

        let { lineStart, newMission, foundPosition } = this.handleMission(
          line,
          splitCleanedUp
        );
        line = lineStart;
        if (newSeries.missions.length === 0 && !foundPosition) {
          newMission.data.position = 1;
          newMission.position.y = newMission.data.position * 150;
        } else if (!foundPosition) {
          let position =
            newSeries.missions[newSeries.missions.length - 1].data.position;
          newMission.data.position = position + 1;
          newMission.position.y = newMission.data.position * 150;
        }
        newSeries.missions.push(newMission);
      }
    }
    console.log("series", newSeries);
    seriesId++;
    return newSeries;
  },
  cleanUpSeries: function (str) {
    var resNew = str.split("\n");
    var cleanedUpString = "";
    //Cleanup
    for (var line = 0; line < resNew.length; line++) {
      var string = resNew[line];
      string = string.trim();
      if (string === "") {
        continue;
      }
      if (string.search("^[#]") != -1) {
        continue;
      }
      if (string.search("#") != -1) {
        var stringArr = string.split("#");
        string = stringArr[0];
      }

      cleanedUpString += string + "\n";
    }
    console.log(cleanedUpString);

    return cleanedUpString;
  },
  findClosingBracketIndex: function (str, pos) {
    let level = 1;
    for (let index = pos + 1; index < str.length; index++) {
      if (str[index] === "{") {
        level++;
      } else if (str[index] === "}") {
        level--;
      }

      if (level === 0) {
        return index;
      }
    }
    return -1;
  },
  createConnections: function (missions) {
    var mappedConnections = [];

    for (let index = 0; index < missions.length; index++) {
      const target = missions[index];
      for (let inner = 0; inner < missions.length; inner++) {
        const source = missions[inner];
        for (let l = 0; l < target.data.required_missions.length; l++) {
          const element = target.data.required_missions[l];
          if (element === source.data.label) {
            const newConnectionMap = {
              id: "e" + source.id + "-" + target.id,
              source: source.id,
              target: target.id,
              type: "step",
            };
            mappedConnections.push(newConnectionMap);
          }
        }
      }
    }

    console.log("mappedConnections", mappedConnections);

    return mappedConnections;
  },
};

export default Reader;
