import React from "react";
import MissionTabList from "../containers/EU4/MissionTabList";
import { Tab, Container, Row } from "react-bootstrap";

const ContainerReadOnly = (props) => {
  switch (props.type) {
    //EU4
    case "EU4":
      return (
        <Tab eventKey="EU4" title="Missions" style={{ minHeight: "inherit" }}>
          <Container
            fluid
            style={{
              minHeight: "83vh",
              padding: "20px",
              paddingLeft: "0px",
            }}
          >
            <Row style={{ minHeight: "83vh" }}>
              <MissionTabList show={props.show} setShow={props.setShow} />
            </Row>
          </Container>
        </Tab>
      );
    //HOI4
    case "HOI4":
      return <button>Login</button>;
    default:
      return null;
  }
};

export default ContainerReadOnly;
