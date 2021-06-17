import React from "react";
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
              missions={props.missions}
              setMissions={props.setMissions}
              selectedElement={props.selectedElement}
              setSelectedElement={props.setSelectedElement}
              series={props.series}
              onUpdate={props.onUpdate}
              missionTabs={props.missionTabs}
              missionTabs={props.missionTabs}
              fileID={props.fileID}
              setMissionTabs={props.setMissionTabs}
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
          <SeriesEditor
            series={props.series}
            setSeries={props.setSeries}
            setMissionTabs={props.setMissionTabs}
          />
        </Tab>
      </Tabs>
    </aside>
  );
};

export default CodeEditor;

/*


<Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Mission
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Mission
                setElements={props.setElements}
                selectedElement={props.selectedElement}
                elements={props.elements}
                series={props.series}
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            Series (Read Only)
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>hello</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      */
