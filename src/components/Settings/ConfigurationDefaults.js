import React, { useState, useEffect, useContext } from "react";

import { Form, FormControl, Col } from "react-bootstrap";
import SettingsContext from "../../contexts/SettingsContext";

const electron = window.require("electron");
const settings = electron.remote.require("electron-settings");

const ConfigurationDefaults = (props) => {
  const settingsContext = useContext(SettingsContext);
  const [maxSlot, setMaxSlot] = useState(settingsContext.maxSlot);
  const [startYear, setStartYear] = useState(settingsContext.startYear);
  const [endYear, setEndYear] = useState(settingsContext.endYear);

  const handleUpdateMaxSlot = (evt) => {
    setMaxSlot(evt.target.value);
    settingsContext.updateState(evt.target.name, evt.target.value);
    settings.set("maxSlot", evt.target.value);
  };

  const handleUpdateStartYear = (evt) => {
    setStartYear(evt.target.value);
    settingsContext.updateState(evt.target.name, evt.target.value);
    settings.set("startYear", evt.target.value);
  };

  const handleUpdateEndYear = (evt) => {
    setEndYear(evt.target.value);
    settingsContext.updateState(evt.target.name, evt.target.value);
    settings.set("endYear", evt.target.value);
  };

  return (
    <Form>
      <Form.Row style={{ width: "75%" }}>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Starting Year</Form.Label>
          <Form.Control
            type="number"
            placeholder="startingYear"
            aria-label="startingYear"
            aria-describedby="basic-addon1"
            name="startYear"
            value={startYear}
            onChange={handleUpdateStartYear}
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
            name="endYear"
            value={endYear}
            onChange={handleUpdateEndYear}
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

/*
 <Form.Group controlId="formMaxSlot">
        <Form.Label>Max Slot</Form.Label>
        <FormControl
          type="number"
          name="maxSlot"
          placeholder="maxSlot"
          aria-label="maxSlot"
          value={maxSlot}
          aria-describedby="basic-addon1"
          min={1}
          onChange={handleUpdateMaxSlot}
          style={{ width: "20%" }}
        />
        <Form.Text className="text-muted">
          Which column the missions will appear in. Default is between 1 to 5.
        </Form.Text>
        <Form.Text className="text-muted">
          Note: Additional interface modding can be required to get
          columns(slots) with a value greater than 5 to be visible in game.
        </Form.Text>
      </Form.Group>*/

export default ConfigurationDefaults;
