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

const FocusTree = (props) => {
  const settingsContext = useContext(SettingsContext);
  const mounted = useRef(false);
  const [name, setName] = useState(props.container.name);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [country, setCountry] = useState(props.container.country);
  const [ftDefault, setDefault] = useState(props.container.default);
  const [resetOnCivilWar, setResetOnCivilWar] = useState(
    props.container.reset_on_civil_war
  );
  const [sharedFocus, setSharedFocus] = useState(props.container.shared_focus);
  const [continuousFocusPosition, setContinuousFocusPosition] = useState(
    props.container.continuous_focus_position
  );
  const [initialShowPosition, setInitialShowPosition] = useState(
    props.container.initial_show_position
  );
  const [color, setColor] = useState(props.container.color);

  useEffect(() => {
    console.log("useEffect container [props.missionTree, props.container]");
    setName(props.container.name);
    setCountry(props.container.country);
    setDefault(props.container.default);
    setDefault(props.container.default);
    setResetOnCivilWar(props.container.reset_on_civil_war);
    setSharedFocus(props.container.shared_focus);
    setContinuousFocusPosition(props.container.continuous_focus_position);
    setInitialShowPosition(props.container.initial_show_position);

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
            country: country,
            default: ftDefault,
            reset_on_civil_war: resetOnCivilWar,
            shared_focus: sharedFocus,
            continuous_focus_position: continuousFocusPosition,
            initial_show_position: initialShowPosition,
            color: color,
          };
          console.log("data", el);
        }

        return el;
      })
    );
  }, [
    name,
    country,
    ftDefault,
    resetOnCivilWar,
    sharedFocus,
    continuousFocusPosition,
    initialShowPosition,
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
        <Form.Label>Focus Tree Name</Form.Label>
        <FormControl
          className="mb-2"
          placeholder="Name..."
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

      <Form.Group controlId="formCountry">
        <Form.Label>Country</Form.Label>
        <FormControl
          as="textarea"
          placeholder="Country..."
          aria-label="Country"
          value={country}
          aria-describedby="basic-addon1"
          onChange={(evt) => setCountry(evt.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formDefault">
        <Form.Check
          type="checkbox"
          label="Default"
          checked={ftDefault}
          onChange={(evt) => setDefault(evt.target.checked)}
        />
        <Form.Text className="text-muted">
          default is what defines whether a focus tree is generic or
          country-specific
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formResetOnCivilWar">
        <Form.Check
          type="checkbox"
          label="ResetOnCivilWar"
          checked={ftDefault}
          onChange={(evt) => setDefault(evt.target.checked)}
        />
        <Form.Text className="text-muted">
          If set to true, if a civil war occurs the breakout country will have
          the same focus tree and completed focuses as the original. If set to
          false, the civil war country will have the same focus tree but not the
          same completed focuses. Defaults to false.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formSharedFocus">
        <Form.Label>Shared Focus</Form.Label>
        <FormControl
          className="mb-2"
          placeholder="Shared Focus..."
          aria-label="shared_focus"
          value={sharedFocus}
          aria-describedby="basic-addon1"
          onChange={(evt) => setSharedFocus(evt.target.value)}
        />
        <Form.Text className="text-muted">
          Optional. Will load any shared focuses you create.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formContinuousFocusPosition">
        <Form.Label>Continous Focus Position</Form.Label>
        <FormControl
          as="textarea"
          placeholder="Continous Focus Position..."
          aria-label="Continous Focus Position"
          value={continuousFocusPosition}
          aria-describedby="basic-addon1"
          onChange={(evt) => setContinuousFocusPosition(evt.target.value)}
        />
        <Form.Text className="text-muted">
          Optional. Allows you to move the continuous focus box if your focus
          tree will go in the default area.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formInitialShowPosition">
        <Form.Label>Initial Show Position</Form.Label>
        <FormControl
          as="textarea"
          placeholder="Initial Show Position..."
          aria-label="Initial Show Position"
          value={initialShowPosition}
          aria-describedby="basic-addon1"
          onChange={(evt) => setInitialShowPosition(evt.target.value)}
        />
        <Form.Text className="text-muted">
          Optional. Decides the position of the camera when you first open the
          focus tree. The offset will modify the position if the trigger is
          true.
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

export default FocusTree;
