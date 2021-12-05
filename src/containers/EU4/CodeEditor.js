import React, { useContext } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Mission from "../../components/Mission";
import Focus from "../../components/Focus";
import ContainerEditor from "./ContainerEditor";
import { isNode } from "react-flow-renderer";
import SettingsContext from "../../contexts/SettingsContext";
import ReactFlow, { isEdge } from "react-flow-renderer";

const CodeEditor = (props) => {
  const settingsContext = useContext(SettingsContext);

  const getEdges = (nodes) => {
    var edges = [];
    for (let index = 0; index < props.missions.length; index++) {
      const element = props.missions[index];
      if (isEdge(element)) edges.push(element);
    }
    return edges;
  };

  const getNodeType = () => {
    switch (settingsContext.currentWorkspace.type) {
      case 0:
        return (
          <Mission
            key={props.selectedElement}
            missionTree={props.missionTree}
            setMissions={props.setMissions}
            selectedElement={props.selectedElement}
            setSelectedElement={props.setSelectedElement}
            container={props.container}
            onUpdate={props.onUpdate}
            fileID={props.fileID}
          />
        );
      case 1:
        return (
          <Focus
            key={props.selectedElement}
            missionTree={props.missionTree}
            edges={getEdges()}
            setMissions={props.setMissions}
            selectedElement={props.selectedElement}
            setSelectedElement={props.setSelectedElement}
            container={props.container}
            onUpdate={props.onUpdate}
            fileID={props.fileID}
          />
        );
      default:
        break;
    }
  };

  return (
    <aside style={props.closed}>
      <Tabs defaultActiveKey="mission" id="uncontrolled-tab-example">
        {props.selectedElement != null && isNode(props.selectedElement) ? (
          <Tab
            eventKey="mission"
            title={settingsContext.getText("nodeName")}
            style={{
              minHeight: "inherit",
              overflowY: "auto",
              overflowX: "hidden",
              maxHeight: "75vh",
            }}
          >
            {getNodeType()}
          </Tab>
        ) : null}
        <Tab
          eventKey="container"
          title={settingsContext.getText("containerName")}
          style={{
            minHeight: "inherit",
            overflowY: "auto",
            overflowX: "hidden",
            maxHeight: "75vh",
          }}
        >
          <ContainerEditor
            missionTree={props.missionTree}
            container={props.container}
            setContainer={props.setContainer}
          />
        </Tab>
      </Tabs>
    </aside>
  );
};

export default CodeEditor;
