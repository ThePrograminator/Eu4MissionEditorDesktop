import React, { useState } from "react";
import { Nav, Tab, Container, Row, Col } from "react-bootstrap";
import Version from "./Settings/Version";
import Preferences from "./Settings/Preferences";
import General from "./Settings/General";
import Configuration from "./Settings/Configuration";
import UpdateModal from "../components/Update/UpdateModal";

const Settings = (props) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleCheckUpdate = () => {
    console.log("handleCheckUpdate");
    setShowUpdateModal(true);
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
                <Nav.Link eventKey={"#link1"}>General</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={"#link2"}>Version</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey={"#link4"}>Preferences</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col lg={true}>
            <Tab.Content>
              <Tab.Pane eventKey={"#link1"}>
                <General />
              </Tab.Pane>
              <Tab.Pane eventKey={"#link2"}>
                <Version handleCheckUpdate={handleCheckUpdate} />
              </Tab.Pane>

              <Tab.Pane eventKey={"#link4"}>
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
    </Container>
  );
};

export default Settings;
/*
<Nav.Item>
								<Nav.Link eventKey={'#link3'}>Configuration</Nav.Link>
							</Nav.Item>

							<Tab.Pane eventKey={"#link3"}>
                <Configuration />
              </Tab.Pane>
*/
