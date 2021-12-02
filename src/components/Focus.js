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

const Mission = (props) => {
  const missionTreeContext = useContext(MissionTreeContext);
  const settingsContext = useContext(SettingsContext);
  const [nodeName, setNodeName] = useState(props.selectedElement.data.label);
  const [x, setX] = useState(props.selectedElement.data.x);
  const [y, setY] = useState(props.selectedElement.data.y);
  const [icon, setIcon] = useState(props.selectedElement.data.icon);
  const [prerequisite, setPrerequisite] = useState(
    props.selectedElement.data.prerequisite
  );
  const [selectedContainer, setSelectedContainer] = useState(
    props.selectedElement.data.selectedContainer
  );

  useEffect(() => {
    console.log(
      "useEffect Mission [props.selectedElement, props.missionTree, props.container]"
    );
    setIcon(props.selectedElement.data.icon);
    setNodeName(props.selectedElement.data.label);
    setX(props.selectedElement.data.x);
    setY(props.selectedElement.data.y);
    setPrerequisite(props.selectedElement.data.prerequisite);
    setSelectedContainer(props.selectedElement.data.selectedContainer);
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
        let incomers = getIncomers(
          props.selectedElement,
          props.missionTree.missions
        );
        let incomerNames = incomers.map((incomer) => {
          return incomer.data.label;
        });
        el.data = {
          ...el.data,
          label: nodeName,
          icon: icon,
          prerequisite: incomerNames,
          selectedContainer: selectedContainer,
        };
        el.position = {
          ...el.position,
          x: x * 150,
          y: y * 150,
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
  }, [nodeName, icon, x, y, prerequisite, selectedContainer]);

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

      <Form.Group controlId="formX">
        <Form.Label>X</Form.Label>
        <FormControl
          type="number"
          placeholder="x"
          aria-label="x"
          value={x}
          aria-describedby="basic-addon1"
          min={1}
          onChange={(evt) => setX(evt.target.value)}
          style={{ width: "20%" }}
        />
        <Form.Text className="text-muted">
          Which row the mission appears in. 0 is top.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formY">
        <Form.Label>Y</Form.Label>
        <FormControl
          type="number"
          placeholder="y"
          aria-label="y"
          value={y}
          aria-describedby="basic-addon1"
          min={1}
          onChange={(evt) => setY(evt.target.value)}
          style={{ width: "20%" }}
        />
        <Form.Text className="text-muted">
          Which colounm the mission appears in. 0 is top.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId={"formIncomer"}>
        <Form.Label>Required Focuses</Form.Label>
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
          Which Focuses must be completed before this focus is active.
        </Form.Text>
      </Form.Group>
    </Form>
  );
};

export default Mission;
