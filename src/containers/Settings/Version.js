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
      <Row lg={true}>
        <Col lg={true}>
          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                Release Notes
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Row lg={true}>
                    <Col lg={true}>
                      <p>Current version: {appVersion}</p>
                    </Col>
                  </Row>
                  <Row lg={true}>
                    <Col lg={true}>
                    <p>- Fixed Importing Mission file were there is no positions or a mix</p>
                    <br/>
                    <p>- Exporting Mission files now sorts missions into position order</p>
                    <br/>
                    <p>- Fixed Issues with moving mission not updating position</p>
                    <br/>
                    <p>- Added validation on Series Names</p>
                    <br/>
                    <p>- Added Export Localisation option</p>
                    </Col>
                  </Row>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default Version;

/*
 */
