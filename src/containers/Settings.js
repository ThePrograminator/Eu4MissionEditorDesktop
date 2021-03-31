import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import Reader from "../Reader";

const electron = window.require("electron");
const fs = electron.remote.require("fs");
const dialog = electron.remote.dialog;
var path = require("path");

let id = 1;
const getFileId = () => `file_${(id++).toString()}`;

const Settings = (props) => {
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

    const file = files[0];

    console.log("file", file);

    asyncHandleFile(file);
  };

  const asyncHandleFile = async (file) => {
    const fileContent = fs.readFileSync(file).toString();
    const correctedPath = file.replace(/\\/g, "/");
    var fileName = path.basename(correctedPath);

    const extName = path
      .extname(correctedPath)
      .toLocaleLowerCase()
      .substring(1);

    let fileObj = {
      name: fileName,
      fullDirPath: file,
      type: extName,
    };
    console.log("fileObj", fileObj);

    let allSeries = [];
    let allMissions = [];
    let allMissionTabs = [];

    var wholeString = fileContent;
    console.log("wholeString", wholeString);
    let regex = new RegExp("#.+\r\n", "g");
    wholeString = wholeString.replace(regex, "\r\n");
    while (true) {
      var first = wholeString.indexOf("{");
      if (first === -1) break;

      //Find series
      var index = Reader.findClosingBracketIndex(wholeString, first);
      var stringArr = wholeString.substring(0, ++index);
      var seriesText = Reader.cleanUpSeries(stringArr);
      const series = Reader.handleSeries(seriesText);
      allSeries.push(series);

      //remove series from string
      wholeString = wholeString.substring(++index, wholeString.length);
      console.log("\n");
    }

    console.log("allSeries", allSeries);

    allSeries.map((series) =>
      series.missions.map((mission, index) => {
        mission.position.x = series.slot * 150;
        if (mission.data.position !== -1)
          mission.position.y = mission.data.position * 150;
        else {
          mission.data.position = index + 1;
          mission.position.y = mission.data.position * 150;
        }
        mission.data.selectedSeries = series.id;
        allMissions.push(mission);
      })
    );
    const connections = Reader.createConnections(allMissions);
    const newMissionTab = {
      id: getFileId(),
      name: fileName.substring(0, fileName.indexOf(".")),
      fileName: fileName + extName,
      series: allSeries,
      missions: allMissions,
      edges: connections,
    };
    allMissionTabs.push(newMissionTab);

    console.log("allMissionTabs", allMissionTabs);
    props.setMissionTabs((els) => els.concat(allMissionTabs));
  };

  return (
    <Container fluid>
      <Row lg={true}>
        <Col lg={true} style={{borderStyle: "solid", borderColor: "#363537"}}>
          <h1>Build</h1>
          <Button>Check for Update</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;

/*<div>
      <Button onClick={() => openFile()}>Import Mission File</Button>
    </div>
*/