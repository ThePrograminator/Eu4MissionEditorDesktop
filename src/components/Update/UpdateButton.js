import React from "react";

import {
  NO_UPDATE_CHECK_PENDING,
  NO_UPDATE_AVAILABLE,
  CHECK_FOR_UPDATE_PENDING,
  CHECK_FOR_UPDATE_SUCCESS,
  CHECK_FOR_UPDATE_FAILURE,
  DOWNLOAD_UPDATE_PENDING,
  DOWNLOAD_UPDATE_SUCCESS,
  DOWNLOAD_UPDATE_FAILURE,
  QUIT_AND_INSTALL_UPDATE,
} from "../../constants/IPCConstants";

import { Button } from "react-bootstrap";

const UpdateVersion = (props) => {
  const getButtonText = () => {
    switch (props.updateStatus) {
      case NO_UPDATE_CHECK_PENDING:
        return "Check for Update";
      case CHECK_FOR_UPDATE_PENDING:
        return "Checking for Update";
      case CHECK_FOR_UPDATE_SUCCESS:
        return "Update";
      case DOWNLOAD_UPDATE_PENDING:
        return "Updating";
      case DOWNLOAD_UPDATE_SUCCESS:
        return "Quit and Install";
      default:
        return "Check for Update";
    }
  };

  return (
    <Button
      variant="primary"
      onClick={props.handleClick}
      disabled={
        props.updateStatus === CHECK_FOR_UPDATE_PENDING ||
        props.updateStatus === DOWNLOAD_UPDATE_PENDING ||
        props.updateStatus === QUIT_AND_INSTALL_UPDATE
      }
    >
      {getButtonText()}
    </Button>
  );
};

export default UpdateVersion;
