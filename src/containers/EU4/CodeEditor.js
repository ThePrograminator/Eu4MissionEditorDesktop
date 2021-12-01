import React, { useContext } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Mission from "../../components/Mission";
import ContainerEditor from "./ContainerEditor";
import { isNode } from "react-flow-renderer";

const CodeEditor = (props) => {
  return (
    <aside style={props.closed}>
      <Tabs defaultActiveKey="mission" id="uncontrolled-tab-example">
        {props.selectedElement != null && isNode(props.selectedElement) ? (
          <Tab
            eventKey="mission"
            title="Mission"
            style={{
              minHeight: "inherit",
              overflowY: "auto",
              overflowX: "hidden",
              maxHeight: "75vh",
            }}
          >
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
          </Tab>
        ) : null}
        <Tab
          eventKey="container"
          title="Container"
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
