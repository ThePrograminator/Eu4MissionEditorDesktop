import React from "react";

const Factory = {
  createDefaultMissionTab: function (id, name = "newMissionTree", extName = ".txt") {
    const newMissionTab = {
      id: id,
      name: name,
      fileName: name + extName,
      series: [],
      missions: [],
      edges: [],
    };

    return newMissionTab;
  },
  createDefaultMission: function (
    id,
    name = "newMission",
    selectedSeries = null
  ) {
    const newMission = {
      id: id,
      data: {
        label: name,
        position: 1,
        icon: "",
        generic: false,
        completed_by: "",
        required_missions: "",
        provinces_to_highlight: null,
        trigger: null,
        effect: null,
        selectedSeries: selectedSeries,
      },
      position: {
        x: 0,
        y: 150,
      },
      type: "default",
    };

    return newMission;
  },
  createDefaultSeries: function (id, name = "newSeries") {
    const newSeries = {
      id: id,
      name: name,
      slot: 1,
      generic: false,
      ai: true,
      hasCountryShield: false,
      potentialOnLoad: "",
      potential: "",
      color: "",
      missions: [],
    };

    return newSeries;
  },
};

export default Factory;