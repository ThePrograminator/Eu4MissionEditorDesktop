import React from "react";

const Factory = {
  createDefaultMissionTab: function (
    id,
    name = "newMissionTree",
    extName = ".txt"
  ) {
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
        icon: "mission_build_up_to_force_limit",
        generic: false,
        completed_by: "",
        year: undefined,
        month: undefined,
        day: undefined,
        required_missions: "",
        provinces_to_highlight: "",
        trigger: "",
        effect: "",
        selectedSeries: selectedSeries !== null ? selectedSeries.id : null,
      },
      position: {
        x: selectedSeries !== null ? selectedSeries.slot * 150 : 0,
        y: 150,
      },
      style: {
        background: selectedSeries !== null ? selectedSeries.color : null,
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
      has_country_shield: false,
      potential_on_load: "",
      potential: "always = yes",
      color: "",
      missions: [],
    };

    return newSeries;
  },
};

export default Factory;
