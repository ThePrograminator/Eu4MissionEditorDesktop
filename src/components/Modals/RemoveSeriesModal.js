import React, { useState, useEffect, useContext } from "react";

import InProgressIDMap from "../../InProgressIDMap";
import SettingsContext from "../../contexts/SettingsContext";

import { Modal, Button, Form } from "react-bootstrap";

const RemoveSeriesModal = (props) => {
  const settingsContext = useContext(SettingsContext);
  const [selectedSeries, setSelectedSeries] = useState(props.series[0].id);
  const [selectedReplaceSeries, setSelectedReplaceSeries] = useState(
    props.series[1].id
  );

  const handleChange = (isReplaceSeries, value) => {
    if (isReplaceSeries) {
      if (value === selectedSeries) {
        setSelectedSeries(selectedReplaceSeries);
      }
      setSelectedReplaceSeries(value);
    } else {
      if (value === selectedReplaceSeries) {
        setSelectedReplaceSeries(selectedSeries);
      }
      setSelectedSeries(value);
    }
  };

  const handleClose = () => {
    props.setShow(0);
  };

  useEffect(() => {
    if (props.show === InProgressIDMap.removeSeries) {
      setSelectedSeries(props.series[0].id);
      setSelectedReplaceSeries(props.series[1].id);
      console.log("props.series", props.series[0]);
      console.log("selectedSeries", selectedSeries);
    }
  }, [props.show]);

  return (
    <Modal
      show={props.show === InProgressIDMap.removeSeries}
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
              value={selectedSeries}
            >
              {props.series.length != 1
                ? props.series.map((series) => (
                    <option key={series.id} value={series.id}>
                      {series.name}
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
              value={selectedReplaceSeries}
            >
              {props.series.length != 1
                ? props.series.map((series) =>
                    series.id !== selectedSeries ? (
                      <option key={series.id} value={series.id}>
                        {series.name}
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
            console.log(selectedSeries),
            props.removeSeries(selectedSeries, selectedReplaceSeries)
          )}
        >
          {"Remove " + settingsContext.getText("containerName")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveSeriesModal;
