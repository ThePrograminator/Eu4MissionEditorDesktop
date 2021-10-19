import React, { useContext } from "react";
import MissionTabButton from "../MissionTabButton";
import { ButtonGroup, Container, Row } from "react-bootstrap";
import MissionTreeContext from "../../contexts/MissionTreeContext";

import InProgressIDMap from "../../InProgressIDMap";

import { FaFileImport, FaFileMedical, FaFileExcel } from "react-icons/fa";

const WorkspaceTabHeader = (props) => {
  const missionTreeContext = useContext(MissionTreeContext);
  const handleClick = (id) => {
    console.log("clicked id", id);
    switch (id) {
      //Create
      case 3:
        handleCreateMissionFile();
        break;
      //Duplicate
      case 4:
        handleDuplicateMissionFile();
        break;
      //Remove
      case 5:
        handleRemoveMissionFile();
        break;
      default:
        break;
    }
  };

  const handleCreateMissionFile = () => {
    console.log("Added Mission");
    console.log("props.filekey", props.fileKey);
    console.log("props.show", props.show);

    props.setShow(3);
  };

  const handleDuplicateMissionFile = () => {
    console.log("Duplicate Mission");

    props.setShow(4);
  };

  const handleRemoveMissionFile = () => {
    console.log("Removed Mission");

    props.setShow(5);
  };

  return (
    <ButtonGroup className="mr-2" aria-label="File group">
      <Container>
        <Row className="mr-2" style={{ maxHeight: "35%" }}>
          <p>Workspace</p>
        </Row>
        <Row className="mr-2">
          <MissionTabButton
            id={InProgressIDMap.create}
            inProgress={props.inProgressID}
            handleClick={handleClick}
            buttonText={"Create Mission File"}
            toolTipText={"Create Mission File"}
            icon={<FaFileMedical />}
          />
          <MissionTabButton
            id={InProgressIDMap.duplicate}
            inProgress={props.inProgressID}
            handleClick={handleClick}
            buttonText={"Duplicate Mission File"}
            toolTipText={"Duplicate Mission File"}
            icon={<FaFileImport />}
            disabled={missionTreeContext.missionTrees.length === 0}
          />
          <MissionTabButton
            id={InProgressIDMap.remove}
            inProgress={props.inProgressID}
            handleClick={handleClick}
            buttonText={"Remove Mission File"}
            toolTipText={"Remove Mission File"}
            icon={<FaFileExcel />}
            disabled={missionTreeContext.missionTrees.length === 0}
          />
        </Row>
      </Container>
    </ButtonGroup>
  );
};

export default WorkspaceTabHeader;
