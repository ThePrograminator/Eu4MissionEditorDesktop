import React from "react";

import { Row, Spinner, ProgressBar } from "react-bootstrap";

import {
  CHECK_FOR_UPDATE_PENDING,
  DOWNLOAD_UPDATE_PENDING,
} from "../../constants/IPCConstants";

const UpdateVersion = (props) => {
  const getSpinnerText = () => {
    switch (props.updateStatus) {
      case CHECK_FOR_UPDATE_PENDING:
        return "Checking for Update...";
      case DOWNLOAD_UPDATE_PENDING:
        return "Downloading...";
      default:
        return "";
    }
  };

  return (
    <Row
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "100%",
      }}
    >
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "100%",
        }}
      >
        <Spinner
          animation="border"
          role="status"
          style={{ width: "100px", height: "100px" }}
        />
        <span className="sr-only">loading...</span>
      </Row>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "100%",
        }}
      >
        <h3>{getSpinnerText()}</h3>
      </Row>
      {props.updateStatus === DOWNLOAD_UPDATE_PENDING ? (
        <ProgressBar animated now={props.downloadProgress} />
      ) : null}
    </Row>
  );
};

export default UpdateVersion;
