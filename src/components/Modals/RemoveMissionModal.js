import React, { useState, useEffect, useContext } from "react";

import ReactFlow, { isNode } from "react-flow-renderer";
import SettingsContext from "../../contexts/SettingsContext";

import { Modal, Button, Form } from "react-bootstrap";

const RemoveMissionModal = (props) => {
  const settingsContext = useContext(SettingsContext);
  const [selectedMission, setSelectedMission] = useState(null);

  const handleClose = () => {
    props.setShow(0);
  };

  useEffect(() => {
    if (props.show === 7 && props.missions.length !== 0) {
      setSelectedMission(props.missions[0]);
      console.log("props.missions", props.missions[0]);
      console.log("selectedMission", selectedMission);
    }
  }, [props.show]);

  return (
    <Modal show={props.show === 7} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {"Remove " + settingsContext.getText("nodeName")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formMission">
            <Form.Label>
              {"Select " + settingsContext.getText("nodeName") + " To Remove"}
            </Form.Label>
            <Form.Control
              as="select"
              onChange={(evt) => setSelectedMission(evt.target.value)}
              value={selectedMission}
            >
              {props.missions.length != 0
                ? props.missions.map((mission) => (
                    <option key={mission.id} value={mission.id}>
                      {mission.data.label}
                    </option>
                  ))
                : null}
            </Form.Control>
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
            props.setShow(0),
            console.log(selectedMission),
            props.removeMission(selectedMission)
          )}
        >
          {"Remove " + settingsContext.getText("nodeName")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveMissionModal;
