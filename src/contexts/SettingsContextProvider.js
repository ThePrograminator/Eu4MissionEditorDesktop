import React from "react";
import SettingsContext from "./SettingsContext";

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

  updateState = (variable, value) => {
    this.setState({ ...this.state, [variable]: value }, () =>
      console.log("SettingsProvider state change: ", this.state)
    );
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
        }}
      >
        {this.props.children}
      </SettingsContext.Provider>
    );
  }
}
export default SettingsProvider;
