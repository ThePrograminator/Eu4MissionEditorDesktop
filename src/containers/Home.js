import React, { useState } from "react";
import MissionTabList from "./MissionTabList";
import Settings from "./Settings";
import { Container, Row, Tabs, Tab } from "react-bootstrap";
const Home = (props) => {
  const [series, setSeries] = useState([]);
  const [missions, setMissions] = useState([]);
  const [missionTabs, setMissionTabs] = useState([]);
  const [edges, setEdges] = useState([]);
  console.log("missionTabs", missionTabs);
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
              minHeight: "90vh",
              padding: "20px",
              paddingLeft: "0px",
            }}
          >
            <Row style={{ minHeight: "90vh" }}>
              <MissionTabList
                missionTabs={missionTabs}
                setMissionTabs={setMissionTabs}
              />
            </Row>
          </Container>
        </Tab>
        <Tab
          eventKey="settings"
          title="Settings"
          style={{ minHeight: "inherit" }}
        >
          <Container fluid style={{ minHeight: "90vh" }}>
            <Row style={{ minHeight: "90vh" }}>
              <Settings
                setMissions={setMissions}
                setSeries={setSeries}
                setEdges={setEdges}
                missionTabs={missionTabs}
                setMissionTabs={setMissionTabs}
              ></Settings>
            </Row>
          </Container>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Home;
