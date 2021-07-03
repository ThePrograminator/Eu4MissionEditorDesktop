import React, { useState, useEffect } from "react";

import { Form, FormControl, Col } from "react-bootstrap";

const ConfigurationDefaults = (props) => {
  const [maxSlot, setMaxSlot] = useState(5);
  const [startYear, setStartYear] = useState(1444);
  const [endYear, setEndYear] = useState(1821);

  return (
    <Form>
      <Form.Group controlId="formMaxSlot">
        <Form.Label>Max Slot</Form.Label>
        <FormControl
          type="number"
          placeholder="maxSlot"
          aria-label="maxSlot"
          value={maxSlot}
          aria-describedby="basic-addon1"
          min={1}
          onChange={(evt) => setMaxSlot(evt.target.value)}
          style={{ width: "20%" }}
        />
        <Form.Text className="text-muted">
          Which column the missions will appear in. Default is between 1 to 5.
        </Form.Text>
        <Form.Text className="text-muted">
          Note: Additional interface modding can be required to get
          columns(slots) with a value greater than 5 to be visible in game.
        </Form.Text>
      </Form.Group>
      <Form.Row style={{ width: "75%" }}>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Starting Year</Form.Label>
          <Form.Control
            type="number"
            placeholder="startingYear"
            aria-label="startingYear"
            aria-describedby="basic-addon1"
            value={startYear}
            onChange={(evt) => setStartYear(evt.target.value)}
            style={{ width: "50%" }}
          />
          <Form.Text className="text-muted">
            Year your mod starts, Vanilla EU4 starts in 1444. Used in
            'Compleated by' variable
          </Form.Text>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>End Year</Form.Label>
          <Form.Control
            type="number"
            placeholder="endYear"
            aria-label="endYear"
            aria-describedby="basic-addon1"
            value={endYear}
            onChange={(evt) => setEndYear(evt.target.value)}
            style={{ width: "50%" }}
          />
          <Form.Text className="text-muted">
            Year your mod ends, Vanilla EU4 starts in 1821. Used in 'Compleated
            by' variable
          </Form.Text>
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default ConfigurationDefaults;
