import React, { useState, useEffect } from 'react';

import { Modal, Spinner, Container, Row, ProgressBar } from 'react-bootstrap';

const electron = window.require('electron');

const ipcRenderer = electron.ipcRenderer;

const isOnline = require('is-online');

const UpdateModal = (props) => {
	const [ downloadProgress, setDownloadProgress ] = useState(0);
	const [ isOnlineBool, setIsOnlineBool ] = useState(true);

	ipcRenderer.on('download-progress', (event, data) => {
		this.setState({ downloadProgress: data }, function() {
			console.log(this.state.downloadProgress);
		});
	});

	useEffect(() => {
		async () => {
			var onlineStatus = await isOnline();
			setIsOnlineBool(onlineStatus);
            console.log("onlineStatus", onlineStatus)
		};
	}, []);

	return (
		<Modal
			show={this.props.isCheckingForUpdate || this.props.updateIsAvailable}
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton={!this.state.isOnline}>
				<Modal.Title>Updater</Modal.Title>
			</Modal.Header>
			<Modal.Body>
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
							{props.updateIsAvailable ? downloadProgress < 100 ? (
								'Downloading...'
							) : (
								'Update Downloaded, Starting Installer...'
							) : (
								'Checking For Updates...'
							)}
						</h3>
					</Row>
					{props.updateIsAvailable ? <ProgressBar animated now={downloadProgress} /> : null}
				</Container>
			</Modal.Body>
		</Modal>
	);
};

export default UpdateModal;
