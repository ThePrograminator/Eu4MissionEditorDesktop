import React, { useState, useContext } from "react";

import {
  Modal,
  ToggleButton,
  ButtonGroup,
} from "react-bootstrap";
import WorkSpaceForm from "../WorkSpaceForm";
import WorkSpaceSelect from "../WorkSpaceSelect";


const WorkspaceModal = (props) => {
  const [radioValue, setRadioValue] = useState("1");
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const radios = [
    { name: "Create", value: "1" },
    { name: "Load", value: "2" },
  ];

  const handleClose = () => {
    props.setShow(0);
  };
  console.log("props.show", props.show);

  return (
    <Modal show={props.show === 12} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton={false}>
        <Modal.Title>Create / Load Workspace</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ButtonGroup>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
        {radioValue == 1 ? (
          <WorkSpaceForm
            validated={validated}
            setValidated={setValidated}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            show={props.show}
            setShow={props.setShow}
          />
        ) : (
          <WorkSpaceSelect
            validated={validated}
            setValidated={setValidated}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            show={props.show}
            setShow={props.setShow}
          />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default WorkspaceModal;
