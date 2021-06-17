import React, { useState, useEffect } from 'react';

import { Modal, Button, Form, FormControl } from 'react-bootstrap';

const DuplicateMissionFileModal = (props) => {
	const [ selectedMissionTab, setSelectedMissionTab ] = useState(0);
	const [ fileName, setFileName ] = useState(0);
	const [ validated, setValidated ] = useState(false);
	const [ errorMessage, setErrorMessage ] = useState('');

	const handleInput = (event) => {
		var name = event.target.value;

		setFileName(name);
		if (name === '') {
			setValidated(false);
			setErrorMessage('Name is Empty');
			return;
		}
		var valid = true;
		props.missionTabs.map((missionTab) => {
			if (missionTab.name === name) {
				console.log('Same Name');
				setValidated(false);
				setErrorMessage('Mission file name already in use.');
				valid = false;
				return;
			}
		});
		if (!valid) return;
		console.log('Valid');
		setValidated(true);
	};

	const handleClose = () => {
		props.setShow(0);
	};

	const handleAction = () => {
		if (!validated && selectedMissionTab === 0) return;
		console.log('selectedMissionTab', selectedMissionTab);
		props.setShow(0);
		setFileName('');
		setValidated(false);
		setErrorMessage('Name is Empty');
		setSelectedMissionTab(0);
		props.duplicateFile(selectedMissionTab, fileName);
	};

	useEffect(
		() => {
			if (props.missionTabs.length !== 0) {
				setSelectedMissionTab(props.missionTabs[0].id);
			}
			setFileName('');
			setValidated(false);
			setErrorMessage('Name is Empty');
		},
		[ props.show ]
	);

	return (
		<Modal show={props.show === 4} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Duplicate Mission File</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form noValidate validated={validated}>
					<Form.Group controlId="formMission">
						<Form.Label>Select Mission File To Duplicate</Form.Label>
						<Form.Control
							as="select"
							onChange={(evt) => setSelectedMissionTab(evt.target.value)}
							value={selectedMissionTab}
							isInvalid={selectedMissionTab === 0}
							required
						>
							{props.missionTabs.map((missionTab) => (
								<option key={missionTab.id} value={missionTab.id}>
									{missionTab.name}
								</option>
							))}
						</Form.Control>
						{selectedMissionTab === 0 ? (
							<Form.Control.Feedback type="invalid">No Mission File to Duplicate</Form.Control.Feedback>
						) : null}
					</Form.Group>
					<Form.Group controlId="formLabel">
						<Form.Label>New Mission File Name</Form.Label>
						<FormControl
							placeholder="name"
							aria-label="label"
							value={fileName}
							aria-describedby="basic-addon1"
							onChange={(evt) => handleInput(evt)}
							isInvalid={!validated}
							required
						/>
						{!validated ? (
							<Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>
						) : null}
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button
					variant="primary"
					disabled={!validated || selectedMissionTab === 0}
					onClick={() => (props.setShow(0), handleAction())}
				>
					Duplicate Mission File
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default DuplicateMissionFileModal;
