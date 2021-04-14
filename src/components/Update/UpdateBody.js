import React from "react";

import { Container } from "react-bootstrap";

import UpdateVersion from "./UpdateVersion";
import UpdateBodyText from "./UpdateBodyText";
import UpdateDownloading from "./UpdateDownloading";

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

const UpdateBody = (props) => {
  const showBody = () => {
    switch (props.updateStatus) {
      case NO_UPDATE_CHECK_PENDING:
        return (
          <UpdateBodyText title={"Check for Update"}>
            <h4>Remember to export files before updating</h4>
          </UpdateBodyText>
        );
      case NO_UPDATE_AVAILABLE:
        return (
          <UpdateBodyText title={"No Update Available"}>
            <h4>Check again another time</h4>
          </UpdateBodyText>
        );
      case CHECK_FOR_UPDATE_PENDING:
        return (
          <UpdateDownloading
            updateStatus={props.updateStatus}
            downloadProgress={props.downloadProgress}
          />
        );
      case CHECK_FOR_UPDATE_SUCCESS:
        return (
          <UpdateBodyText title={"Update Available"}>
            <UpdateVersion newVersion={props.newVersion} />
          </UpdateBodyText>
        );
      case CHECK_FOR_UPDATE_FAILURE:
        return (
          <UpdateBodyText title={"Checking Update Error"}></UpdateBodyText>
        );
      case DOWNLOAD_UPDATE_PENDING:
        return (
          <UpdateDownloading
            updateStatus={props.updateStatus}
            downloadProgress={props.downloadProgress}
          />
        );
      case DOWNLOAD_UPDATE_SUCCESS:
        return (
          <UpdateBodyText title={"Update Downloaded"}>
            <h4>Click below to install update</h4>
          </UpdateBodyText>
        );
      case DOWNLOAD_UPDATE_FAILURE:
        return (
          <UpdateBodyText title={"Downloading Update Error"}></UpdateBodyText>
        );
      case QUIT_AND_INSTALL_UPDATE:
        return (
          <UpdateBodyText
            title={"Quiting and Opening Installer"}
          ></UpdateBodyText>
        );
      default:
        return (
          <UpdateBodyText title={"Check for Update"}>
            <h4>Remember to export files before updating</h4>
          </UpdateBodyText>
        );
    }
  };

  return <Container fluid>{showBody()}</Container>;
};

export default UpdateBody;
/*

{showUpdateVersion() ? (
        <UpdateVersion newVersion={props.newVersion} />
      ) : null}
      {showDownloading() ? (
        <UpdateDownloading downloadProgress={props.downloadProgress} />
      ) : null}*/
