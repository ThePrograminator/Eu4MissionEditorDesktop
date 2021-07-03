import React, { useState } from "react";
import { Button, Accordion, Card, Container, Row, Col } from "react-bootstrap";

const electron = window.require("electron");
const appVersion = electron.remote.app.getVersion();
const test = electron.remote.app.g;

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
      <hr />
    </Container>
  );
};

export default Version;

/*
<Row lg={true}>
        <Col lg={true}>
          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                Release Notes
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>Hello! I'm the body</Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
      </Row>*/
