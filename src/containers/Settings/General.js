import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const General = (props) => {
  return (
    <Container fluid>
      <Row
        lg={true}
        style={{ margin: "auto", textAlign: "center", width: "50%" }}
      >
        <h1 style={{ width: "100%" }}>General</h1>
      </Row>
      <Row lg={true}>
        <Col lg={true}>
          <h2>Support: </h2>
          <hr />
          <p>
            Please consider supporting this project by getting involved on the
            EU4 Forum or on Patreon.
          </p>
        </Col>
      </Row>
      <Row lg={true}>
        <Col lg={true}>
          <h2>About: </h2>
          <hr />
          <p>
            EU4 Mission Editor is a desktop application created to assist and
            ease the development of EU4 mods. Working on my mod: Lord of
            Universalis I found it tedious to work with mission trees
            (especially large ones), without any visual representation outside
            the one inside the game. This led to me opening and closing of EU4
            many times during development just to view my mission tree changes
            each time taking close to 5 minutes to load the game each time. This
            application offers the following features:
          </p>
          <ul>
            <li>Create, Import and Export Mission Files</li>
            <li>
              Visual Graph editor which lets you move and connect missions
              together
            </li>
            <li>
              Create Missions and Mission Series and edit all their variables
            </li>
            <li>Assign a Color to a Mission Series to easily identify them</li>
            <li>Checks and warnings if using same mission names</li>
            <li>
              Check for Application Updates, Download and install them with ease
              through the application
            </li>
            <li>Light and Dark Mode</li>
          </ul>
          <p>
            As with using any 3rd Party tools, backing your files up is crucial.
            I won’t guarantee that your mission file is always exported
            correctly, and therefore I don’t recommend only working with one
            version of your mission file.
          </p>
          <p>
            The Application was created using a Javascript Framework called
            Electron together with a Frontend Framework called ‘Create React
            App’. The Application does not use or require internet connection,
            aside from checking and downloading updates. Checkout the Github
            Page:
          </p>
          <a href="https://github.com/ThePrograminator/Eu4MissionEditorDesktop">
            Github Page
          </a>
          <p>
            Please consider supporting this project by getting involved on the
            EU4 Forum or on Patreon.
          </p>
        </Col>
      </Row>
      <Row lg={true}>
        <Col lg={true}>
          <h2>Author: </h2>
          <hr />
          <p>
            This Application was created by DKStranger, creator of the EU4 Mod
            Lord of Universalis
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default General;
