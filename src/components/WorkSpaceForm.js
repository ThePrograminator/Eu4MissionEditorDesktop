import React, { useState, useEffect, useContext } from "react";
import {
  Form,
  FormControl,
  Button,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { WorkspaceTypes } from "../constants/WorkspaceTypes";
import SettingsContext from "../contexts/SettingsContext";
import Factory from "../helper/Factory";

const electron = window.require("electron");
const settings = electron.remote.require("electron-settings");

const WorkspaceForm = (props) => {
  const settingsContext = useContext(SettingsContext);
  const [name, setName] = useState("");
  const [selectedGame, setSelectedGame] = useState(WorkspaceTypes[0].id);

  const handleInput = (event) => {
    var name = event.target.value;

    setName(name);
    if (name === "") {
      props.setValidated(false);
      props.setErrorMessage("Name is Empty");
      return;
    }
    var valid = true;
    var workspaces = settingsContext.workspaces;
    console.log("workspaces", workspaces);
    if (workspaces !== null && workspaces.length !== 0) {
      workspaces.map((workspace) => {
        if (workspace.name === name) {
          console.log("Same Name");
          props.setValidated(false);
          props.setErrorMessage("Workspace name already in use.");
          valid = false;
          return null;
        }
      });
    }

    if (!valid) return;
    console.log("Valid");
    props.setValidated(true);
  };

  const createWorkspace = () => {
    if (!props.validated) return;
    var length = settingsContext.workspaces.length;
    var workspace = Factory.createDefaultWorkspace(length, name, selectedGame);
    var workSpaceList = settingsContext.workspaces;
    let workSpaceListCopy = [...workSpaceList];
    workSpaceListCopy.push(workspace);
    settingsContext.updateState("workspaces", workSpaceListCopy);
    settings.set("workspaces", workSpaceListCopy);
    settingsContext.updateState("currentWorkspace", workspace);
    props.setShow(0);
  };

  useEffect(() => {
    setName("");
    props.setValidated(false);
    props.setErrorMessage("Name is Empty");
  }, []);

  return (
    <Form noValidate validated={props.validated}>
      <Form.Group controlId="formLabel">
        <Form.Label>Workspace Name</Form.Label>
        <FormControl
          placeholder="name"
          aria-label="label"
          value={name}
          aria-describedby="basic-addon1"
          onChange={(evt) => handleInput(evt)}
          isInvalid={!props.validated}
          required
        />
        {!props.validated ? (
          <Form.Control.Feedback type="invalid">
            {props.errorMessage}
          </Form.Control.Feedback>
        ) : null}
        <ButtonGroup>
          {WorkspaceTypes.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              name="radio"
              value={radio.id}
              checked={selectedGame === radio.id}
              onChange={(e) => setSelectedGame(parseInt(e.currentTarget.value))}
              style ={{WebkitAppearance: "none"}}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </Form.Group>
      <Button
        variant="primary"
        onClick={() => createWorkspace()}
        disabled={!props.validated}
      >
        Submit
      </Button>
    </Form>
  );
};

export default WorkspaceForm;
