import React, { useState, useEffect, useContext } from "react";

import {
  Modal,
  Button,
  ToggleButton,
  ButtonGroup,
  Form,
  FormControl,
} from "react-bootstrap";
import WorkspaceConstant from "../../constants/WorkspaceConstant";
import WorkSpaceForm from "../WorkSpaceForm";
import WorkSpaceSelect from "../WorkSpaceSelect";
import Factory from "../../helper/Factory";
import SettingsContext from "../../contexts/SettingsContext";

const electron = window.require("electron");
const settings = electron.remote.require("electron-settings");

const WorkspaceModal = (props) => {
  const settingsContext = useContext(SettingsContext);
  const [selectedWorkSpace, setSelectedWorkSpace] = useState(null);
  const [radioValue, setRadioValue] = useState("1");
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const radios = [
    { name: "Create", value: "1" },
    { name: "Load", value: "2" },
  ];

  const handleClose = () => {
    props.setShow(0);
  };
  console.log("props.show", props.show);

  return (
    <Modal show={props.show === 12} onHide={handleClose}>
      <Modal.Header closeButton={false}>
        <Modal.Title>Create Workspace</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ButtonGroup>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
        {radioValue == 1 ? (
          <WorkSpaceForm
            validated={validated}
            setValidated={setValidated}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            show={props.show}
            setShow={props.setShow}
          />
        ) : (
          <WorkSpaceSelect
            validated={validated}
            setValidated={setValidated}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            show={props.show}
            setShow={props.setShow}
          />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default WorkspaceModal;
