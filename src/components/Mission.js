import React, { useEffect, useState } from "react";
import { FormControl, Form, Col, Accordion, Card } from "react-bootstrap";
import { getIncomers } from "react-flow-renderer";
import SeriesReadOnly from "./SeriesReadOnly";

function calcPosition(pos) {
  return pos / 150;
}

const Mission = (props) => {
  const [nodeName, setNodeName] = useState(props.selectedElement.data.label);
  const [icon, setIcon] = useState(props.selectedElement.data.icon);
  const [generic, setGeneric] = useState(props.selectedElement.data.generic);
  const [position, setPosition] = useState(
    calcPosition(props.selectedElement.position.y)
  );
  const [completedBy, setCompletedBy] = useState(
    props.selectedElement.data.completedBy
  );
  const [provincesToHighLight, setProvincesToHighLight] = useState(
    props.selectedElement.data.provincesToHighLight
  );
  const [trigger, setTrigger] = useState(props.selectedElement.data.trigger);
  const [effect, setEffect] = useState(props.selectedElement.data.effect);
  const [selectedSeries, setSelectedSeries] = useState(
    props.selectedElement.data.selectedSeries
  );

  useEffect(() => {
    setIcon(props.selectedElement.data.icon);
    setNodeName(props.selectedElement.data.label);
    setGeneric(props.selectedElement.data.generic);
    setPosition(calcPosition(props.selectedElement.position.y));
    setCompletedBy(props.selectedElement.data.completedBy);
    setProvincesToHighLight(props.selectedElement.data.provincesToHighLight);
    setTrigger(props.selectedElement.data.trigger);
    setEffect(props.selectedElement.data.effect);
    setSelectedSeries(props.selectedElement.data.selectedSeries);
  }, [props.selectedElement, props.missions, props.series]);

  useEffect(() => {
    console.log("nodeName", nodeName);
    let missionsCopy = props.missions.slice();
    missionsCopy.map((el) => {
      if (el.id === props.selectedElement.id) {
        // it's important that you create a new object here
        // in order to notify react flow about the change
        var pos = props.selectedElement.position.x;
        if (selectedSeries != null) {
          pos = props.series.find((x) => x.id === selectedSeries).slot * 150;
        }
        el.data = {
          ...el.data,
          label: nodeName,
          icon: icon,
          generic: generic,
          completed_by: completedBy,
          provinces_to_highlight: provincesToHighLight,
          trigger: trigger,
          effect: effect,
          selectedSeries: selectedSeries,
        };
        el.position = {
          ...el.position,
          x: pos,
          y: position * 150,
        };
        if (
          selectedSeries != undefined &&
          selectedSeries != null &&
          selectedSeries != "Select Series"
        ) {
          el.style = {
            ...el.style,
            background: props.series.find((x) => x.id === selectedSeries).color,
          };
        }
        console.log("data", el);
        props.setSelectedElement(el);
      }

      return el;
    });

    props.setMissions(missionsCopy);

    let missionTabsCopy = props.missionTabs.slice();
    let index = missionTabsCopy.findIndex(
      (missionTab) => missionTab.id === props.fileID
    );
    missionTabsCopy[index].missions = missionsCopy;
    props.setMissionTabs(missionTabsCopy);
    //props.onUpdate();
  }, [
    nodeName,
    icon,
    generic,
    position,
    completedBy,
    provincesToHighLight,
    trigger,
    effect,
    selectedSeries,
  ]);

  return (
    <Form>
      <Form.Group controlId="formSeries">
        <Form.Label>Selected Series</Form.Label>
        <Form.Control
          as="select"
          onChange={(evt) => setSelectedSeries(parseInt(evt.target.value))}
          value={props.selectedElement.data.selectedSeries}
          placeholder={"Select Series"}
        >
          {props.series.map((serie) => (
            <option key={serie.id} value={serie.id}>
              {serie.name}
            </option>
          ))}
        </Form.Control>
        <Form.Text className="text-muted">
          (Required) A mission needs a Series
        </Form.Text>
      </Form.Group>

      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Series (Read Only)
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {selectedSeries != null ? (
                <SeriesReadOnly
                  selectedSeries={props.series.find(
                    (x) => x.id === selectedSeries
                  )}
                />
              ) : (
                "No Selected Series"
              )}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      <hr />

      <Form.Group controlId="formLabel">
        <Form.Label>Mission Name</Form.Label>
        <FormControl
          placeholder="name"
          aria-label="label"
          value={nodeName}
          aria-describedby="basic-addon1"
          onChange={(evt) => setNodeName(evt.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formIcon">
        <Form.Label>Icon</Form.Label>
        <FormControl
          placeholder="icon"
          aria-label="icon"
          value={icon}
          aria-describedby="basic-addon1"
          onChange={(evt) => setIcon(evt.target.value)}
        />
        <Form.Text className="text-muted">
          The icon to use for the mission
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formGeneric">
        <Form.Check
          type="checkbox"
          label="Generic"
          checked={generic}
          onChange={(evt) => setGeneric(evt.target.checked)}
        />
        <Form.Text className="text-muted">
          Whether this mission is considered generic.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formPosition">
        <Form.Label>Position</Form.Label>
        <FormControl
          type="number"
          placeholder="position"
          aria-label="position"
          value={position}
          aria-describedby="basic-addon1"
          min={1}
          onChange={(evt) => setPosition(evt.target.value)}
          style={{ width: "20%" }}
        />
        <Form.Text className="text-muted">
          Which row the mission appears in. 1 is top.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formCompletedBy">
        <Form.Label>Completed By</Form.Label>
        <FormControl
          placeholder="completedBy"
          aria-label="completedBy"
          value={completedBy}
          aria-describedby="basic-addon1"
          onChange={(evt) => setCompletedBy(evt.target.value)}
        />
        <Form.Text className="text-muted">
          Automatically completes mission in history.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId={"formIncomer"}>
        <Form.Label>Required Missions</Form.Label>
        {getIncomers(props.selectedElement, props.missions).map((incomer) => (
          <Form.Control readOnly defaultValue={incomer.data.label} />
        ))}
        <Form.Text className="text-muted">
          Which missions must be completed before this mission is active.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formProvincesToHighLight">
        <Form.Label>Provinces Highlighted</Form.Label>
        <FormControl
          as="textarea"
          placeholder="provincesToHighLight"
          aria-label="provincesToHighLight"
          value={provincesToHighLight}
          aria-describedby="basic-addon1"
          onChange={(evt) => setProvincesToHighLight(evt.target.value)}
        />
        <Form.Text className="text-muted">
          Determines which provinces to highlight. Acts like all_province scope.
          Optional.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formTrigger">
        <Form.Label>Trigger</Form.Label>
        <FormControl
          as="textarea"
          placeholder="trigger"
          aria-label="trigger"
          value={trigger}
          aria-describedby="basic-addon1"
          onChange={(evt) => setTrigger(evt.target.value)}
        />
        <Form.Text className="text-muted">
          Determines when the mission is completed. Country scope.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formEffect">
        <Form.Label>Effect</Form.Label>
        <FormControl
          as="textarea"
          placeholder="effect"
          aria-label="effect"
          value={effect}
          aria-describedby="basic-addon1"
          onChange={(evt) => setEffect(evt.target.value)}
        />
        <Form.Text className="text-muted">
          The effect executed when the mission is claimed. Country scope.
        </Form.Text>
      </Form.Group>
    </Form>
  );
};

export default Mission;
