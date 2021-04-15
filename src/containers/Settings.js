import React, { useState } from "react";
import { Nav, Tab, Container, Row, Col, ListGroup } from "react-bootstrap";
import UpdateModal from "../components/Update/UpdateModal";
import Version from "./Settings/Version";
import Preferences from "./Settings/Preferences";

const electron = window.require("electron");
const appVersion = electron.remote.app.getVersion();
const ipcRenderer = electron.ipcRenderer;
var path = require("path");

const Settings = (props) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  //const [ isCheckingForUpdate, setIsCheckingForUpdate ] = useState(false);

  //ipcRenderer.sendto(,'checking-for-update');
  const handleCheckUpdate = () => {
    console.log("handleCheckUpdate");
    setShowUpdateModal(true);
    //const res = ipcRenderer.sendSync('runCommand');
    //console.log('response', res);
  };

  return (
    <Container fluid style={{ minHeight: "inherit" }}>
      <br />
      <Tab.Container
        unmountOnExit={true}
        id="left-tabs-example"
        defaultActiveKey="#link1"
      >
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey={"#link1"}>Version</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={"#link2"}>Preferences</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col lg={true}>
            <Tab.Content>
              <Tab.Pane eventKey={"#link1"}>
                <Version handleCheckUpdate={handleCheckUpdate} />
              </Tab.Pane>
              <Tab.Pane eventKey={"#link2"}>
                <Preferences
                  currentTheme={props.currentTheme}
                  setCurrentTheme={props.setCurrentTheme}
                  themesList={props.themesList}
                />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default Settings;

/*<div>
      <Button onClick={() => openFile()}>Import Mission File</Button>
    </div>


    <Container fluid>
      <Row lg={true}>
        <Col lg={true} style={{borderStyle: "solid", borderColor: "#363537"}}>
          <h1>Eu4 Mission Editor</h1>
          <p>{appVersion}</p>
          <Button>Check for Update</Button>
        </Col>
      </Row>
    </Container>


	<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
      <Row style={{ minWidth: "100%" }}>
        <Col lg={true} style={{ maxWidth: "250px" }}>
          <ListGroup>
            <ListGroup.Item
              action
              href={"#link1"}
              style={{ minWidth: "200px" }}
            >
              Version
            </ListGroup.Item>
            <ListGroup.Item
              action
              href={"#link2"}
              style={{ minWidth: "200px" }}
            >
              Preferences
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col lg={true}>
          <Tab.Content>
            <Tab.Pane eventKey={"#link1"}>
              <Version handleCheckUpdate={handleCheckUpdate} />
            </Tab.Pane>
            <Tab.Pane eventKey={"#link2"}>
              <Preferences
                currentTheme={props.currentTheme}
                setCurrentTheme={props.setCurrentTheme}
                themesList={props.themesList}
              />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
      <UpdateModal
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
      />
    </Tab.Container>
*/
