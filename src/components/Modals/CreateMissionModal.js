import React, { useState, useEffect } from "react";

import { Modal, Button, Form, FormControl } from "react-bootstrap";

const CreateMissionModal = (props) => {
  const [fileName, setFileName] = useState("");
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (event) => {
    var name = event.target.value;

    setFileName(name);
    if (name === "") {
      setValidated(false);
      setErrorMessage("Name is Empty");
      return;
    }
    var valid = true;
    props.missionTabs.map((missionTab) => {
      if (missionTab.name === name) {
        console.log("Same Name");
        setValidated(false);
        setErrorMessage("Mission file name already in use.");
        valid = false;
        return;
      }
    });
    if (!valid) return;
    console.log("Valid");
    setValidated(true);
  };

  const handleClose = () => {
    props.setShow(0);
  };

  useEffect(() => {
    setFileName("");
    setValidated(false);
    setErrorMessage("Name is Empty");
  }, [props.show]);

  return (
    <Modal show={props.show === 3} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Mission</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated}>
          <Form.Group controlId="formLabel">
            <Form.Label>Mission File Name</Form.Label>
            <FormControl
              placeholder="name"
              aria-label="label"
              value={fileName}
              aria-describedby="basic-addon1"
              onChange={(evt) => handleInput(evt)}
              isInvalid={!validated}
              required
            />
            {!validated ? (
              <Form.Control.Feedback type="invalid">
                {errorMessage}
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
          onClick={() => (props.setShow(0), props.createFile(fileName))}
          disabled={!validated}
        >
          Create Mission File
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateMissionModal;
