import React from "react";
import SettingsContext from "./SettingsContext";

const keyBindings = {
  delete: 46,
}

class SettingsProvider extends React.Component {
  state = {
    keyBindings: keyBindings,
  };

  render() {
    return (
      <SettingsContext.Provider
        value={{
          user: this.state.user
        }}
      >
        {this.props.children}
      </SettingsContext.Provider>
    );
  }
}
export default SettingsProvider;
