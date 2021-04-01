import React, { useState, useEffect } from 'react';

import { Modal, Spinner, Container, Row, ProgressBar, Button } from 'react-bootstrap';

const electron = window.require('electron');

const ipcRenderer = electron.ipcRenderer;

const isOnline = require('is-online');

const UpdateModal = (props) => {
	const [ downloadProgress, setDownloadProgress ] = useState(0);
	const [ isOnlineBool, setIsOnlineBool ] = useState(false);
	const [ checkedUpdate, setCheckedUpdate ] = useState(false);
	const [ isUpdateAvailable, setIsUpdateAvailable ] = useState(false);
	const [ isDownloadingUpdate, setIsDownloadingUpdate ] = useState(false);

	ipcRenderer.on('download-progress', (event, data) => {
		setDownloadProgress(data);
		console.log('Download Progress', data);
	});

	ipcRenderer.on('update-available', (event, info) => {
		console.log('Settings update-available info', info);
		console.log('Settings update-available', event);
		setIsUpdateAvailable(true);
		setCheckedUpdate(true);
	});
	ipcRenderer.on('update-not-available', (event) => {
		console.log('Settings update-not-available');
		console.log('Settings update-not-available', event);
		setIsUpdateAvailable(false);
		setCheckedUpdate(true);
	});

	useEffect(
		() => {
			(async () => {
				var onlineStatus = await isOnline();
				setIsOnlineBool(onlineStatus);
				console.log('onlineStatus', onlineStatus);
			})();
		},
		[ props.isCheckingForUpdate ]
	);

	const handleClose = () => {
		props.setShowUpdateModal(false);
	};

	const handleClick = () => {
		(async () => {
			var onlineStatus = await isOnline();
			setIsOnlineBool(onlineStatus);
			console.log('onlineStatus', onlineStatus);
			if (!onlineStatus) return;
			console.log('check-for-update');
			props.setIsCheckingForUpdate(true);
			//ipcRenderer.sendSync('runCommand', "test");
			const res = await ipcRenderer.sendSync('runCommand', 'test');
			console.log(res);
		})();
	};

	return (
		<Modal
			show={props.showUpdateModal || props.updateIsAvailable}
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton={!isOnlineBool}>
				<Modal.Title>Eu4 Mission Editor Updater</Modal.Title>
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
						<h3>checkedUpdate : {String(checkedUpdate)}</h3>
						<h3>isUpdateAvailable : {String(isUpdateAvailable)}</h3>
						<h3>
							{isUpdateAvailable && checkedUpdate ? downloadProgress < 100 ? (
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
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose} disabled={props.isCheckingForUpdate}>
					Close
				</Button>
				<Button variant="primary" onClick={handleClick} disabled={props.isCheckingForUpdate}>
					{props.isCheckingForUpdate ? 'Updating' : 'Check for Update'}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default UpdateModal;
