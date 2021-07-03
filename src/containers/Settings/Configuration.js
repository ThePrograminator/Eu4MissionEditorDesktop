import React, { useState, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MissionTreeContext from "../../contexts/MissionTreeContext";
import ConfigurationDefaults from "../../components/Settings/ConfigurationDefaults";

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
      <Row lg={true}>
        <Col lg={true}>
          <h2>Defaults: </h2>
          <ConfigurationDefaults />
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default Configuration;
