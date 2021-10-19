import React, { useContext } from "react";
import MissionTabButton from "../MissionTabButton";

import { ButtonGroup, Container, Row } from "react-bootstrap";
import MissionTreeContext from "../../contexts/MissionTreeContext";

import InProgressIDMap from "../../InProgressIDMap";

import { FaFileDownload, FaFileUpload } from "react-icons/fa";

const ImportExportFileTabHeader = (props) => {
  const missionTreeContext = useContext(MissionTreeContext);
  const handleClick = (id) => {
    console.log("clicked id", id);
    switch (id) {
      //Import
      case 1:
        handleImportMissionFile();
        break;
      //Export
      case 2:
        handleExportMissionFile();
        break;
      default:
        break;
    }
  };

  const handleImportMissionFile = () => {
    console.log("Import Mission");
    props.openFile();
  };

  const handleExportMissionFile = () => {
    console.log("Export Mission");
    //saveFile();
    props.setShow(2);
  };

  return (
    <ButtonGroup className="mr-2" aria-label="File group 2">
      <Container>
        <Row className="mr-2" style={{ maxHeight: "35%" }}>
          <p style={{ visibility: "hidden" }}> a</p>
        </Row>
        <Row className="mr-2">
          <MissionTabButton
            id={InProgressIDMap.import}
            inProgress={props.inProgressID}
            handleClick={handleClick}
            buttonText={"Import Mission File"}
            toolTipText={"Import Mission File"}
            icon={<FaFileDownload />}
          />
          <MissionTabButton
            id={InProgressIDMap.export}
            inProgress={props.inProgressID}
            handleClick={handleClick}
            buttonText={"Export Mission File"}
            toolTipText={"Export Mission File"}
            icon={<FaFileUpload />}
            disabled={missionTreeContext.missionTrees.length === 0}
          />
        </Row>
      </Container>
      
    </ButtonGroup>
  );
};

export default ImportExportFileTabHeader;
