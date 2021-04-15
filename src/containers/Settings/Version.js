import React, { useState } from "react";
import { Button, Tab, Container, Row, Col } from "react-bootstrap";

const electron = window.require("electron");
const appVersion = electron.remote.app.getVersion();

const Version = (props) => {
  return (
    <Container fluid>
      <Row
        lg={true}
        style={{ margin: "auto", textAlign: "center", width: "50%" }}
      >
        <h1 style={{ width: "100%" }}>Version</h1>
      </Row>
      <Row lg={true}>
        <Col lg={true}>
          <p>Current version: {appVersion}</p>
        </Col>
      </Row>
      <Row lg={true}>
        <Col lg={true}>
          <Button onClick={props.handleCheckUpdate}>Check for Update</Button>
        </Col>
      </Row>
      <hr/>
    </Container>
  );
};

export default Version;
