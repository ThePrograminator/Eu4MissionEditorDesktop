import React from "react";
import ReactFlow, { isNode } from "react-flow-renderer";

const Writer = {
  exportMissionTree: function (container, missions) {
    var missionTreeText = "";
    var tabs = 0;
    var tabsText = "";
    for (let index = 0; index < container.length; index++) {
      const container = container[index];
      //name
      missionTreeText += container.name + " " + Writer.addEqualBracket();

      tabs += 1;
      tabsText = Writer.updateTabsText(tabs);

      //slot
      missionTreeText += tabsText + "slot = " + container.slot + "\n";

      //gerneric
      missionTreeText +=
        tabsText + "generic = " + Writer.boolToYesNo(container.generic) + "\n";

      //ai
      missionTreeText +=
        tabsText + "ai = " + Writer.boolToYesNo(container.ai) + "\n";

      //has_country_shield (Optional)
      if (container.has_country_shield) {
        missionTreeText +=
          tabsText +
          "has_country_shield = " +
          Writer.boolToYesNo(container.has_country_shield) +
          "\n";
      }

      //potentialOnLoad (Optional)
      if (Writer.isCorrectValue(container.potential_on_load)) {
        missionTreeText +=
          tabsText +
          "potential_on_load = " +
          Writer.handleBlockInput(container.potential_on_load, tabs + 1);
      }

      //potential
      missionTreeText +=
        tabsText +
        "potential = " +
        Writer.handleBlockInput(container.potential, tabs + 1);

      missionTreeText += "\n";

      tabs += 1;
      tabsText = Writer.updateTabsText(tabs);

      var containerMissionsOne = missions.filter(x => isNode(x));
      var containerMissionsTwo = containerMissionsOne.filter(x => x.data.selectedContainer === container.id);

      var sortedObjs = containerMissionsTwo.sort(
        (a, b) => (a.data.position > b.data.position && 1) || -1
      );

     /* var sortedObjs = container.missions.sort(
        (a, b) => (a.data.position > b.data.position && 1) || -1
      );*/
      for (let index = 0; index < sortedObjs.length; index++) {
        const mission = sortedObjs[index];
        if (!isNode(mission) || container.id !== mission.data.selectedContainer)
          continue;

        //name
        missionTreeText +=
          "\t" + mission.data.label + " " + Writer.addEqualBracket();

        //icon
        missionTreeText += tabsText + "icon = " + mission.data.icon + "\n";

        //gerneric (Optional)
        if (mission.data.generic) {
          missionTreeText +=
            tabsText +
            "generic = " +
            Writer.boolToYesNo(mission.data.generic) +
            "\n";
        }

        //position
        missionTreeText +=
          tabsText + "position = " + mission.data.position + "\n";

        let completedByCorrect = Writer.isCorrectValue(
          mission.data.completed_by
        );

        //completed_by (Optional)
        if (completedByCorrect) {
          missionTreeText +=
            tabsText + "completed_by = " + mission.data.completed_by + "\n";
        }

        //required Missions
        if (mission.data.required_missions.length > 0) {
          let requiredMissionsText = "";
          mission.data.required_missions.map((reMission) => {
            requiredMissionsText += reMission + " ";
          });
          missionTreeText +=
            tabsText + "required_missions = { " + requiredMissionsText + "}\n";
        } else {
          missionTreeText += tabsText + "required_missions = {  }" + "\n";
        }

        //provinces_to_highlight (Optional)
        if (Writer.isCorrectValue(mission.data.provinces_to_highlight)) {
          missionTreeText +=
            tabsText +
            "provinces_to_highlight = " +
            Writer.handleBlockInput(
              mission.data.provinces_to_highlight,
              tabs + 1
            );
        }

        //trigger
        missionTreeText +=
          tabsText +
          "trigger = " +
          Writer.handleBlockInput(mission.data.trigger, tabs + 1);

        //effect
        missionTreeText +=
          tabsText +
          "effect = " +
          Writer.handleBlockInput(mission.data.effect, tabs + 1);

        //end
        missionTreeText += "\t}\n";
      }

      tabs -= 2;
      tabsText = Writer.updateTabsText(tabs);

      missionTreeText += "}\n\n";
    }
    return missionTreeText;
  },
  addEqualBracket: function () {
    return "= {\n";
  },
  boolToYesNo: function (boolean) {
    return boolean ? "yes" : "no";
  },
  handleBlockInput: function (variable, tabs) {
    var result = "";
    if (!Writer.isCorrectValue(variable)) return "{ }\n";

    var trimmedVar = variable.trim();
    var resSplit = trimmedVar.split("\n");
    result = "{\n";
    let tabsTextContent = Writer.updateTabsText(tabs);
    for (let index = 0; index < resSplit.length; index++) {
      const element = resSplit[index];
      result += tabsTextContent + element + "\n";
    }
    let tabsTextEnd = Writer.updateTabsText(tabs - 1);
    result += tabsTextEnd + "}\n";
    return result;
  },
  isCorrectValue: function (variable) {
    if (variable === undefined) return false;
    else if (variable === null) return false;
    else if (variable === "" || variable === " ") return false;
    else if (variable.trim() === "") return false;
    return true;
  },
  updateTabsText: function (tabs) {
    var tabsText = "";
    for (let index = 0; index < tabs; index++) {
      tabsText += "\t";
    }
    return tabsText;
  },
  exportLocalization: function (container, missions) {
    var localisationText = "l_english:\n";
    for (let index = 0; index < container.length; index++) {
      const container = container[index];

      let containerName = container.name.replace(/_/g, " ");
      containerName = Writer.titleCase(containerName);

      localisationText +=
        "\n #---------------------------------------------------------\n";
      localisationText += " # " + containerName + "\n";
      localisationText +=
        " #---------------------------------------------------------\n\n";

        var containerMissionsOne = missions.filter(x => isNode(x));
        var containerMissionsTwo = containerMissionsOne.filter(x => x.data.selectedContainer === container.id);
  
        var sortedObjs = containerMissionsTwo.sort(
          (a, b) => (a.data.position > b.data.position && 1) || -1
        );

      for (let index = 0; index < sortedObjs.length; index++) {
        const mission = sortedObjs[index];
        if (!isNode(mission) || container.id !== mission.data.selectedContainer)
          continue;

        let name = mission.data.label.replace(/_/g, " ");
        name = Writer.titleCase(name);

        localisationText +=
          " " + mission.data.label + '_title: "' + name + '"\n';
        localisationText += " " + mission.data.label + '_desc: ""\n';
      }
    }
    return localisationText;
  },
  titleCase: function (str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(" ");
  },
};

export default Writer;
