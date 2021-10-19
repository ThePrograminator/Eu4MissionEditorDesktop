import React, { useContext } from "react";
import MissionTabButton from "../MissionTabButton";
import { ButtonGroup, Container, Row } from "react-bootstrap";
import MissionTreeContext from "../../contexts/MissionTreeContext";

import InProgressIDMap from "../../InProgressIDMap";

import { FaPlusSquare, FaTrashAlt } from "react-icons/fa";

const EuFourMissionTabHeader = (props) => {
  const missionTreeContext = useContext(MissionTreeContext);
  const handleClick = (id) => {
    console.log("clicked id", id);
    switch (id) {
      //Create Mission
      case 6:
        handleCreateMission();
        break;
      //Remove Mission
      case 7:
        handleRemoveMission();
        break;
      //Duplicate Mission
      case 8:
        handleDuplicateMission();
        break;
      default:
        break;
    }
  };

  const handleCreateMission = () => {
    console.log("Create Mission");

    props.setShow(6);
  };

  const handleRemoveMission = () => {
    console.log("Remove Mission");

    props.setShow(7);
  };

  const handleDuplicateMission = () => {
    console.log("Duplicate Mission");

    props.setShow(8);
  };

  const checkDuplicateMissionDisabled = () => {
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

    console.log(
      "checkDuplicateMissionDisabled missionTreeContext.missionTrees",
      missionTreeContext.missionTrees
    );

    if (missionTreeContext.missionTrees[index].missions.length > 0)
      return false;

    return true;
  };

  return (
    <ButtonGroup className="mr-2" aria-label="Mission group">
      <Container>
        <Row className="mr-2" style={{ maxHeight: "35%" }}>
          <p>Mission</p>
        </Row>
        <Row className="mr-2">
          <MissionTabButton
            id={InProgressIDMap.addMission}
            inProgress={props.inProgressID}
            handleClick={handleClick}
            buttonText={"Add Mission"}
            toolTipText={"Add Mission"}
            icon={<FaPlusSquare />}
            disabled={
              missionTreeContext.missionTrees.length === 0 ||
              props.fileKey == null
            }
          />
          <MissionTabButton
            id={InProgressIDMap.removeMission}
            inProgress={props.inProgressID}
            handleClick={handleClick}
            buttonText={"Remove Mission"}
            toolTipText={"Remove Mission"}
            icon={<FaTrashAlt />}
            disabled={checkDuplicateMissionDisabled()}
          />
        </Row>
      </Container>
    </ButtonGroup>
  );
};

export default EuFourMissionTabHeader;

/*

<div className="mr-2" style={{ borderLeft: "2px solid lightgrey" }} />
        <ButtonGroup className="mr-2" aria-label="Series group">
          <Container>
            <Row className="mr-2" style={{ maxHeight: "35%" }}>
              <p>Series</p>
            </Row>
            <Row className="mr-2">
              <MissionTabButton
                id={InProgressIDMap.addSeries}
                inProgress={props.inProgressID}
                handleClick={handleClick}
                buttonText={"Add Series"}
                toolTipText={"Add Series"}
                icon={<FaPlusSquare />}
                disabled={
                  missionTreeContext.missionTrees.length === 0 ||
                  props.fileKey == null
                }
              />
              <MissionTabButton
                id={InProgressIDMap.removeSeries}
                inProgress={props.inProgressID}
                handleClick={handleClick}
                buttonText={"Remove Series"}
                toolTipText={"Remove Series"}
                icon={<FaTrashAlt />}
                disabled={checkRemoveSeriesDisabled()}
              />
            </Row>
          </Container>
        </ButtonGroup>*/
