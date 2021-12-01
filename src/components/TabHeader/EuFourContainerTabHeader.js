import React, { useContext } from "react";
import MissionTabButton from "../MissionTabButton";
import { ButtonGroup, Container, Row } from "react-bootstrap";
import MissionTreeContext from "../../contexts/MissionTreeContext";
import SettingsContext from "../../contexts/SettingsContext";

import InProgressIDMap from "../../InProgressIDMap";

import { FaPlusSquare, FaTrashAlt } from "react-icons/fa";

const EuFourContainerTabHeader = (props) => {
  const missionTreeContext = useContext(MissionTreeContext);
  const settingsContext = useContext(SettingsContext);
  const handleClick = (id) => {
    console.log("clicked id", id);
    switch (id) {
      //Add Container
      case 9:
        handleAddContainer();
        break;
      //Remove Container
      case 10:
        handleRemoveContainer();
        break;
      //Duplicate Container
      case 11:
        handleDuplicateContainer();
        break;
      default:
        break;
    }
  };

  const handleAddContainer = () => {
    console.log("Add Container");

    props.setShow(9);
  };

  const handleRemoveContainer = () => {
    console.log("Remove Container");

    props.setShow(10);
  };

  const handleDuplicateContainer = () => {
    console.log("Duplicate Container");

    props.setShow(11);
  };

  const checkRemoveContainerDisabled = () => {
    if (
      missionTreeContext.missionTrees === undefined ||
      missionTreeContext.missionTrees === null
    )
      return true;

    if (props.fileKey === undefined || props.fileKey === null) return true;

    if (missionTreeContext.missionTrees.length === 0) return true;

    let index = missionTreeContext.missionTrees.findIndex(
      (missionTab) => missionTab.id === props.fileKey
    );

    if (index === -1) return false;

    if (missionTreeContext.missionTrees[index].container.length > 1)
      return false;

    return true;
  };

  return (
    <ButtonGroup className="mr-2" aria-label="Container group">
      <Container>
        <Row className="mr-2" style={{ maxHeight: "35%" }}>
          <p>{settingsContext.getText("containerName")}</p>
        </Row>
        <Row className="mr-2">
          <MissionTabButton
            id={InProgressIDMap.addContainer}
            inProgress={props.inProgressID}
            handleClick={handleClick}
            buttonText={"Add " + settingsContext.getText("containerName")}
            toolTipText={"Add " + settingsContext.getText("containerName")}
            icon={<FaPlusSquare />}
            disabled={
              missionTreeContext.missionTrees.length === 0 ||
              props.fileKey == null
            }
          />
          <MissionTabButton
            id={InProgressIDMap.removeContainer}
            inProgress={props.inProgressID}
            handleClick={handleClick}
            buttonText={"Remove " + settingsContext.getText("containerName")}
            toolTipText={"Remove " + settingsContext.getText("containerName")}
            icon={<FaTrashAlt />}
            disabled={checkRemoveContainerDisabled()}
          />
        </Row>
      </Container>
    </ButtonGroup>
  );
};

export default EuFourContainerTabHeader;

/*

<div className="mr-2" style={{ borderLeft: "2px solid lightgrey" }} />
        */
