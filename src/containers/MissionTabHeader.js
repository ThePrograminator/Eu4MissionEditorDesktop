import React, { useState, useContext } from "react";
import MissionTabButton from "../components/MissionTabButton";
import ExportMissionModal from "../components/Modals/ExportMissionModal";
import CreateMissionModal from "../components/Modals/CreateMissionModal";
import DuplicateMissionFileModal from "../components/Modals/DuplicateMissionFileModal";
import RemoveMissionFileModal from "../components/Modals/RemoveMissionFileModal";
import Reader from "../Reader";
import Writer from "../Writer";
import { ButtonGroup, ButtonToolbar, Container, Row } from "react-bootstrap";
import Factory from "../helper/Factory";
import MissionTreeContext from "../contexts/MissionTreeContext";

import InProgressIDMap from "../InProgressIDMap";

import {
  FaFileDownload,
  FaFileUpload,
  FaFileImport,
  FaFileMedical,
  FaFileExcel,
  FaPlusSquare,
  FaTrashAlt,
  FaClone,
} from "react-icons/fa";
//IoDuplicateSharp

const electron = window.require("electron");
const fs = electron.remote.require("fs");
const dialog = electron.remote.dialog;
var path = require("path");

const MissionTabHeader = (props) => {
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

  const openFile = () => {
    var window = electron.remote.getCurrentWindow();
    const files = dialog.showOpenDialogSync(window, {
      properties: ["openFile"],
      filters: [
        {
          name: "Text Files",
          extensions: ["txt"],
        },
      ],
    });
    if (!files) return;
    props.setinProgressID(InProgressIDMap.import);

    const file = files[0];

    console.log("file", file);

    Reader.asyncHandleFile(
      file,
      missionTreeContext.getAvailableTreeId(),
      (allMissionTabs) => {
        props.setMissionTabs((els) => els.concat(allMissionTabs));
        missionTreeContext.addMissionTree(allMissionTabs[0]);
        props.setinProgressID(0);
      }
    );
  };

  const exportFile = (id) => {
    console.log("id", id);
    console.log("props.missionTabs", props.missionTabs);
    var missionTab = props.missionTabs[id];
    console.log("missionTab", missionTab);
    const fileData = Writer.exportMissionTree(
      missionTab.series,
      missionTab.missions
    );
    var options = {
      title: "Save Mission File",
      defaultPath:
        "C:\\Users\\Christian\\Documents\\Paradox Interactive\\Europa Universalis IV\\mod\\lou_m\\missions" +
        "\\" +
        missionTab.name,
      buttonLabel: "Save",

      filters: [
        { name: "txt", extensions: ["txt"] },
        { name: "All Files", extensions: ["*"] },
      ],
    };
    var window = electron.remote.getCurrentWindow();
    dialog.showSaveDialog(window, options).then(({ filePath }) => {
      if (!filePath) return;
      props.setinProgressID(InProgressIDMap.export);
      console.log("saving");
      fs.writeFileSync(filePath, fileData, "utf-8");
      props.setinProgressID(0);
    });
  };

  const createFile = (name, seriesName) => {
    console.log("name", name);

    let missionTabsCopy = [...props.missionTabs];

    let newSeries = Factory.createDefaultSeries(0, seriesName);
    let newMissionTab = Factory.createDefaultMissionTab(
      missionTreeContext.getAvailableTreeId(),
      name
    );
    newMissionTab.series = [newSeries];

    missionTabsCopy.push(newMissionTab);
    console.log("Mission tabs", missionTabsCopy);
    props.setMissionTabs(missionTabsCopy);
    missionTreeContext.addMissionTree(newMissionTab);
  };

  const duplicateFile = (duplicateId, fileName) => {
    console.log("duplicateFile duplicateId", duplicateId);
    console.log("duplicateFile fileName", fileName);
  };

  const removeFile = (id) => {
    console.log("removeFile id", id);

    let missionTabsCopy = [...props.missionTabs];
    let index = missionTabsCopy.findIndex((missionTab) => missionTab.id === id);
    missionTabsCopy.splice(index, 1);
    props.setMissionTabs(missionTabsCopy);
  };

  const handleImportMissionFile = () => {
    console.log("Import Mission");
    openFile();
  };

  const handleExportMissionFile = () => {
    console.log("Export Mission");
    //saveFile();
    props.setShow(2);
  };

  const handleCreateMissionFile = () => {
    console.log("Added Mission");
    console.log("props.filekey", props.fileKey);

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

  const checkDuplicateMissionDisabled = () => {
    if (props.missionTabs === undefined || props.missionTabs === null)
      return true;

    if (props.fileKey === undefined || props.fileKey === null) return true;

    if (props.missionTabs.length === 0) return true;

    let index = props.missionTabs.findIndex(
      (missionTab) => missionTab.id === props.fileKey
    );

    console.log("got here", props.missionTabs[index].missions);
    if (props.missionTabs[index].missions.length > 0) return false;

    return true;
  };

  const checkRemoveSeriesDisabled = () => {
    if (props.missionTabs === undefined || props.missionTabs === null)
      return true;

    if (props.fileKey === undefined || props.fileKey === null) return true;

    if (props.missionTabs.length === 0) return true;

    let index = props.missionTabs.findIndex(
      (missionTab) => missionTab.id === props.fileKey
    );

    if (props.missionTabs[index].series.length > 1) return false;

    return true;
  };

  return (
    <div>
      <ButtonToolbar aria-label="Toolbar with button groups">
        <ButtonGroup className="mr-2" aria-label="File group">
          <Container>
            <Row className="mr-2" style={{ maxHeight: "35%" }}>
              <p>File</p>
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
                disabled={props.missionTabs.length === 0}
              />
              <MissionTabButton
                id={InProgressIDMap.remove}
                inProgress={props.inProgressID}
                handleClick={handleClick}
                buttonText={"Remove Mission File"}
                toolTipText={"Remove Mission File"}
                icon={<FaFileExcel />}
                disabled={props.missionTabs.length === 0}
              />
            </Row>
          </Container>
        </ButtonGroup>
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
                disabled={props.missionTabs.length === 0}
              />
            </Row>
          </Container>
        </ButtonGroup>

        <div className="mr-2" style={{ borderLeft: "2px solid lightgrey" }} />
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
                  props.missionTabs.length === 0 || props.fileKey == null
                }
              />
              <MissionTabButton
                id={InProgressIDMap.duplicateMission}
                inProgress={props.inProgressID}
                handleClick={handleClick}
                buttonText={"Duplicate Mission"}
                toolTipText={"Duplicate Mission"}
                icon={<FaClone />}
                disabled={checkDuplicateMissionDisabled()}
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
                  props.missionTabs.length === 0 || props.fileKey == null
                }
              />
              <MissionTabButton
                id={InProgressIDMap.duplicateMission}
                inProgress={props.inProgressID}
                handleClick={handleClick}
                buttonText={"Duplicate Series"}
                toolTipText={"Duplicate Series"}
                icon={<FaClone />}
                disabled={
                  props.missionTabs.length === 0 || props.fileKey == null
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
      </ButtonToolbar>
      {props.show !== 0 ? (
        <div>
          <ExportMissionModal
            show={props.show}
            setShow={props.setShow}
            exportFile={exportFile}
            missionTabs={props.missionTabs}
          />
          <CreateMissionModal
            show={props.show}
            setShow={props.setShow}
            createFile={createFile}
            missionTabs={props.missionTabs}
          />
          <RemoveMissionFileModal
            show={props.show}
            setShow={props.setShow}
            removeFile={removeFile}
            missionTabs={props.missionTabs}
          />
          <DuplicateMissionFileModal
            show={props.show}
            setShow={props.setShow}
            duplicateFile={duplicateFile}
            missionTabs={props.missionTabs}
          />
        </div>
      ) : null}
    </div>
  );
};

export default MissionTabHeader;

/*
{props.show !== 0 ? (
        <div>
          <ExportMissionModal
            show={props.show}
            setShow={props.setShow}
            exportFile={exportFile}
            missionTabs={props.missionTabs}
          />
          <CreateMissionModal
            show={props.show}
            setShow={props.setShow}
            createFile={createFile}
            missionTabs={props.missionTabs}
          />
          <RemoveMissionModal
            show={props.show}
            setShow={props.setShow}
            removeFile={removeFile}
            missionTabs={props.missionTabs}
          />
          <DuplicateMissionModal
            show={props.show}
            setShow={props.setShow}
            duplicateFile={duplicateFile}
            missionTabs={props.missionTabs}
          />
        </div>
      ) : null}
      */
