import React, { useContext } from "react";

import Factory from "./helper/Factory";

const electron = window.require("electron");
const fs = electron.remote.require("fs");
const dialog = electron.remote.dialog;
var path = require("path");

const singleVariableMapping = [
  //EU4
  { name: "slot", type: "int" },
  { name: "generic", type: "boolean" },
  { name: "ai", type: "boolean" },
  { name: "has_country_shield", type: "boolean" },
  { name: "icon", type: "string" },
  { name: "position", type: "int" },
  { name: "completed_by", type: "string" },
  //HOI4
  { name: "id", type: "string" },
  { name: "default", type: "boolean" },
  { name: "reset_on_civil_war", type: "boolean" },
  { name: "shared_focus", type: "string" },
  { name: "cost", type: "int" },
  { name: "x", type: "int" },
  { name: "y", type: "int" },
  { name: "relative_position_id", type: "string" },
  { name: "available_if_capitulated", type: "boolean" },
  { name: "cancel_if_invalid", type: "boolean" },
  { name: "continue_if_invalid", type: "boolean" },
  { name: "will_lead_to_war_with", type: "boolean" },
];

const containerVariableMapping = [
  //EU4
  "potential_on_load",
  "potential",
  //HOI4
  "country",
  "continuous_focus_position",
  "initial_show_position",
];

let containerId = 0;
let missionId = 0;

