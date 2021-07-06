import React from "react";
import { Form, FormControl, Row, Col } from "react-bootstrap";

const SeriesReadOnly = (props) => {
  return (
    <div style={{ maxWidth: "750px" }}>
        <Row>
          <Col lg={true}>
            <Form.Group
              controlId="formSlot"
              style={{ maxWidth: "150px", minWidth: "150px" }}
            >
              <Form.Label>Slot</Form.Label>
              <FormControl
                type="number"
                placeholder="slot"
                aria-label="slot"
                value={props.selectedSeries.slot}
                aria-describedby="basic-addon1"
                readOnly
              />
            </Form.Group>
          </Col>
          <Col lg={true}>
            <div
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                minWidth: "100%",
                minHeight: "100%",
                background: props.selectedSeries.color,
              }}
            ></div>
          </Col>
        </Row>
    </div>
  );
};

export default SeriesReadOnly;