import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Form,
  FormControl,
  Col,
  OverlayTrigger,
  Button,
  Tooltip,
} from "react-bootstrap";
import { SketchPicker } from "react-color";
import RenderToolTip from "./RenderToolTip";
import "../Editor.css";

const Series = (props) => {
  const mounted = useRef(false);
  const [name, setName] = useState(props.series.name);
  const [slot, setSlot] = useState(props.series.slot);
  const [generic, setGeneric] = useState(props.series.generic);
  const [ai, setAi] = useState(props.series.ai);
  const [hasCountryShield, setHasCountryShield] = useState(
    props.series.hasCountryShield
  );
  const [potentialOnLoad, setPotentialOnLoad] = useState(
    props.series.potentialOnLoad
  );
  const [potential, setPotential] = useState(props.series.potential);
  const [color, setColor] = useState(props.series.color);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    console.log("Series useEffect");
    props.setSeries((els) =>
      els.map((el) => {
        if (el.id === props.series.id) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          el = {
            ...el,
            name: name,
            slot: slot,
            generic: generic,
            ai: ai,
            hasCountryShield: hasCountryShield,
            potentialOnLoad: potentialOnLoad,
            potential: potential,
            color: color,
          };
          console.log("data", el);
        }

        return el;
      })
    );
  }, [
    name,
    slot,
    generic,
    ai,
    hasCountryShield,
    potentialOnLoad,
    potential,
    color,
  ]);

  const handleChangeComplete = useCallback(
    (color) => {
      setColor(color.hex);
    },
    [setColor]
  );

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

        <Form.Group controlId="formSlot">
          <Form.Label>Slot</Form.Label>
          <FormControl
            type="number"
            placeholder="slot"
            aria-label="slot"
            value={slot}
            aria-describedby="basic-addon1"
            onChange={(evt) => setSlot(parseInt(evt.target.value))}
          />
          <Form.Text className="text-muted">
            Which column the missions will appear in. 1 to 5.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formGeneric">
          <Form.Check
            type="checkbox"
            label="Generic"
            checked={generic}
            onChange={(evt) => setGeneric(evt.target.checked)}
          />
          <Form.Text className="text-muted">
            Whether missions within this series are considered generic.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formAi">
          <Form.Check
            type="checkbox"
            label="AI"
            checked={ai}
            onChange={(evt) => setAi(evt.target.checked)}
          />
          <Form.Text className="text-muted">
            Whether the AI will claim missions in this series.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formHasCountryShield">
          <Form.Check
            type="checkbox"
            label="Has Country Shield"
            checked={hasCountryShield}
            onChange={(evt) => setHasCountryShield(evt.target.checked)}
          />
          <Form.Text className="text-muted">
            Whether to display the country shield on the icon.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formPotentialOnLoad">
          <Form.Label>Potential on Load</Form.Label>
          <FormControl
            as="textarea"
            placeholder="potentialOnLoad"
            aria-label="Potential On Load"
            value={potentialOnLoad}
            aria-describedby="basic-addon1"
            onChange={(evt) => setPotentialOnLoad(evt.target.value)}
          />
          <Form.Text className="text-muted">
            Determines whether a series is loaded at all. Used to limit series
            to DLC.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formPotential">
          <Form.Label>Potential</Form.Label>
          <FormControl
            as="textarea"
            placeholder="potential"
            aria-label="Potential"
            value={potential}
            aria-describedby="basic-addon1"
            onChange={(evt) => setPotential(evt.target.value)}
          />
          <Form.Text className="text-muted">
            Determines whether a series is loaded at all. Used to limit series
            to DLC.
          </Form.Text>
        </Form.Group>
        <hr />
        <Form.Group controlId="formColor">
          <Form.Label>Color</Form.Label>
          <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
          <Form.Text className="text-muted">
            (Optional) This color is only used in the Mission Editor, and is not
            part of the mission file
          </Form.Text>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Series;
