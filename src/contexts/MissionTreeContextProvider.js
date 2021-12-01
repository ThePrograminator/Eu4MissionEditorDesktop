import React from "react";
import MissionTreeContext from "./MissionTreeContext";
import ReactFlow, { removeElements } from "react-flow-renderer";

class MissionTreeProvider extends React.Component {
  state = {
    user: {
      name: "Swagger",
    },
    missionTrees: [],
    availableTreeId: 0,
    availableNodeId: 0,
    availableContainerId: 0,
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

  setAvailableNodeId = (value) => {
    this.setState({ availableNodeId: value });
  };

  getAvailableContainerId = () => {
    var availableId = `container_${this.state.availableContainerId.toString()}`;
    var newId = this.state.availableContainerId + 1;
    this.setState({ availableContainerId: newId });
    return availableId;
  };

  setAvailableContainerId = (value) => {
    this.setState({ availableContainerId: value });
  };

  addMissionTree = (missionTree) => {
    console.log("Context new MissionTree: ", missionTree);
    let missionTreeCopy = this.state.missionTrees.slice();
    missionTreeCopy.push(missionTree);
    console.log("Context new missionTreeCopy: ", missionTreeCopy);
    this.setState({ missionTrees: missionTreeCopy }, function () {
      console.log("Context MissionTrees: ", this.state.missionTrees);
    });
  };

  editMissionTree = (missionTree) => {
    let missionTreeCopy = this.state.missionTrees.slice();
    let indexMissionTab = missionTreeCopy.findIndex(
      (missionTab) => missionTab.id === missionTree.id
    );
    missionTreeCopy[indexMissionTab] = missionTree;
    this.setState({ missionTrees: [...missionTreeCopy] }, function () {
      console.log("Context MissionTrees: ", this.state.missionTrees);
    });
  };

  removeMissionTree = (missionTree) => {
    console.log("Context removeMissionTree missionTree: ", missionTree);
    let missionTreeCopy = this.state.missionTrees.slice();
    let indexMissionTab = missionTreeCopy.findIndex(
      (missionTab) => missionTab.id === missionTree.id
    );
    missionTreeCopy.splice(indexMissionTab, 1);
    //missionTreeCopy[indexMissionTab] = missionTree;
    this.setState({ missionTrees: [...missionTreeCopy] }, function () {
      console.log("Context MissionTrees: ", this.state.missionTrees);
    });
  };

  render() {
    return (
      <MissionTreeContext.Provider
        value={{
          user: this.state.user,
          getAvailableTreeId: this.getAvailableTreeId,
          getAvailableNodeId: this.getAvailableNodeId,
          setAvailableNodeId: this.setAvailableNodeId,
          getAvailableContainerId: this.getAvailableContainerId,
          setAvailableContainerId: this.setAvailableContainerId,
          missionTrees: this.state.missionTrees,
          addMissionTree: this.addMissionTree,
          editMissionTree: this.editMissionTree,
          removeMissionTree: this.removeMissionTree,
        }}
      >
        {this.props.children}
      </MissionTreeContext.Provider>
    );
  }
}
export default MissionTreeProvider;
