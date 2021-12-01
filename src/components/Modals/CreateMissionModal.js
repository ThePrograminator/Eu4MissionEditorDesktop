import React, { useState, useEffect, useContext } from "react";

import { Modal, Button, Form, FormControl } from "react-bootstrap";
import SettingsContext from "../../contexts/SettingsContext";

const CreateMissionModal = (props) => {
  const settingsContext = useContext(SettingsContext);
  const [fileName, setFileName] = useState("");
  const [containerName, setContainerName] = useState("");
  const [validatedFileName, setValidatedFileName] = useState(false);
  const [validatedContainerName, setValidatedContainerName] = useState(false);
  const [validatedForm, setValidatedForm] = useState(false);
  const [errorMessageFileName, setErrorMessageFileName] = useState("");
  const [errorMessageContainerName, setErrorMessageContainerName] = useState("");

  const handleFileNameInput = (event) => {
    var name = event.target.value;

    setFileName(name);
    const regex = /[\s={}()\[\]]/g;
    const found = name.match(regex);
    if (found) {
      setValidatedFileName(false);
      setValidatedForm(false);
      setErrorMessageFileName("Name contains illegal characters");
      return;
    }
    if (name === "") {
      setValidatedFileName(false);
      setValidatedForm(false);
      setErrorMessageFileName("Name is Empty");
      return;
    }
    var valid = true;
    props.missionTabs.map((missionTab) => {
      if (missionTab.name === name) {
        console.log("Same Name");
        setValidatedFileName(false);
        setValidatedForm(false);
        setErrorMessageFileName(
          settingsContext.getText("filename") + " name already in use."
        );
        valid = false;
        return;
      }
    });
    setValidatedForm(false);
    if (!valid) return;
    console.log("Valid");
    setValidatedFileName(true);
    handleValidatedForm(validatedContainerName, true);
  };

  const handleContainerNameInput = (event) => {
    var name = event.target.value;

    setContainerName(name);
    const regex = /[\s={}()\[\]]/g;
    const found = name.match(regex);
    if (found) {
      setValidatedContainerName(false);
      setValidatedForm(false);
      setErrorMessageContainerName("Name contains illegal characters");
      return;
    }
    if (name === "") {
      setValidatedContainerName(false);
      setValidatedForm(false);
      setErrorMessageContainerName("Name is Empty");
      return;
    }
    setValidatedContainerName(true);
    console.log("validatedContainerName", validatedContainerName);
    handleValidatedForm(validatedFileName, true);
  };

  const handleValidatedForm = (validOne, validTwo) => {
    if (validOne && validTwo) {
      console.log("valid whole form");
      setValidatedForm(true);
    } else setValidatedForm(false);
  };

  const handleClose = () => {
    props.setShow(0);
  };

  useEffect(() => {
    setFileName("");
    setContainerName("");
    setValidatedFileName(false);
    setValidatedContainerName(false);
    setErrorMessageFileName("File Name is Empty");
    setErrorMessageContainerName(
      settingsContext.getText("containerName") + " Name is Empty"
    );
  }, [props.show]);

  return (
    <Modal show={props.show === 3} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {"Create " + settingsContext.getText("filename")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validatedForm}>
          <Form.Group controlId="formLabel">
            <Form.Label>
              {settingsContext.getText("filename") + " Name"}
            </Form.Label>
            <FormControl
              placeholder="name"
              aria-label="label"
              value={fileName}
              aria-describedby="basic-addon1"
              onChange={(evt) => handleFileNameInput(evt)}
              isInvalid={!validatedFileName}
              required
            />
            {!validatedFileName ? (
              <Form.Control.Feedback type="invalid">
                {errorMessageFileName}
              </Form.Control.Feedback>
            ) : null}
            <Form.Label>
              {settingsContext.getText("containerName") + " Name"}
            </Form.Label>
            <FormControl
              className="mb-2"
              placeholder="containerName"
              aria-label="containerName"
              value={containerName}
              aria-describedby="basic-addon1"
              onChange={(evt) => handleContainerNameInput(evt)}
              isInvalid={!validatedContainerName}
              required
            />
            {!validatedContainerName ? (
              <Form.Control.Feedback type="invalid">
                {errorMessageContainerName}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => (
            props.setShow(0), props.createFile(fileName, containerName)
          )}
          disabled={!validatedFileName || !validatedContainerName}
        >
          Create Mission File
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateMissionModal;
