import React, { useState, useEffect, useCallback } from "react";
import { Form, FormControl } from "react-bootstrap";
import "../Editor.css";

const CreateMissionTab = (props) => {
  const [name, setName] = useState(props.series.name);

  return (
    <div style={{ minWidth: "500px" }}>
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Series Name</Form.Label>
          <FormControl
            className="mb-2"
            placeholder="name"
            aria-label="name"
            value={name}
            aria-describedby="basic-addon1"
            onChange={(evt) => setName(evt.target.value)}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default CreateMissionTab;
