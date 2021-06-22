import React, { useState, useEffect } from "react";

import { Modal, Button, Form, FormControl } from "react-bootstrap";

const AddMissionModal = (props) => {
  const [name, setName] = useState("");
  const [selectedSeries, setSelectedSeries] = useState(props.series[0].id);
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
    console.log("props.missions", props.missions);
    if (props.missions !== null && props.missions.length !== 0) {
      props.missions.map((mission) => {
        if (mission.data !== undefined && mission.data.label === name) {
          console.log("Same Name");
          setValidated(false);
          setErrorMessage("Mission name already in use.");
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
    <Modal show={props.show === 6} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Mission</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated}>
          <Form.Group controlId="formLabel">
            <Form.Label>Mission File Name</Form.Label>
            <FormControl
              placeholder="name"
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
          <Form.Group controlId="formSeries">
            <Form.Label>Selected Series</Form.Label>
            <Form.Control
              as="select"
              //onChange={(evt) => setSelectedSeries(parseInt(evt.target.value))}
              onChange={(evt) => setSelectedSeries(evt.target.value)}
              value={selectedSeries}
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => (
            props.setShow(0), props.addMission(name, selectedSeries)
          )}
          disabled={!validated}
        >
          Add Mission
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddMissionModal;
