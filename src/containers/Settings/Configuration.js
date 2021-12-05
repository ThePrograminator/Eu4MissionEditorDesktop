import React, { useState, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MissionTreeContext from "../../contexts/MissionTreeContext";
import SettingsContext from "../../contexts/SettingsContext";
import EU4ConfigurationDefaults from "../../components/Settings/EU4ConfigurationDefaults";

const Configuration = (props) => {
  const missionTreeContext = useContext(MissionTreeContext);
  const settingsContext = useContext(SettingsContext);

  const switchConfigurationType = () => {
    var type = settingsContext.currentWorkspace.type;
    switch (type) {
      //EU4
      case 0:
        return <EU4ConfigurationDefaults />;
      //HOI4
      case 1:
        return null;
      default:
        return null;
    }
  };

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
          <h2>General: </h2>
          {switchConfigurationType()}
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default Configuration;

/*
<Row lg={true}>
        <Col lg={true}>
          <h2>Key-Bindings: </h2>
          <hr />
        </Col>
      </Row>*/
