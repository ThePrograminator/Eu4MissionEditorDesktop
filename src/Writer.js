import React from "react";
import ReactFlow, { isNode } from "react-flow-renderer";

const Writer = {
  exportMissionTree: function (containers, missions) {
    var missionTreeText = "";
    var tabs = 0;
    var tabsText = "";
    for (let index = 0; index < containers.length; index++) {
      const container = containers[index];
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

      var containerMissionsOne = missions.filter((x) => isNode(x));
      var containerMissionsTwo = containerMissionsOne.filter(
        (x) => x.data.selectedContainer === container.id
      );

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
  exportFocusTree: function (containers, missions) {
    var focusTreeText = "";
    var tabs = 0;
    var tabsText = "";
    for (let index = 0; index < containers.length; index++) {
      const container = containers[index];
      //name
      focusTreeText += "focus_tree " + Writer.addEqualBracket();

      tabs += 1;
      tabsText = Writer.updateTabsText(tabs);

      //id
      focusTreeText += tabsText + "id = " + container.id + "\n";

      //country
      focusTreeText +=
        tabsText +
        "country = " +
        Writer.handleBlockInput(container.country, tabs + 1);

      //default
      focusTreeText +=
        tabsText + "default = " + Writer.boolToYesNo(container.default) + "\n";

      //reset_on_civil_war
      focusTreeText +=
        tabsText +
        "reset_on_civil_war = " +
        Writer.boolToYesNo(container.reset_on_civil_war) +
        "\n";

      //shared_focus (Optional)
      if (Writer.isCorrectValue(container.shared_focus)) {
        //shared_focus
        focusTreeText +=
          tabsText + "shared_focus = " + container.shared_focus + "\n";
      }

      //potentialOnLoad (Optional)
      if (Writer.isCorrectValue(container.continuous_focus_position)) {
        focusTreeText +=
          tabsText +
          "continuous_focus_position = " +
          Writer.handleBlockInput(
            container.continuous_focus_position,
            tabs + 1
          );
      }

      //potentialOnLoad (Optional)
      if (Writer.isCorrectValue(container.initial_show_position)) {
        focusTreeText +=
          tabsText +
          "initial_show_position = " +
          Writer.handleBlockInput(container.initial_show_position, tabs + 1);
      }

      focusTreeText += "\n";

      tabs += 1;
      tabsText = Writer.updateTabsText(tabs);

      var containerMissionsOne = missions.filter((x) => isNode(x));
      var containerMissionsTwo = containerMissionsOne.filter(
        (x) => x.data.selectedContainer === container.id
      );

      /*var sortedObjs = containerMissionsTwo.sort(
        (a, b) => (a.data.position > b.data.position && 1) || -1
      );*/

      /*var sortedObjs = containerMissionsTwo.sort(function (a, b) {
        return a.data.x - b.data.x || a.data.y - a.data.y;
      });*/

      for (let index = 0; index < containerMissionsTwo.length; index++) {
        const focus = containerMissionsTwo[index];
        if (!isNode(focus) || container.id !== focus.data.selectedContainer)
          continue;

        //name
        focusTreeText += "\tfocus " + Writer.addEqualBracket();

        //id
        focusTreeText += tabsText + "id = " + focus.data.label + "\n";

        //icon
        focusTreeText += tabsText + "icon = " + focus.data.icon + "\n";

        //cost
        focusTreeText += tabsText + "cost = " + focus.data.cost + "\n";

        //allow_branch (Optional)
        if (Writer.isCorrectValue(focus.data.allow_branch)) {
          focusTreeText +=
            tabsText +
            "allow_branch = " +
            Writer.handleBlockInput(focus.data.allow_branch, tabs + 1);
        }

        //x
        focusTreeText += tabsText + "x = " + focus.data.x + "\n";

        //y
        focusTreeText += tabsText + "y = " + focus.data.y + "\n";

        //relative_position_id (Optional)
        if (Writer.isCorrectValue(focus.data.relative_position_id)) {
          focusTreeText +=
            tabsText +
            "relative_position_id = " +
            focus.data.relative_position_id +
            "\n";
        }

        //offset (Optional)
        if (Writer.isCorrectValue(focus.data.offset)) {
          focusTreeText +=
            tabsText +
            "offset = " +
            Writer.handleBlockInput(focus.data.offset, tabs + 1);
        }

        //prerequisite
        if (focus.data.prerequisite.length > 0) {
          let prerequisiteFocusText = "";
          focus.data.prerequisite.map((pqFocus) => {
            prerequisiteFocusText += "focus = " + pqFocus + " ";
          });
          focusTreeText +=
            tabsText + "prerequisite = { " + prerequisiteFocusText + "}\n";
        } else {
          focusTreeText += tabsText + "prerequisite = {  }\n";
        }

        //mutually_exclusive (Optional)
        if (focus.data.mutually_exclusive.length > 0) {
          let mutuallyExclusiveFcousText = "";
          focus.data.mutually_exclusive.map((meFocus) => {
            mutuallyExclusiveFcousText += "focus = " + meFocus + " ";
          });
          focusTreeText +=
            tabsText +
            "mutually_exclusive = { " +
            mutuallyExclusiveFcousText +
            "}\n";
        }

        //available (Optional)
        if (Writer.isCorrectValue(focus.data.available)) {
          focusTreeText +=
            tabsText +
            "available = " +
            Writer.handleBlockInput(focus.data.available, tabs + 1);
        }

        //bypass (Optional)
        if (Writer.isCorrectValue(focus.data.bypass)) {
          focusTreeText +=
            tabsText +
            "bypass = " +
            Writer.handleBlockInput(focus.data.bypass, tabs + 1);
        }

        //historical_ai (Optional)
        if (Writer.isCorrectValue(focus.data.historical_ai)) {
          focusTreeText +=
            tabsText +
            "historical_ai = " +
            Writer.handleBlockInput(focus.data.historical_ai, tabs + 1);
        }

        //cancel (Optional)
        if (Writer.isCorrectValue(focus.data.cancel)) {
          focusTreeText +=
            tabsText +
            "cancel = " +
            Writer.handleBlockInput(focus.data.cancel, tabs + 1);
        }

        //available_if_capitulated (Optional = default false)
        focusTreeText +=
          tabsText +
          "available_if_capitulated = " +
          Writer.boolToYesNo(focus.data.available_if_capitulated) +
          "\n";

        //cancel_if_invalid (Optional = default true)
        focusTreeText +=
          tabsText +
          "cancel_if_invalid = " +
          Writer.boolToYesNo(focus.data.cancel_if_invalid) +
          "\n";

        //continue_if_invalid (Optional = default false)
        focusTreeText +=
          tabsText +
          "continue_if_invalid = " +
          Writer.boolToYesNo(focus.data.continue_if_invalid) +
          "\n";

        //will_lead_to_war_with (Optional)
        if (Writer.isCorrectValue(focus.data.will_lead_to_war_with)) {
          focusTreeText +=
            tabsText +
            "will_lead_to_war_with = " +
            focus.data.will_lead_to_war_with +
            "\n";
        }

        //search_filters (Optional)
        if (Writer.isCorrectValue(focus.data.search_filters)) {
          focusTreeText +=
            tabsText +
            "search_filters = " +
            Writer.handleBlockInput(focus.data.search_filters, tabs + 1);
        }

        //select_effect (Optional)
        if (Writer.isCorrectValue(focus.data.select_effect)) {
          focusTreeText +=
            tabsText +
            "select_effect = " +
            Writer.handleBlockInput(focus.data.select_effect, tabs + 1);
        }

        //completion_reward (Optional)
        if (Writer.isCorrectValue(focus.data.completion_reward)) {
          focusTreeText +=
            tabsText +
            "completion_reward = " +
            Writer.handleBlockInput(focus.data.completion_reward, tabs + 1);
        }

        //complete_tooltip (Optional)
        if (Writer.isCorrectValue(focus.data.complete_tooltip)) {
          focusTreeText +=
            tabsText +
            "complete_tooltip = " +
            Writer.handleBlockInput(focus.data.complete_tooltip, tabs + 1);
        }

        //ai_will_do (Optional)
        if (Writer.isCorrectValue(focus.data.ai_will_do)) {
          focusTreeText +=
            tabsText +
            "ai_will_do = " +
            Writer.handleBlockInput(focus.data.ai_will_do, tabs + 1);
        }

        //end
        focusTreeText += "\t}\n";
      }

      tabs -= 2;
      tabsText = Writer.updateTabsText(tabs);

      focusTreeText += "}\n\n";
    }
    return focusTreeText;
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
  exportEU4Localization: function (containers, missions) {
    var localisationText = "l_english:\n";
    for (let index = 0; index < containers.length; index++) {
      const container = containers[index];

      let containerName = container.name.replace(/_/g, " ");
      containerName = Writer.titleCase(containerName);

      localisationText +=
        "\n #---------------------------------------------------------\n";
      localisationText += " # " + containerName + "\n";
      localisationText +=
        " #---------------------------------------------------------\n\n";

      var containerMissionsOne = missions.filter((x) => isNode(x));
      var containerMissionsTwo = containerMissionsOne.filter(
        (x) => x.data.selectedContainer === container.id
      );

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
  exportHOILocalization: function (containers, focuses) {
    var localisationText = "l_english:\n";
    for (let index = 0; index < containers.length; index++) {
      const container = containers[index];

      let containerName = container.name.replace(/_/g, " ");
      containerName = Writer.titleCase(containerName);

      localisationText +=
        "\n #---------------------------------------------------------\n";
      localisationText += " # " + containerName + "\n";
      localisationText +=
        " #---------------------------------------------------------\n\n";

      var containerFocusesOne = focuses.filter((x) => isNode(x));
      var containerFocusesTwo = containerFocusesOne.filter(
        (x) => x.data.selectedContainer === container.id
      );

      var sortedObjs = containerFocusesTwo.sort(
        (a, b) => (a.data.position > b.data.position && 1) || -1
      );

      for (let index = 0; index < sortedObjs.length; index++) {
        const mission = sortedObjs[index];
        if (!isNode(mission) || container.id !== mission.data.selectedContainer)
          continue;

        let name = mission.data.label.replace(/_/g, " ");
        name = Writer.titleCase(name);

        localisationText += " " + mission.data.label + ':0 "' + name + '"\n';
        localisationText += " " + mission.data.label + '_desc:0 ""\n';
        localisationText += " " + mission.data.label + '_focus_tt:0 ""\n';
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
