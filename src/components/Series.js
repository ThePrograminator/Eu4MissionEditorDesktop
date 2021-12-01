import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from "react";
import { Form, FormControl } from "react-bootstrap";
import { SketchPicker } from "react-color";
import "../Editor.css";
import InputValidation from "../helper/InputValidation";

import SettingsContext from "../contexts/SettingsContext";

const Series = (props) => {
  const settingsContext = useContext(SettingsContext);
  const mounted = useRef(false);
  const [name, setName] = useState(props.container.name);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [slot, setSlot] = useState(props.container.slot);
  const [generic, setGeneric] = useState(props.container.generic);
  const [ai, setAi] = useState(props.container.ai);
  const [hasCountryShield, setHasCountryShield] = useState(
    props.container.has_country_shield
  );
  const [potentialOnLoad, setPotentialOnLoad] = useState(
    props.container.potential_on_load
  );
  const [potential, setPotential] = useState(props.container.potential);
  const [color, setColor] = useState(props.container.color);

  useEffect(() => {
    console.log("useEffect container [props.missionTree, props.container]");
    setName(props.container.name);
    setSlot(props.container.slot);
    setGeneric(props.container.generic);
    setAi(props.container.ai);
    setHasCountryShield(props.container.hasCountryShield);
    setPotentialOnLoad(props.container.potentialOnLoad);
    setPotential(props.container.potential);
    setColor(props.container.color);
  }, [props.missionTree, props.container, props.allContainer]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    console.log("Container useEffect");
    props.setContainer((els) =>
      els.map((el) => {
        if (el.id === props.container.id) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          el = {
            ...el,
            name: name,
            slot: slot,
            generic: generic,
            ai: ai,
            has_country_shield: hasCountryShield,
            potential_on_load: potentialOnLoad,
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

  const handleSetName = (name) => {
    let { valid, errorMessage } = InputValidation.validateContainerName(
      props.id,
      name,
      props.allContainer
    );
    console.log("handleSetName valid", valid);
    console.log("handleSetName errorMessage", errorMessage);
    if (valid) {
      setNameErrorMessage(errorMessage);
      return;
    }
    setNameErrorMessage("");
    setName(name);
  };

  return (
    <Form>
      <Form.Group controlId="formName">
        <Form.Label>Series Name</Form.Label>
        <FormControl
          className="mb-2"
          placeholder="name"
          aria-label="name"
          value={name}
          aria-describedby="basic-addon1"
          onChange={(evt) => handleSetName(evt.target.value)}
          isInvalid={nameErrorMessage !== ""}
        />
        {nameErrorMessage !== "" ? (
          <Form.Control.Feedback type="invalid">
            {nameErrorMessage}
          </Form.Control.Feedback>
        ) : null}
      </Form.Group>

      <Form.Group controlId="formSlot">
        <Form.Label>Slot</Form.Label>
        <FormControl
          type="number"
          placeholder="slot"
          aria-label="slot"
          value={slot}
          aria-describedby="basic-addon1"
          min={1}
          max={settingsContext.maxSlot}
          onChange={(evt) => setSlot(parseInt(evt.target.value))}
          style={{ width: "20%" }}
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
          Whether missions within this container are considered generic.
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
          Whether the AI will claim missions in this container.
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
          Determines whether a container is loaded at all. Used to limit container to
          DLC.
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
          Determines whether a container is loaded at all. Used to limit container to
          DLC.
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
  );
};

export default Series;
