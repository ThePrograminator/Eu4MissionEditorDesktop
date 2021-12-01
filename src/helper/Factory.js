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
      container: [],
      missions: [],
      edges: [],
    };

    return newMissionTab;
  },
  createDefaultMission: function (
    id,
    name = "newMission",
    selectedContainer = null
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
        selectedContainer: selectedContainer !== null ? selectedContainer.id : null,
      },
      position: {
        x: selectedContainer !== null ? selectedContainer.slot * 150 : 0,
        y: 150,
      },
      style: {
        background: selectedContainer !== null ? selectedContainer.color : null,
      },
      type: "default",
    };

    return newMission;
  },
  createDefaultContainer: function (id, name = "newContainer") {
    const newContainer = {
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

    return newContainer;
  },
  createDefaultWorkspace: function (id, name = "newWorkspace", type) {
    const newWorkspace = {
      id: id,
      name: name,
      type: type,
      filePaths: []
    };

    return newWorkspace;
  },
};

export default Factory;
