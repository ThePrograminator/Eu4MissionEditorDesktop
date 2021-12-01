import React, { useState, useEffect, useContext } from "react";
import MissionTabList from "./EU4/MissionTabList";
import Settings from "./Settings";
import { Container, Row, Tabs, Tab } from "react-bootstrap";
import WorkspaceModal from "../components/Modals/WorkspaceModal";
import SettingsContext from "../contexts/SettingsContext";

const Home = (props) => {
  const settingsContext = useContext(SettingsContext);
  const [show, setShow] = useState(12);

  const switchTabType = (type) => {
    switch (type) {
      //EU4
      case 0:
        return (
          <Tab
            eventKey={0}
            title={settingsContext.getText("tabTitle")}
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
        );
      //HOI4
      case 1:
        return <button>Login</button>;
      default:
        return null;
    }
  };

  return (
    <Container fluid style={{ minHeight: "inherit" }}>
      {settingsContext.currentWorkspace !== null ? (
        <div>
          <div>
            <p>
              Workspace - {settingsContext.getText("name")} -{" "}
              {settingsContext.currentWorkspace.name}
            </p>
          </div>
          <Tabs
            defaultActiveKey={settingsContext.currentWorkspace.type}
            id="uncontrolled-tab-example"
          >
            <Tab
              eventKey={0}
              title={settingsContext.getText("tabTitle")}
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

/*
{switchTabType(settingsContext.currentWorkspace.type)}
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

*/
