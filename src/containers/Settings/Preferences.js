import React, { useState } from "react";
import { Form, FormControl, Container, Row, Col } from "react-bootstrap";

const electron = window.require("electron");
const appVersion = electron.remote.app.getVersion();

const Preferences = (props) => {
  console.log(props.currentTheme);
  return (
    <Container fluid>
      <Row
        lg={true}
        style={{ margin: "auto", textAlign: "center", width: "50%" }}
      >
        <h1 style={{ width: "100%" }}>Preferences</h1>
      </Row>
      <Row lg={true}>
        <Col lg={true}>
          <Form>
            <Form.Group as={Row} controlId="formSeries">
              <Form.Label column sm="2">
                Theme
              </Form.Label>
              <Col sm="2">
                <Form.Control
                  as="select"
                  onChange={(evt) =>
                    props.setCurrentTheme(props.themesList[evt.target.value])
                  }
                  value={props.currentTheme}
                >
                  {props.themesList.map((theme, index) =>
                      <option key={index} value={index}>
                        {theme.theme}
                      </option>
                  )}
                </Form.Control>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <hr />
    </Container>
  );
};

export default Preferences;
