import React, { useContext } from "react";
import MissionTabButton from "../MissionTabButton";
import { ButtonGroup, Container, Row } from "react-bootstrap";
import MissionTreeContext from "../../contexts/MissionTreeContext";

import InProgressIDMap from "../../InProgressIDMap";

import { FaPlusSquare, FaTrashAlt } from "react-icons/fa";

const EuFourSeriesTabHeader = (props) => {
  const missionTreeContext = useContext(MissionTreeContext);
  const handleClick = (id) => {
    console.log("clicked id", id);
    switch (id) {
      //Add Series
      case 9:
        handleAddSeries();
        break;
      //Remove Series
      case 10:
        handleRemoveSeries();
        break;
      //Duplicate Series
      case 11:
        handleDuplicateSeries();
        break;
      default:
        break;
    }
  };

  const handleAddSeries = () => {
    console.log("Add Series");

    props.setShow(9);
  };

  const handleRemoveSeries = () => {
    console.log("Remove Series");

    props.setShow(10);
  };

  const handleDuplicateSeries = () => {
    console.log("Duplicate Series");

    props.setShow(11);
  };

  const checkRemoveSeriesDisabled = () => {
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

    if (missionTreeContext.missionTrees[index].series.length > 1) return false;

    return true;
  };

  return (
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
    </ButtonGroup>
  );
};

export default EuFourSeriesTabHeader;

/*

<div className="mr-2" style={{ borderLeft: "2px solid lightgrey" }} />
        */
