import React, { useState, useEffect, useContext } from "react";

import { Modal, Button, Form, FormControl } from "react-bootstrap";
import InProgressIDMap from "../../InProgressIDMap";
import SettingsContext from "../../contexts/SettingsContext";

const AddContainerModal = (props) => {
  const settingsContext = useContext(SettingsContext);
  const [name, setName] = useState("");
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (event) => {
    var name = event.target.value;

    setName(name);
    if (name === "") {
      setValidated(false);
      setErrorMessage("Name is Empty");
      return;
    }
    var valid = true;
    console.log("props.container", props.container);
    if (props.container !== null && props.container.length !== 0) {
      props.container.map((container) => {
        if (container.name !== undefined && container.name === name) {
          console.log("Same Name");
          setValidated(false);
          setErrorMessage(
            settingsContext.getText("containerName") + " name already in use."
          );
          valid = false;
          return;
        }
      });
    }

    if (!valid) return;
    console.log("Valid");
    setValidated(true);
  };

  const handleClose = () => {
    props.setShow(0);
  };

  useEffect(() => {
    setName("");
    setValidated(false);
    setErrorMessage("Name is Empty");
  }, [props.show]);

  return (
    <Modal show={props.show === InProgressIDMap.addContainer} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {"Add" + settingsContext.getText("containerName")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated}>
          <Form.Group controlId="formLabel">
            <Form.Label>
              {settingsContext.getText("containerName") + " Name"}
            </Form.Label>
            <FormControl
              placeholder="name..."
              aria-label="label"
              value={name}
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
          onClick={() => (props.setShow(0), props.addContainer(name))}
          disabled={!validated}
        >
          {"Add " + settingsContext.getText("containerName")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddContainerModal;
