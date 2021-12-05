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
                    <p>- Added Heart of Iron 4 Focus Tree Support, Import, export and create Focus tree for HOI4</p>
                    <p>- Added Workspaces, when you export a file the Paradox Node Editor will remember the path a load the file automatically next time you start your workspace</p>
                    <p>- Added Colored Nodes are also shown on minimap</p>
                    <p>- Added Text to requiredments for mission to help understanding the concept of the dragging lines between the nodes</p>
                    <p>- Changed height of nodes to a minimum size</p>
                    <p>- Changed Background of Minimap to a darkish grey</p>
                    <p>- Changed Size of File Tabs list to a smaller size</p>
                    <p>- Changed Size of Mission/Focus editor (right side) to a smaller size</p>
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