const Reader = {
  asyncHandleFile: async (file, availableId, type, callback) => {
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
    containerId = 0;
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

    let allContainer = [];
    let allMissions = [];
    let allMissionTabs = [];

    var wholeString = fileContent;
    console.log("wholeString", wholeString);
    let regex = new RegExp("#.+\r\n", "g");
    wholeString = wholeString.replace(regex, "\r\n");
    while (true) {
      var first = wholeString.indexOf("{");
      if (first === -1) break;

      //Find container
      var index = Reader.findClosingBracketIndex(wholeString, first);
      var stringArr = wholeString.substring(0, ++index);
      var containerText = Reader.cleanUpContainer(stringArr);
      const container = Reader.handleContainer(containerText, type);
      allContainer.push(container);

      //remove container from string
      wholeString = wholeString.substring(++index, wholeString.length);
      console.log("\n");
    }

    console.log("allContainer", allContainer);

    //Clean up
    allContainer.map((container) => {
      if (type === 1) container.name = container.id;
      container.missions.map((mission, index) => {
        switch (type) {
          case 0:
            mission = Reader.handleCleanUpMission(mission, container, index);
            break;
          case 1:
            mission = Reader.handleCleanUpFocus(mission, container, index);
            break;
          default:
            break;
        }

        allMissions.push(mission);
      });
    });
    const connections = Reader.createConnections(allMissions, type);
    const newMissionTab = Factory.createDefaultMissionTab(
      availableId,
      fileName.substring(0, fileName.indexOf(".")),
      extName
    );
    newMissionTab.container = allContainer;
    newMissionTab.missions = allMissions;
    newMissionTab.edges = connections;
    console.log("newMissionTab", newMissionTab);
    newMissionTab.edges.map((edge) => {
      newMissionTab.missions.push(edge);
    });
    newMissionTab.importedMissionLastId = missionId;
    newMissionTab.importedContainerLastId = containerId;
    console.log("newMissionTab", newMissionTab);
    allMissionTabs.push(newMissionTab);

    console.log("allMissionTabs", allMissionTabs);
    callback(allMissionTabs);
  },
  handleCleanUpMission: function (mission, container, index) {
    mission.position.x = container.slot * 150;
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
    mission.data.selectedContainer = container.id;
    return mission;
  },
  handleCleanUpFocus: function (mission, container, index) {
    mission.position.x = mission.data.x * 150;
    if (mission.data.y !== -1) mission.position.y = mission.data.y * 150;
    else {
      mission.data.y = index + 1;
      mission.position.y = mission.data.y * 150;
    }
    mission.data.selectedContainer = container.id;
    mission.data.label = mission.data.id;
    return mission;
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
  handleInlineBracket: function (string, type) {
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
  findContainerVariable: function (str) {
    for (let index = 0; index < containerVariableMapping.length; index++) {
      const element = containerVariableMapping[index];
      if (str === element) return true;
    }
    return false;
  },
  handleMission: function (lineStart, splitCleanedUp, type) {
    let first = true;
    var availableId = `node_${missionId.toString()}`;
    let newMission = null;
    switch (type) {
      case 0:
        newMission = Factory.createDefaultMission(availableId);
        break;
      case 1:
        newMission = Factory.createDefaultFocus(availableId);
        break;
      default:
        break;
    }
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
        if (
          variable[0] === "position" ||
          variable[0] === "x" ||
          variable[0] === "y"
        ) {
          foundPosition = true;
        }
        continue;
      }

      //Inline Brackets
      if (string.search("{.+}") !== -1) {
        var stringArray = this.handleInlineBracket(string);
        if (type === 1) {
          stringArray = Reader.cleanupHOIArray(stringArray);
        }
        newMission.data = {
          ...newMission.data,
          [variable[0]]: stringArray,
        };
        continue;
      }

      //Not inline Bracket
      if (string.search("{") !== -1) {
        if (
          variable[0] !== "required_missions" &&
          variable[0] !== "prerequisite"
        ) {
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
          arr = Reader.cleanupHOIString(arr);

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
  cleanupHOIArray: function (stringArray) {
    var copy = [...stringArray];
    for (let index = 0; index < copy.length; index++) {
      const element = copy[index];
      if (element === "focus" || element === "=") {
        copy.splice(element, 1);
        index--;
      }
    }
    stringArray = copy;
    return stringArray;
  },
  cleanupHOIString: function (stringArray) {
    var copy = [...stringArray];
    var newArray = [];
    for (let index = 0; index < copy.length; index++) {
      const element = copy[index];
      var variable = element.split(" ")[2];
      newArray.push(variable);
    }
    return newArray;
  },
  handleContainer: function (str, type) {
    var splitCleanedUp = str.split("\n");
    let first = true;
    var availableId = `container_${containerId.toString()}`;
    let newContainer = null;
    switch (type) {
      case 0:
        newContainer = Factory.createDefaultContainer(availableId);
        break;
      case 1:
        newContainer = Factory.createDefaultFocusTree(availableId);
        break;
      default:
        break;
    }
    for (var line = 0; line < splitCleanedUp.length; line++) {
      var string = splitCleanedUp[line];
      if (!first && string.search("=") === -1) {
        continue;
      }
      var variable = string.split("=");
      variable[0] = variable[0].trim();
      variable[1] = variable[1].trim();
      if (first) {
        newContainer = {
          ...newContainer,
          name: variable[0],
        };
        first = false;
        continue;
      }
      // No Bracket
      if (string.search("{") === -1) {
        newContainer = {
          ...newContainer,
          [variable[0]]: this.switchVariableType(variable[0], variable[1]),
        };
        continue;
      }

      // Bracket
      if (string.search("{") != -1) {
        //Container Bracket Variable
        if (this.findContainerVariable(variable[0])) {
          let { lineStart, stringConcat } = this.handleBlockBracketString(
            line,
            splitCleanedUp
          );
          line = lineStart;

          newContainer = {
            ...newContainer,
            [variable[0]]: stringConcat,
          };
          continue;
        }

        let { lineStart, newMission, foundPosition } = this.handleMission(
          line,
          splitCleanedUp,
          type
        );
        line = lineStart;
        if (newContainer.missions.length === 0 && !foundPosition) {
          newMission.data.position = 1;
          newMission.position.y = newMission.data.position * 150;
        } else if (!foundPosition) {
          let position =
            newContainer.missions[newContainer.missions.length - 1].data
              .position;
          newMission.data.position = position + 1;
          newMission.position.y = newMission.data.position * 150;
        }
        newContainer.missions.push(newMission);
      }
    }
    console.log("container", newContainer);
    containerId++;
    return newContainer;
  },
  cleanUpContainer: function (str) {
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
  createConnections: function (missions, type) {
    var mappedConnections = [];

    for (let index = 0; index < missions.length; index++) {
      const target = missions[index];
      for (let inner = 0; inner < missions.length; inner++) {
        const source = missions[inner];
        var connections = [];
        switch (type) {
          case 0:
            connections = Reader.loopRequiredNodes(
              target,
              source,
              target.data.required_missions,
              type
            );
            break;
          case 1:
            connections = Reader.loopRequiredNodes(
              target,
              source,
              target.data.prerequisite,
              type
            );
            break;
          default:
            break;
        }
        if (connections.length !== 0)
          mappedConnections = mappedConnections.concat(connections);
      }
    }

    console.log("mappedConnections", mappedConnections);

    return mappedConnections;
  },
  loopRequiredNodes: function (target, source, nodes, type) {
    var mappedConnections = [];
    for (let l = 0; l < nodes.length; l++) {
      let element = nodes[l];

      var isConnection = false;
      switch (type) {
        case 0:
          if (element === source.data.label) {
            isConnection = true;
          }
          break;
        case 1:
          if (element === source.data.id) {
            isConnection = true;
          }
          break;
        default:
          break;
      }
      if (isConnection) {
        const newConnectionMap = {
          id: "e" + source.id + "-" + target.id,
          source: source.id,
          target: target.id,
          type: "step",
        };
        mappedConnections.push(newConnectionMap);
      }
    }
    return mappedConnections;
  },
};

export default Reader;

/*

for (let index = 0; index < missions.length; index++) {
      const target = missions[index];
      for (let inner = 0; inner < missions.length; inner++) {
        const source = missions[inner];
        for (let l = 0; l < target.data.required_missions.length; l++) {
          let element = null;
          switch (type) {
            case 0:
              element = target.data.required_missions[l];
              break;
            case 1:
              element = target.data.prerequisite[l];
              break;
            default:
              break;
          }
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



    for (let index = 0; index < missions.length; index++) {
      const target = missions[index];
      for (let inner = 0; inner < missions.length; inner++) {
        const source = missions[inner];
        var connections = [];
        switch (type) {
          case 0:
            connections = Reader.loopRequiredNodes(
              target,
              source,
              target.data.required_missions
            );
            break;
          case 1:
            connections = Reader.loopRequiredNodes(
              target,
              source,
              target.data.prerequisite
            );
            break;
          default:
            break;
        }
        if (connections.length !== 0) mappedConnections.push([...connections]);
      }
    }
*/
