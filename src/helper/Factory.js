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
        selectedContainer:
          selectedContainer !== null ? selectedContainer.id : null,
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
  createDefaultFocus: function (
    id,
    name = "newFocus",
    selectedContainer = null
  ) {
    const newMission = {
      id: id,
      data: {
        label: name,
        icon: "mission_build_up_to_force_limit",
        cost: 0,
        allow_branch: "",
        x: 0,
        y: 0,
        relative_position_id: "",
        offset: "",
        prerequisite: "",
        mutually_exclusive: "",
        available: "",
        bypass: "",
        historical_ai: "",
        cancel: "",
        available_if_capitulated: false,
        cancel_if_invalid: false,
        continue_if_invalid: false,
        will_lead_to_war_with: "",
        search_filters: "",
        select_effect: "",
        completion_reward: "",
        complete_tooltip: "",
        ai_will_do: "",
        selectedContainer:
          selectedContainer !== null ? selectedContainer.id : null,
      },
      position: {
        x: 150,
        y: 150,
      },
      style: {
        background: selectedContainer !== null ? selectedContainer.color : null,
      },
      type: "default",
    };

    return newMission;
  },
  createDefaultFocusTree: function (id, name = "newContainer") {
    const newContainer = {
      id: id,
      name: name,
      country: "",
      default: false,
      reset_on_civil_war: false,
      shared_focus: "",
      continuous_focus_position: "",
      initial_show_position: "",
      missions: [],
    };

    return newContainer;
  },
  createDefaultWorkspace: function (id, name = "newWorkspace", type) {
    const newWorkspace = {
      id: id,
      name: name,
      type: type,
      filePaths: [],
    };

    return newWorkspace;
  },
};

export default Factory;
