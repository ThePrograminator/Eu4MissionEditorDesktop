import React, { useState, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MissionTreeContext from "../../contexts/MissionTreeContext";

const Configuration = (props) => {
  const missionTreeContext = useContext(MissionTreeContext);
  return (
    <Container fluid>
      <Row
        lg={true}
        style={{ margin: "auto", textAlign: "center", width: "50%" }}
      >
        <h1 style={{ width: "100%" }}>Configuration</h1>
      </Row>
      <Row lg={true}>
        <Col lg={true}>
          <h2>Key-Bindings: </h2>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default Configuration;
