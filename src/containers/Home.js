import React, { useState, useContext } from "react";
import MissionTabList from "./MissionTabList";
import Settings from "./Settings";
import { Container, Row, Tabs, Tab } from "react-bootstrap";
import WorkspaceModal from "../components/Modals/WorkspaceModal";
import SettingsContext from "../contexts/SettingsContext";

const Home = (props) => {
  const settingsContext = useContext(SettingsContext);
  const [show, setShow] = useState(12);
  console.log("props.show home", show);
  return (
    <Container fluid style={{ minHeight: "inherit" }}>
      {settingsContext.currentWorkspace !== null ? (
        <div>
          <div>
            <p>Workspace - {settingsContext.currentWorkspace.type} - {settingsContext.currentWorkspace.name}</p>
          </div>
          <Tabs defaultActiveKey="missions" id="uncontrolled-tab-example">
            <Tab
              eventKey="missions"
              title="Missions"
              style={{ minHeight: "inherit" }}
            >
              <Container
                fluid
                style={{
                  minHeight: "83vh",
                  padding: "20px",
                  paddingLeft: "0px",
                }}
              >
                <Row style={{ minHeight: "83vh" }}>
                  <MissionTabList show={show} setShow={setShow} />
                </Row>
              </Container>
            </Tab>
            <Tab
              eventKey="settings"
              title="Settings"
              style={{ minHeight: "inherit" }}
            >
              <Container fluid style={{ minHeight: "83vh" }}>
                <Row style={{ minHeight: "83vh" }}>
                  <Settings
                    currentTheme={props.currentTheme}
                    setCurrentTheme={props.setCurrentTheme}
                    themesList={props.themesList}
                  />
                </Row>
              </Container>
            </Tab>
          </Tabs>
        </div>
      ) : null}

      <WorkspaceModal show={show} setShow={setShow} />
    </Container>
  );
};

export default Home;
