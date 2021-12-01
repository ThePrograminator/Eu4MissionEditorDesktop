import React, { useContext } from "react";
import Reader from "../Reader";
import Writer from "../Writer";
import { ButtonToolbar } from "react-bootstrap";
import MissionTreeContext from "../contexts/MissionTreeContext";
import SettingsContext from "../contexts/SettingsContext";

import InProgressIDMap from "../InProgressIDMap";
import FileTabHeader from "../components/TabHeader/FileTabHeader";
import ImportExportFileTabHeader from "../components/TabHeader/ImportExportFileTabHeader";
import EuFourMissionTabHeader from "../components/TabHeader/EuFourMissionTabHeader";
import EuFourSeriesTabHeader from "../components/TabHeader/EuFourSeriesTabHeader";

import Factory from "../helper/Factory";
import ExportMissionModal from "../components/Modals/ExportMissionModal";
import CreateMissionModal from "../components/Modals/CreateMissionModal";
import DuplicateMissionFileModal from "../components/Modals/DuplicateMissionFileModal";
import RemoveMissionFileModal from "../components/Modals/RemoveMissionFileModal";

const electron = window.require("electron");
const fs = electron.remote.require("fs");
const dialog = electron.remote.dialog;
const settings = electron.remote.require("electron-settings");

const MissionTabHeader = (props) => {
  const missionTreeContext = useContext(MissionTreeContext);
  const settingsContext = useContext(SettingsContext);

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
        missionTreeContext.addMissionTree(allMissionTabs[0]);
        missionTreeContext.setAvailableNodeId(
          allMissionTabs[0].importedMissionLastId
        );
        missionTreeContext.setAvailableSeriesId(
          allMissionTabs[0].importedSeriesLastId
        );
        props.setinProgressID(0);
      }
    );
  };

  const exportFile = (id, exportLocalisation) => {
    console.log("id", id);
    console.log("props.missionTabs", missionTreeContext.missionTrees);
    //var missionTab = missionTreeContext.missionTrees[id];
    let index = missionTreeContext.missionTrees.findIndex(
      (missionTab) => missionTab.id === id
    );
    var missionTab = missionTreeContext.missionTrees[index];
    console.log("missionTab", missionTab);
    const fileData = Writer.exportMissionTree(
      missionTab.series,
      missionTab.missions
    );
    let localizationFileData = "";
    if (exportLocalisation) {
      localizationFileData = Writer.exportLocalization(
        missionTab.series,
        missionTab.missions
      );
    }

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
      if (exportLocalisation) {
        let localizationpath = filePath.substring(0, filePath.length - 3);
        localizationpath += "yml";
        fs.writeFileSync(localizationpath, localizationFileData, "utf-8");
      }

      fs.writeFileSync(filePath, fileData, "utf-8");

      saveFilePathToWorkspace(filePath);

      props.setinProgressID(0);
    });
  };

  const saveFilePathToWorkspace = (filePath) => {
    //Save to workspace
    var currentWorkspace = settingsContext.currentWorkspace;
    let filePaths = [...currentWorkspace.filePaths];
    filePaths.push(filePath);
    currentWorkspace.filePaths = filePaths;

    var workspaces = [...settingsContext.workspaces];
    var index = workspaces.findIndex((x) => x.id === currentWorkspace.id);
    workspaces[index] = currentWorkspace;

    settingsContext.updateState("workspaces", workspaces);
    settings.set("workspaces", workspaces);
    settingsContext.updateState("currentWorkspace", currentWorkspace);
  };

  const createFile = (name, seriesName) => {
    console.log("name", name);

    let newSeries = Factory.createDefaultSeries(
      missionTreeContext.getAvailableSeriesId(),
      seriesName
    );
    let newMissionTab = Factory.createDefaultMissionTab(
      missionTreeContext.getAvailableTreeId(),
      name
    );
    newMissionTab.series = [newSeries];

    missionTreeContext.addMissionTree(newMissionTab);
  };

  const duplicateFile = (duplicateId, fileName) => {
    console.log(
      "duplicateFile props.missionTabs",
      missionTreeContext.missionTrees
    );
    console.log("duplicateFile duplicateId", duplicateId);
    console.log("duplicateFile fileName", fileName);

    let newMissionTab = Factory.createDefaultMissionTab(
      missionTreeContext.getAvailableTreeId(),
      fileName
    );
    let index = missionTreeContext.missionTrees.findIndex(
      (missionTab) => missionTab.id === duplicateId
    );
    let fileToDuplicate = missionTreeContext.missionTrees[index];
    let newID = newMissionTab.id;
    newMissionTab = {
      ...fileToDuplicate,
      id: newID,
      name: fileName,
      fileName: fileName + ".txt",
    };
    missionTreeContext.addMissionTree(newMissionTab);
  };

  const removeFile = (id) => {
    console.log("removeFile id", id);

    let missionTabsCopy = [...missionTreeContext.missionTrees];
    let index = missionTabsCopy.findIndex((missionTab) => missionTab.id === id);

    let missionTab = missionTabsCopy[index];
    console.log("removeFile missionTab", missionTab);
    missionTreeContext.removeMissionTree(missionTab);
  };

  return (
    <div>
      <ButtonToolbar aria-label="Toolbar with button groups">
        <FileTabHeader
          inProgressID={props.inProgressID}
          setinProgressID={props.setinProgressID}
          fileKey={props.fileKey}
          setShow={props.setShow}
        />
        <ImportExportFileTabHeader
          inProgressID={props.inProgressID}
          setinProgressID={props.setinProgressID}
          fileKey={props.fileKey}
          setShow={props.setShow}
          openFile={openFile}
          exportFile={exportFile}
        />
        <div className="mr-2" style={{ borderLeft: "2px solid lightgrey" }} />
        <EuFourMissionTabHeader
          inProgressID={props.inProgressID}
          fileKey={props.fileKey}
          setShow={props.setShow}
        />
        <div className="mr-2" style={{ borderLeft: "2px solid lightgrey" }} />
        <EuFourSeriesTabHeader
          inProgressID={props.inProgressID}
          fileKey={props.fileKey}
          setShow={props.setShow}
        />
      </ButtonToolbar>
      {props.show === InProgressIDMap.export ? (
        <div>
          <ExportMissionModal
            show={props.show}
            setShow={props.setShow}
            exportFile={exportFile}
            missionTabs={missionTreeContext.missionTrees}
          />
        </div>
      ) : null}
      {props.show === InProgressIDMap.create ? (
        <div>
          <CreateMissionModal
            show={props.show}
            setShow={props.setShow}
            createFile={createFile}
            missionTabs={missionTreeContext.missionTrees}
          />
        </div>
      ) : null}
      {props.show === InProgressIDMap.remove ? (
        <div>
          <RemoveMissionFileModal
            show={props.show}
            setShow={props.setShow}
            removeFile={removeFile}
            missionTabs={missionTreeContext.missionTrees}
          />
        </div>
      ) : null}
      {props.show === InProgressIDMap.duplicate ? (
        <div>
          <DuplicateMissionFileModal
            show={props.show}
            setShow={props.setShow}
            duplicateFile={duplicateFile}
            missionTabs={missionTreeContext.missionTrees}
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
/*

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
                id={InProgressIDMap.duplicateMission}
                inProgress={props.inProgressID}
                handleClick={handleClick}
                buttonText={"Duplicate Series"}
                toolTipText={"Duplicate Series"}
                icon={<FaClone />}
                disabled={
                  missionTreeContext.missionTrees.length === 0 ||
                  props.fileKey == null
                }
              />

*/
