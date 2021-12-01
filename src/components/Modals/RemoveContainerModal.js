import React, { useState, useEffect, useContext } from "react";

import InProgressIDMap from "../../InProgressIDMap";
import SettingsContext from "../../contexts/SettingsContext";

import { Modal, Button, Form } from "react-bootstrap";

const RemoveContainerModal = (props) => {
  const settingsContext = useContext(SettingsContext);
  const [selectedContainer, setSelectedContainer] = useState(props.container[0].id);
  const [selectedReplaceContainer, setSelectedReplaceContainer] = useState(
    props.container[1].id
  );

  const handleChange = (isReplaceContainer, value) => {
    if (isReplaceContainer) {
      if (value === selectedContainer) {
        setSelectedContainer(selectedReplaceContainer);
      }
      setSelectedReplaceContainer(value);
    } else {
      if (value === selectedReplaceContainer) {
        setSelectedReplaceContainer(selectedContainer);
      }
      setSelectedContainer(value);
    }
  };

  const handleClose = () => {
    props.setShow(0);
  };

  useEffect(() => {
    if (props.show === InProgressIDMap.removeContainer) {
      setSelectedContainer(props.container[0].id);
      setSelectedReplaceContainer(props.container[1].id);
      console.log("props.container", props.container[0]);
      console.log("selectedContainer", selectedContainer);
    }
  }, [props.show]);

  return (
    <Modal
      show={props.show === InProgressIDMap.removeContainer}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {"Remove " + settingsContext.getText("containerName")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formMission">
            <Form.Label>
              {"Select " +
                settingsContext.getText("containerName") +
                " To Remove"}
            </Form.Label>
            <Form.Control
              as="select"
              onChange={(evt) => handleChange(false, evt.target.value)}
              value={selectedContainer}
            >
              {props.container.length != 1
                ? props.container.map((container) => (
                    <option key={container.id} value={container.id}>
                      {container.name}
                    </option>
                  ))
                : null}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formMission">
            <Form.Label>
              {"Select " +
                settingsContext.getText("containerName") +
                " To Replace"}
            </Form.Label>
            <Form.Control
              as="select"
              onChange={(evt) => handleChange(true, evt.target.value)}
              value={selectedReplaceContainer}
            >
              {props.container.length != 1
                ? props.container.map((container) =>
                    container.id !== selectedContainer ? (
                      <option key={container.id} value={container.id}>
                        {container.name}
                      </option>
                    ) : null
                  )
                : null}
            </Form.Control>
            <Form.Text className="text-muted">
              {"All " +
                settingsContext.getText("nodeNameAdj") +
                " need a " +
                settingsContext.getText("containerName") +
                ", therefore " +
                settingsContext.getText("nodeNameAdj") +
                " linked to a removed " +
                settingsContext.getText("containerName") +
                " need a new " +
                settingsContext.getText("containerName")}
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
            props.setShow(0),
            console.log(selectedContainer),
            props.removeContainer(selectedContainer, selectedReplaceContainer)
          )}
        >
          {"Remove " + settingsContext.getText("containerName")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveContainerModal;
