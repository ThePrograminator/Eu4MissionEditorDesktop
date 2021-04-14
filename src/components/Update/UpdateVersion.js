import React from "react";

import { Row } from "react-bootstrap";

const electron = window.require("electron");
const appVersion = electron.remote.app.getVersion();

const UpdateVersion = (props) => {
  return (
    <div>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "100%",
        }}
      >
        <h4>Current Version: {appVersion}</h4>
      </Row>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "100%",
        }}
      >
        <h4>New Version: {props.newVersion.releaseName}</h4>
      </Row>
    </div>
  );
};

export default UpdateVersion;
