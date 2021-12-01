import React, { useState, useEffect, useContext } from "react";

import { Modal, Button, Form } from "react-bootstrap";
import SettingsContext from "../../contexts/SettingsContext";

const ExportMissionModal = (props) => {
  const settingsContext = useContext(SettingsContext);
  const [selectedMissionTab, setSelectedMissionTab] = useState(
    props.missionTabs[0].id
  );
  const [exportLocalisation, setExportLocalisation] = useState(false);

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
        <Modal.Title>
          {"Export " + settingsContext.getText("filename")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formMission">
            <Form.Label>
              {"Select " + settingsContext.getText("filename") + " To Export"}
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
          </Form.Group>
          <Form.Group controlId="formExportLocalisation">
            <Form.Check
              type="checkbox"
              label="Export Localization File"
              checked={exportLocalisation}
              onChange={(evt) => setExportLocalisation(evt.target.checked)}
            />
            <Form.Text className="text-muted">(Only English).</Form.Text>
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
            props.exportFile(selectedMissionTab, exportLocalisation)
          )}
        >
          {"Export " + settingsContext.getText("filename")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExportMissionModal;
