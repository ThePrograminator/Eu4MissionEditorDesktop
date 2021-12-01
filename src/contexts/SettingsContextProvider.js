import React from "react";
import SettingsContext from "./SettingsContext";
import { WorkspaceTypes } from "../constants/WorkspaceTypes";

const electron = window.require("electron");
const settings = electron.remote.require("electron-settings");

class SettingsProvider extends React.Component {
  state = {
    maxSlot: settings.get("maxSlot"),
    startYear: settings.get("startYear"),
    endYear: settings.get("endYear"),
    workspaces: settings.get("workspaces"),
    currentWorkspace: null,
  };

  componentDidMount() {
    this.setState(
      {
        maxSlot: settings.get("maxSlot"),
        startYear: settings.get("startYear"),
        endYear: settings.get("endYear"),
        workspaces: settings.get("workspaces"),
        currentWorkspace: null,
      },
      () => console.log("SettingsProvider state change: ", this.state)
    );
  }

  updateState = (variable, value, callback) => {
    this.setState({ ...this.state, [variable]: value }, function () {
      console.log("SettingsProvider state change: ", this.state);
      callback();
    });
  };

  getText = (variable) => {
    console.log("settingsContext getText", this.state.currentWorkspace);
    
    var workspaceText = null;
    for (let index = 0; index < WorkspaceTypes.length; index++) {
      const element = WorkspaceTypes[index].id;
      if(this.state.currentWorkspace.type === element)
      {
        workspaceText = WorkspaceTypes[index];
      }
    }
    console.log("settingsContext currentType", workspaceText[variable]);
    if(workspaceText === null)
      return "Missing text"
    return workspaceText[variable];
  };

  render() {
    return (
      <SettingsContext.Provider
        value={{
          maxSlot: this.state.maxSlot,
          startYear: this.state.startYear,
          endYear: this.state.endYear,
          workspaces: this.state.workspaces,
          currentWorkspace: this.state.currentWorkspace,
          updateState: this.updateState,
          getText: this.getText,
        }}
      >
        {this.props.children}
      </SettingsContext.Provider>
    );
  }
}
export default SettingsProvider;
