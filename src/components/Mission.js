import React, { useEffect, useState, useContext } from "react";
import {
  FormControl,
  Form,
  Accordion,
  Card,
  Col,
  Button,
  OverlayTrigger,
  Tooltip,
  Spinner,
} from "react-bootstrap";
import { getIncomers } from "react-flow-renderer";
import ContainerReadOnly from "./ContainerReadOnly";
import MissionTreeContext from "../contexts/MissionTreeContext";
import SettingsContext from "../contexts/SettingsContext";

function calcPosition(pos) {
  return pos / 150;
}

const Mission = (props) => {
  const missionTreeContext = useContext(MissionTreeContext);
  const settingsContext = useContext(SettingsContext);
  const [nodeName, setNodeName] = useState(props.selectedElement.data.label);
  const [icon, setIcon] = useState(props.selectedElement.data.icon);
  const [generic, setGeneric] = useState(props.selectedElement.data.generic);
  const [position, setPosition] = useState(props.selectedElement.data.position);
  const [completedBy, setCompletedBy] = useState(
    props.selectedElement.data.completedBy
  );
  const [year, setYear] = useState(props.selectedElement.data.year);
  const [month, setMonth] = useState(props.selectedElement.data.month);
  const [day, setDay] = useState(props.selectedElement.data.day);
  const [provincesToHighLight, setProvincesToHighLight] = useState(
    props.selectedElement.data.provinces_to_highlight
  );
  const [trigger, setTrigger] = useState(props.selectedElement.data.trigger);
  const [effect, setEffect] = useState(props.selectedElement.data.effect);
  const [selectedContainer, setSelectedContainer] = useState(
    props.selectedElement.data.selectedContainer
  );

  useEffect(() => {
    console.log(
      "useEffect Mission [props.selectedElement, props.missionTree, props.container]"
    );
    setIcon(props.selectedElement.data.icon);
    setNodeName(props.selectedElement.data.label);
    setGeneric(props.selectedElement.data.generic);
    setPosition(props.selectedElement.data.position);
    setCompletedBy(props.selectedElement.data.completedBy);
    setProvincesToHighLight(props.selectedElement.data.provinces_to_highlight);
    setTrigger(props.selectedElement.data.trigger);
    setEffect(props.selectedElement.data.effect);
    setSelectedContainer(props.selectedElement.data.selectedContainer);
    setYear(props.selectedElement.data.year);
    setMonth(props.selectedElement.data.month);
    setDay(props.selectedElement.data.day);
  }, [props.selectedElement, props.missionTree, props.container]);

  useEffect(() => {
    console.log("update mission [props.selectedElement]");
    setSelectedContainer(props.selectedElement.data.selectedContainer);
  }, [props.selectedElement]);

  useEffect(() => {
    console.log(
      "update mission [props.selectedElement.data.selectedContainer]"
    );
    setSelectedContainer(props.selectedElement.data.selectedContainer);
  }, [props.selectedElement.data.selectedContainer]);

  useEffect(() => {
    console.log("nodeName", nodeName);
    let missionsCopy = props.missionTree.missions.slice();
    missionsCopy.map((el) => {
      if (el.id === props.selectedElement.id) {
        // it's important that you create a new object here
        // in order to notify react flow about the change
        var pos = position;
        if (selectedContainer != null) {
          pos =
            props.container.find((x) => x.id === selectedContainer).slot * 150;
        }
        let incomers = getIncomers(
          props.selectedElement,
          props.missionTree.missions
        );
        let incomerNames = incomers.map((incomer) => {
          return incomer.data.label;
        });
        let date = year + "." + month + "." + day;
        if (year === undefined || month === undefined || day === undefined)
          date = "";
        el.data = {
          ...el.data,
          label: nodeName,
          icon: icon,
          generic: generic,
          position: position,
          completed_by: date,
          year: year,
          month: month,
          day: day,
          required_missions: incomerNames,
          provinces_to_highlight: provincesToHighLight,
          trigger: trigger,
          effect: effect,
          selectedContainer: selectedContainer,
        };
        el.position = {
          ...el.position,
          x: pos,
          y: position * 150,
        };
        if (
          selectedContainer != undefined &&
          selectedContainer != null &&
          selectedContainer != "Select Container"
        ) {
          el.style = {
            ...el.style,
            background: props.container.find((x) => x.id === selectedContainer)
              .color,
          };
        }
        console.log("data", el);
        props.setSelectedElement(el);
      }

      return el;
    });

    props.setMissions(missionsCopy);
  }, [
    nodeName,
    icon,
    generic,
    position,
    completedBy,
    year,
    month,
    day,
    provincesToHighLight,
    trigger,
    effect,
    selectedContainer,
  ]);

  const handleDateChange = (event) => {
    let { name, value } = event.target;
    if (name === "year") {
      setYear(value);
      if (month === undefined) setMonth(1);
      if (day === undefined) setDay(1);
    }
    if (name === "month") {
      setMonth(value);
      if (year === undefined) setYear(settingsContext.startYear);
      if (day === undefined) setDay(1);
    }
    if (name === "day") {
      setDay(value);
      if (year === undefined) setYear(settingsContext.startYear);
      if (month === undefined) setMonth(1);
    }
  };

  const handleRemoveCompletedBy = () => {
    setYear(undefined);
    setMonth(undefined);
    setDay(undefined);
  };

  return (
    <Form>
      <Form.Group controlId="formContainer">
        <Form.Label>
          {"Selected " + settingsContext.getText("containerName")}
        </Form.Label>
        <Form.Control
          as="select"
          onChange={(evt) => setSelectedContainer(evt.target.value)}
          value={selectedContainer}
          placeholder={"Select " + settingsContext.getText("containerName")}
        >
          {props.container.map((container) => (
            <option key={container.id} value={container.id}>
              {container.name}
            </option>
          ))}
        </Form.Control>
        <Form.Text className="text-muted">
          {"(Required) A mission needs a " +
            settingsContext.getText("containerName")}
        </Form.Text>
      </Form.Group>

      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            {settingsContext.getText("containerName") + " (Read Only)"}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {props.selectedElement.data.selectedContainer != null ? (
                <ContainerReadOnly
                  selectedContainer={props.container.find(
                    (x) => x.id === props.selectedElement.data.selectedContainer
                  )}
                />
              ) : (
                "No Selected " + settingsContext.getText("containerName")
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

      <Form.Row style={{ width: "100%" }}>
        <Form.Group
          as={Col}
          controlId="formYear"
          style={{ minWidth: "35%", width: "35%" }}
        >
          <Form.Label>Year</Form.Label>
          <Form.Control
            type="number"
            placeholder="year"
            aria-label="year"
            name="year"
            aria-describedby="basic-addon1"
            min={settingsContext.startYear}
            max={settingsContext.endYear}
            value={year === undefined ? "" : year}
            onChange={handleDateChange}
            style={{ minWidth: "50%", width: "50%" }}
          />
          <Form.Text
            className="text-muted"
            style={{ minWidth: "50%", width: "50%" }}
          >
            Year mission is automatically completed.
          </Form.Text>
        </Form.Group>

        <Form.Group
          as={Col}
          controlId="formMonth"
          style={{ minWidth: "25%", width: "35%" }}
        >
          <Form.Label>Month</Form.Label>
          <Form.Control
            type="number"
            placeholder="month"
            aria-label="month"
            name="month"
            aria-describedby="basic-addon1"
            min={1}
            max={12}
            value={month === undefined ? "" : month}
            onChange={handleDateChange}
            style={{ minWidth: "40%", width: "40%" }}
          />
          <Form.Text
            className="text-muted"
            style={{ minWidth: "40%", width: "40%" }}
          >
            Month mission is automatically completed.
          </Form.Text>
        </Form.Group>
        <Form.Group
          as={Col}
          controlId="formDay"
          style={{ minWidth: "25%", width: "35%" }}
        >
          <Form.Label>Day</Form.Label>
          <Form.Control
            type="number"
            placeholder="day"
            aria-label="day"
            name="day"
            aria-describedby="basic-addon1"
            min={1}
            max={31}
            value={day === undefined ? "" : day}
            onChange={handleDateChange}
            style={{ minWidth: "40%", width: "40%" }}
          />
          <Form.Text
            className="text-muted"
            style={{ minWidth: "40%", width: "40%" }}
          >
            Day mission is automatically completed.
          </Form.Text>
        </Form.Group>

        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={
            <Tooltip id="button-tooltip">{"Remove Completed By"}</Tooltip>
          }
        >
          <Button
            variant="danger"
            onClick={() => handleRemoveCompletedBy()}
            style={{
              minWidth: "7%",
              width: "7%",
              height: "7%",
              margin: "auto",
            }}
          >
            X
          </Button>
        </OverlayTrigger>
      </Form.Row>

      <Form.Group controlId={"formIncomer"}>
        <Form.Label>Required Missions</Form.Label>
        {getIncomers(props.selectedElement, props.missionTree.missions).map(
          (incomer) => (
            <Form.Control
              key={incomer.id}
              readOnly
              defaultValue={incomer.data.label}
            />
          )
        )}
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
