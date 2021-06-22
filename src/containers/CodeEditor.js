import React, { useContext } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Mission from "../components/Mission";
import SeriesEditor from "./SeriesEditor";
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
              missionTree={props.missionTree}
              setMissions={props.setMissions}
              selectedElement={props.selectedElement}
              setSelectedElement={props.setSelectedElement}
              series={props.series}
              onUpdate={props.onUpdate}
              fileID={props.fileID}
            />
          </Tab>
        ) : null}
        <Tab
          eventKey="series"
          title="Series"
          style={{
            minHeight: "inherit",
            overflowY: "auto",
            overflowX: "hidden",
            maxHeight: "75vh",
          }}
        >
          <SeriesEditor series={props.series} setSeries={props.setSeries} />
        </Tab>
      </Tabs>
    </aside>
  );
};

export default CodeEditor;
