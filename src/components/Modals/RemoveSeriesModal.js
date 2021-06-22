import React, { useState, useEffect } from "react";

import InProgressIDMap from "../../InProgressIDMap";

import { Modal, Button, Form } from "react-bootstrap";

const RemoveSeriesModal = (props) => {
  const [selectedSeries, setSelectedSeries] = useState(props.series[0]);

  const handleClose = () => {
    props.setShow(0);
  };

  useEffect(() => {
    if (
      props.show === InProgressIDMap.removeSeries &&
      props.series.length !== 0
    ) {
      setSelectedSeries(props.series[0]);
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
        <Modal.Title>Remove Series</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formMission">
            <Form.Label>Select Series To Remove</Form.Label>
            <Form.Control
              as="select"
              onChange={(evt) => setSelectedSeries(evt.target.value)}
              value={selectedSeries}
            >
              {props.series.length != 0
                ? props.series.map((series) => (
                    <option key={series.id} value={series.id}>
                      {series.name}
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
            console.log(selectedSeries),
            props.removeSeries(selectedSeries)
          )}
        >
          Remove Series
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveSeriesModal;
