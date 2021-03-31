import React, { useState } from "react";
import MissionTab from "./MissionTab";
import TabHeader from "../components/TabHeader";
import MissionTabButton from "../components/MissionTabButton";
import ExportMissionModal from "../components/ExportMissionModal";
import CreateMissionModal from "../components/CreateMissionModal";
import Reader from "../Reader";
import Writer from "../Writer";
import {
  Container,
  Row,
  Tabs,
  Tab,
  ButtonGroup,
  Button,
} from "react-bootstrap";

import "../tabs.css";

import {
  FaFileImport,
  FaFileExport,
  FaFileMedical,
  FaFileExcel,
} from "react-icons/fa";

const electron = window.require("electron");
const fs = electron.remote.require("fs");
const dialog = electron.remote.dialog;
var path = require("path");

const inProgressIDMap = { import: 1, export: 2, create: 3, remove: 4 };

const MissionList = (props) => {
  const [key, setKey] = useState("home");
  const [inProgressID, setinProgressID] = useState(0);
  const [show, setShow] = useState(0);

  const handleClick = (id) => {
    console.log("clicked id", id);
    console.log("inProgressIDMap", inProgressIDMap.import);
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
      //Remove
      case 4:
        handleRemoveMissionFile();
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
    setinProgressID(inProgressIDMap.import);

    const file = files[0];

    console.log("file", file);

    Reader.asyncHandleFile(file, (allMissionTabs) => {
      props.setMissionTabs((els) => els.concat(allMissionTabs));
      setinProgressID(0);
    });
  };

  const exportFile = (id) => {
    console.log("id", id);
    console.log("props.missionTabs", props.missionTabs);
    //let index = props.missionTabs.findIndex((missionTab) => missionTab.id === id);
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
      setinProgressID(inProgressIDMap.export);
      console.log("saving");
      fs.writeFileSync(filePath, fileData, "utf-8");
      setinProgressID(0);
    });
  };

  const createFile = (name) => {
    console.log("name", name);
    let missionTabsCopy = [...props.missionTabs];

    var length = 0;
    if (missionTabsCopy.length !== 0) length = missionTabsCopy.length + 1;
    var id = `file_${length.toString()}`;

    const newMissionTab = {
      id: id,
      name: name,
      fileName: name + ".txt",
      series: [],
      missions: [],
      edges: [],
    };
    missionTabsCopy.push(newMissionTab);
    props.setMissionTabs(missionTabsCopy);
  };

  const handleImportMissionFile = () => {
    console.log("Import Mission");
    openFile();
  };

  const handleExportMissionFile = () => {
    console.log("Export Mission");
    //saveFile();
    setShow(2);
  };

  const handleCreateMissionFile = () => {
    console.log("Added Mission");

    setShow(3);
  };

  const handleRemoveMissionFile = () => {
    console.log("Removed Mission");
  };

  return (
    <Container fluid style={{ minHeight: "inherit" }}>
      <ButtonGroup size="lg" className="mb-2">
        <MissionTabButton
          id={inProgressIDMap.import}
          inProgress={inProgressID}
          handleClick={handleClick}
          buttonText={"Import Mission File"}
          toolTipText={"Import Mission File"}
          icon={<FaFileImport />}
        />
        <MissionTabButton
          id={inProgressIDMap.export}
          inProgress={inProgressID}
          handleClick={handleClick}
          buttonText={"Export Mission File"}
          toolTipText={"Export Mission File"}
          icon={<FaFileExport />}
        />
        <MissionTabButton
          id={inProgressIDMap.create}
          inProgress={inProgressID}
          handleClick={handleClick}
          buttonText={"Create Mission File"}
          toolTipText={"Create Mission File"}
          icon={<FaFileMedical />}
        />
        <MissionTabButton
          id={inProgressIDMap.remove}
          inProgress={inProgressID}
          handleClick={handleClick}
          buttonText={"Remove Mission File"}
          toolTipText={"Remove Mission File"}
          icon={<FaFileExcel />}
        />
      </ButtonGroup>
      <hr />
      <Tabs defaultActiveKey="createMissionFile" id="uncontrolled-tab-example">
        {props.missionTabs.length > 0
          ? props.missionTabs.map((missionTab) => {
              console.log("MissionTabs loaded", props.missionTabs);
              return (
                <Tab
                  key={missionTab.name}
                  eventKey={"missionTab_" + missionTab.id}
                  title={missionTab.name}
                  style={{ minHeight: "inherit" }}
                >
                  <Container fluid style={{ minHeight: "90vh" }}>
                    <Row style={{ minHeight: "90vh" }}>
                      <MissionTab
                        missions={missionTab.missions}
                        series={missionTab.series}
                        edges={missionTab.edges}
                        missionTabs={props.missionTabs}
                        setMissionTabs={props.setMissionTabs}
                        fileID={missionTab.id}
                      />
                    </Row>
                  </Container>
                </Tab>
              );
            })
          : null}
      </Tabs>
      <ExportMissionModal
        show={show}
        setShow={setShow}
        exportFile={exportFile}
        missionTabs={props.missionTabs}
      />
      <CreateMissionModal
        show={show}
        setShow={setShow}
        createFile={createFile}
        missionTabs={props.missionTabs}
      />
    </Container>
  );
};

export default MissionList;

/*


<NodeEditor
                        missions={props.missions}
                        setMissions={props.setMissions}
                        series={props.series}
                        setSeries={props.setSeries}
                        edges={props.edges}
                      />
                      */
