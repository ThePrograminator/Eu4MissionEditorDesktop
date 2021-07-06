import React, { useState, useEffect } from "react";

import { Modal, Button, Form } from "react-bootstrap";

const ExportMissionModal = (props) => {
  const [selectedMissionTab, setSelectedMissionTab] = useState(
    props.missionTabs[0].id
  );

  const handleClose = () => {
    props.setShow(0);
  };

  useEffect(() => {
    if (props.show === 2 && props.missionTabs.length !== 0) {
      setSelectedMissionTab(props.missionTabs[0].id);
    }
  }, [props.show]);

  return (
    <Modal show={props.show === 2} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Export Mission</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formMission">
            <Form.Label>Select Mission To Export</Form.Label>
            <Form.Control
              as="select"
              onChange={(evt) => setSelectedMissionTab(evt.target.value)}
              value={selectedMissionTab}
            >
              {props.missionTabs.map((missionTab) => (
                <option key={missionTab.id} value={missionTab.id}>
                  {missionTab.name}
                </option>
              ))}
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
            props.setShow(0), props.exportFile(selectedMissionTab)
          )}
        >
          Export Mission
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExportMissionModal;
