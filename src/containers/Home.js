import React, { useState } from "react";
import MissionTabList from "./MissionTabList";
import Settings from "./Settings";
import { Container, Row, Tabs, Tab } from "react-bootstrap";
import WorkspaceModal from "../components/Modals/WorkspaceModal";

const Home = (props) => {
  const [show, setShow] = useState(12);
  console.log("props.show home", show);
  return (
    <Container fluid style={{ minHeight: "inherit" }}>
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
      <WorkspaceModal
        show={show}
        setShow={setShow}
      />
    </Container>
  );
};

export default Home;
