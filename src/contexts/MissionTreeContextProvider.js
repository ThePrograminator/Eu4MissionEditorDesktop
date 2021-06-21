import React from "react";
import MissionTreeContext from "./MissionTreeContext";

class MissionTreeProvider extends React.Component {
  state = {
    user: {
      name: "Swagger",
    },
    missionTrees: [],
    availableTreeId: 0,
    availableNodeId: 0,
    availableSeriesId: 0,
  };

  getAvailableTreeId = () => {
    var availableId = `missionTree_${this.state.availableTreeId.toString()}`;
    var newId = this.state.availableTreeId + 1;
    this.setState({ availableTreeId: newId });
    return availableId;
  };

  getAvailableNodeId = () => {
    var availableId = `node_${this.state.availableNodeId.toString()}`;
    var newId = this.state.availableNodeId + 1;
    this.setState({ availableNodeId: newId });
    return availableId;
  };

  getAvailableSeriesId = () => {
    var availableId = `series_${this.state.availableSeriesId.toString()}`;
    var newId = this.state.availableSeriesId + 1;
    this.setState({ availableSeriesId: newId });
    return availableId;
  };

  render() {
    return (
      <MissionTreeContext.Provider
        value={{
          user: this.state.user,
          getAvailableTreeId: this.getAvailableTreeId,
          getAvailableNodeId: this.getAvailableNodeId,
          getAvailableSeriesId: this.getAvailableSeriesId,
          missionTrees: this.state.missionTrees,
        }}
      >
        {this.props.children}
      </MissionTreeContext.Provider>
    );
  }
}
export default MissionTreeProvider;
