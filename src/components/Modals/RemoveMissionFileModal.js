import React, { useState, useEffect, useContext } from "react";

import { Modal, Button, Form } from "react-bootstrap";
import SettingsContext from "../../contexts/SettingsContext";

const RemoveMissionFileModal = (props) => {
  const settingsContext = useContext(SettingsContext);
  const [selectedMissionTab, setSelectedMissionTab] = useState(
    props.missionTabs.length > 0 ? props.missionTabs[0].id : 0
  );

  const handleClose = () => {
    props.setShow(0);
  };

  useEffect(() => {
    if (props.show === 5 && props.missionTabs.length !== 0) {
      setSelectedMissionTab(props.missionTabs[0].id);
      console.log("props.missionTabs", props.missionTabs[0]);
      console.log("selectedMissionTab", selectedMissionTab);
    }
  }, [props.show]);

  return (
    <Modal show={props.show === 5} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {"Remove " + settingsContext.getText("filename")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formMission">
            <Form.Label>
              {"Select " + settingsContext.getText("filename") + " To Remove"}
            </Form.Label>
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
            <Form.Text className="text-muted">
              {"This does not remove the " +
                settingsContext.getText("filename") +
                " from your directory"}
            </Form.Text>
            <Form.Text className="text-muted">
              Your changes not exported will be lost
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
            props.setShow(0), props.removeFile(selectedMissionTab)
          )}
        >
          {"Remove " + settingsContext.getText("filename")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveMissionFileModal;
