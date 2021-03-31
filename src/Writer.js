import React from "react";
import ReactFlow, { isNode } from "react-flow-renderer";

const Writer = {
  exportMissionTree: function (series, missions) {
    var missionTreeText = "";
    var tabs = 0;
    var tabsText = "";
    for (let index = 0; index < series.length; index++) {
      const serie = series[index];
      //name
      missionTreeText += serie.name + Writer.addEqualBracket();

      tabs += 1;
      tabsText = Writer.updateTabsText(tabs);

      //slot
      missionTreeText += tabsText + "slot = " + serie.slot + "\n";

      //gerneric
      missionTreeText +=
        tabsText + "generic = " + Writer.boolToYesNo(serie.generic) + "\n";

      //ai
      missionTreeText +=
        tabsText + "ai = " + Writer.boolToYesNo(serie.ai) + "\n";

      //hasCountryShield
      missionTreeText +=
        tabsText +
        "has_country_shield = " +
        Writer.boolToYesNo(serie.hasCountryShield) +
        "\n";

      //potentialOnLoad
      missionTreeText +=
        tabsText +
        "potential_on_load = " +
        Writer.handleBlockInput(
          serie.potentialOnLoad,
          Writer.updateTabsText(tabs + 1)
        ) +
        tabsText +
        "}\n";

      //potential
      missionTreeText +=
        tabsText +
        "potential = " +
        Writer.handleBlockInput(
          serie.potential,
          Writer.updateTabsText(tabs + 1)
        ) +
        tabsText +
        "}\n";

      missionTreeText += "\n";

      tabs += 1;
      tabsText = Writer.updateTabsText(tabs);

      for (let index = 0; index < missions.length; index++) {
        const mission = missions[index];
        if (!isNode(mission) || serie.id !== mission.data.selectedSeries)
          continue;

        //name
        missionTreeText += "\t" + mission.data.label + Writer.addEqualBracket();

        //icon
        missionTreeText += tabsText + "icon = " + mission.data.icon + "\n";

        //gerneric
        missionTreeText +=
          tabsText + "generic = " + Writer.boolToYesNo(mission.data.generic) + "\n";

        //completed_by
        missionTreeText +=
          tabsText + "completed_by = " + Writer.isCorrectValue(mission.data.completed_by)
            ? mission.data.completed_by
            : "{ }" + "\n";

        //provinces_to_highlight
        missionTreeText +=
          tabsText +
          "provinces_to_highlight = " +
          Writer.handleBlockInput(
            mission.data.provinces_to_highlight,
            Writer.updateTabsText(tabs + 1)
          ) +
          tabsText +
          "}\n";

        //trigger
        missionTreeText +=
          tabsText +
          "potential_on_load = " +
          Writer.handleBlockInput(
            mission.data.trigger,
            Writer.updateTabsText(tabs + 1)
          ) +
          tabsText +
          "}\n";

        //effect
        missionTreeText +=
          tabsText +
          "potential = " +
          Writer.handleBlockInput(
            mission.data.effect,
            Writer.updateTabsText(tabs + 1)
          ) +
          tabsText +
          "}\n";

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
  handleBlockInput: function (variable, tabsText) {
    var result = "";
    if (!Writer.isCorrectValue(variable)) return "{";

    var trimmedVar = variable.trim();
    var resSplit = trimmedVar.split("\n");
    result = "{\n";
    for (let index = 0; index < resSplit.length; index++) {
      const element = resSplit[index];
      result += tabsText + element + "\n";
    }
    return result;
  },
  isCorrectValue: function (variable) {
    if (variable === undefined) return false;
    else if (variable === null) return false;
    else if (variable === "" || variable === " ") return false;
    return true;
  },
  updateTabsText: function (tabs) {
    var tabsText = "";
    for (let index = 0; index < tabs; index++) {
      tabsText += "\t";
    }
    return tabsText;
  },
};

export default Writer;