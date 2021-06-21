import React from "react";
import MissionTreeContext from "./MissionTreeContext";

class MissionTreeProvider extends React.Component {
  state = {
    user: {
      name: "Swagger",
    },
  };

  render() {
    return (
      <MissionTreeContext.Provider
        value={{ user: this.state.user }}
      >
        {this.props.children}
      </MissionTreeContext.Provider>
    );
  }
}
export default MissionTreeProvider;
