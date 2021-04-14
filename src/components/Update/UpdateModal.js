import React, { useState, useEffect } from "react";

import {
  Modal,
  Spinner,
  Container,
  Row,
  ProgressBar,
  Button,
} from "react-bootstrap";

import UpdateBody from "./UpdateBody";
import UpdateButton from "./UpdateButton";
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

const electron = window.require("electron");

const ipcRenderer = electron.ipcRenderer;

const isOnline = require("is-online");

const UpdateModal = (props) => {
  const [updateStatus, setUpdateStatus] = useState(NO_UPDATE_CHECK_PENDING);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isOnlineBool, setIsOnlineBool] = useState(false);
  const [newVersion, setNewVersion] = useState(null);

  ipcRenderer.on(NO_UPDATE_AVAILABLE, (event) => {
    setUpdateStatus(NO_UPDATE_AVAILABLE);
    console.log("Settings update-not-available");
    console.log("Settings update-not-available", event);
  });

  ipcRenderer.on(CHECK_FOR_UPDATE_SUCCESS, (event, info) => {
    const updateInfo = {
      releaseName: info.releaseName,
      releaseDate: info.releaseDate,
      releaseNotes: info.releaseNotes,
    };
    console.log("Settings update-available info", updateInfo);

    setNewVersion(updateInfo);
    setUpdateStatus(CHECK_FOR_UPDATE_SUCCESS);
  });

  ipcRenderer.on(CHECK_FOR_UPDATE_FAILURE, (event, info) => {
    setUpdateStatus(CHECK_FOR_UPDATE_FAILURE);
    console.log("Update Error ", info);
  });

  ipcRenderer.on(DOWNLOAD_UPDATE_PENDING, (event, data) => {
    setUpdateStatus(DOWNLOAD_UPDATE_PENDING);
    setDownloadProgress(data);
    console.log("Download Progress", data);
  });

  ipcRenderer.on(DOWNLOAD_UPDATE_SUCCESS, (event, data) => {
    setUpdateStatus(DOWNLOAD_UPDATE_SUCCESS);
    console.log("Download Finished");
  });

  ipcRenderer.on(DOWNLOAD_UPDATE_FAILURE, (event, data) => {
    setUpdateStatus(DOWNLOAD_UPDATE_FAILURE);
    console.log("Download Failed", data);
  });

  useEffect(() => {
    (async () => {
      var onlineStatus = await isOnline();
      setIsOnlineBool(onlineStatus);
      console.log("onlineStatus", onlineStatus);
    })();
  }, [props.isCheckingForUpdate]);

  const handleClose = () => {
    setUpdateStatus(NO_UPDATE_CHECK_PENDING);
    props.setShowUpdateModal(false);
  };

  const handleClick = () => {
    (async () => {
      var onlineStatus = await isOnline();
      setIsOnlineBool(onlineStatus);
      console.log("onlineStatus", onlineStatus);
      if (!onlineStatus) return;
      console.log("updateStatus: ", updateStatus);
      switch (updateStatus) {
        case NO_UPDATE_CHECK_PENDING:
          ipcRenderer.send("runCommand");
          setUpdateStatus(CHECK_FOR_UPDATE_PENDING);
          break;
        case CHECK_FOR_UPDATE_SUCCESS:
          ipcRenderer.send("start-download");
          setUpdateStatus(DOWNLOAD_UPDATE_PENDING);
          break;
        case DOWNLOAD_UPDATE_SUCCESS:
          ipcRenderer.send(QUIT_AND_INSTALL_UPDATE);
          setUpdateStatus(QUIT_AND_INSTALL_UPDATE);
          break;
        default:
          break;
      }
    })();
  };

  return (
    <Modal
      show={props.showUpdateModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton={!isOnlineBool}>
        <Modal.Title>Eu4 Mission Editor Updater</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ minHeight: "200px" }}>
        <UpdateBody
          updateStatus={updateStatus}
          setUpdateStatus={setUpdateStatus}
          newVersion={newVersion}
          downloadProgress={downloadProgress}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
          disabled={
            updateStatus === CHECK_FOR_UPDATE_PENDING ||
            updateStatus === DOWNLOAD_UPDATE_PENDING ||
            updateStatus === QUIT_AND_INSTALL_UPDATE
          }
        >
          Close
        </Button>
        <UpdateButton
          handleClick={handleClick}
          updateStatus={updateStatus}
          setUpdateStatus={setUpdateStatus}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateModal;
/*
<Container>
					<Row
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Spinner animation="border" role="status" style={{ width: '100px', height: '100px' }} />
						<span className="sr-only">loading...</span>
					</Row>
					<Row
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<h3>
							{isUpdateAvailable && checkedUpdate ? downloadProgress < 100 ? (
								'Downloading...'
							) : (
								'Update Downloaded, Starting Installer...'
							) : (
								'Checking For Updates...'
							)}
						</h3>
					</Row>*/
