import React, { useState, useEffect } from 'react';

import { Modal, Button, Form, FormControl } from 'react-bootstrap';

const CreateMissionModal = (props) => {
	const [ fileName, setFileName ] = useState('');
	const [ seriesName, setSeriesName ] = useState('');
	const [ validatedFileName, setValidatedFileName ] = useState(false);
	const [ validatedSeriesName, setValidatedSeriesName ] = useState(false);
	const [ validatedForm, setValidatedForm ] = useState(false);
	const [ errorMessageFileName, setErrorMessageFileName ] = useState('');
	const [ errorMessageSeriesName, setErrorMessageSeriesName ] = useState('');

	const handleFileNameInput = (event) => {
		var name = event.target.value;

		setFileName(name);
		const regex = /[\s={}()\[\]]/g;
		const found = name.match(regex);
		if (found) {
			setValidatedFileName(false);
			setValidatedForm(false);
			setErrorMessageFileName('Name contains illegal characters');
			return;
		}
		if (name === '') {
			setValidatedFileName(false);
			setValidatedForm(false);
			setErrorMessageFileName('Name is Empty');
			return;
		}
		var valid = true;
		props.missionTabs.map((missionTab) => {
			if (missionTab.name === name) {
				console.log('Same Name');
				setValidatedFileName(false);
				setValidatedForm(false);
				setErrorMessageFileName('Mission file name already in use.');
				valid = false;
				return;
			}
		});
		setValidatedForm(false);
		if (!valid) return;
		console.log('Valid');
		setValidatedFileName(true);
		handleValidatedForm(validatedSeriesName, true);
	};

	const handleSeriesNameInput = (event) => {
		var name = event.target.value;

		setSeriesName(name);
		const regex = /[\s={}()\[\]]/g;
		const found = name.match(regex);
		if (found) {
			setValidatedSeriesName(false);
			setValidatedForm(false);
			setErrorMessageSeriesName('Name contains illegal characters');
			return;
		}
		if (name === '') {
			setValidatedSeriesName(false);
			setValidatedForm(false);
			setErrorMessageSeriesName('Name is Empty');
			return;
		}
		setValidatedSeriesName(true);
		console.log("validatedSeriesName",validatedSeriesName)
		handleValidatedForm(validatedFileName, true);
	};

	const handleValidatedForm = (validOne, validTwo) => {
		if (validOne && validTwo) {
			console.log('valid whole form');
			setValidatedForm(true);
		} else setValidatedForm(false);
	};

	const handleClose = () => {
		props.setShow(0);
	};

	useEffect(
		() => {
			setFileName('');
			setSeriesName('');
			setValidatedFileName(false);
			setValidatedSeriesName(false);
			setErrorMessageFileName('File Name is Empty');
			setErrorMessageSeriesName('Series Name is Empty');
		},
		[ props.show ]
	);

	return (
		<Modal show={props.show === 3} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Create Mission</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form noValidate validated={validatedForm}>
					<Form.Group controlId="formLabel">
						<Form.Label>Mission File Name</Form.Label>
						<FormControl
							placeholder="name"
							aria-label="label"
							value={fileName}
							aria-describedby="basic-addon1"
							onChange={(evt) => handleFileNameInput(evt)}
							isInvalid={!validatedFileName}
							required
						/>
						{!validatedFileName ? (
							<Form.Control.Feedback type="invalid">{errorMessageFileName}</Form.Control.Feedback>
						) : null}
						<Form.Label>Series Name</Form.Label>
						<FormControl
							className="mb-2"
							placeholder="seriesName"
							aria-label="seriesName"
							value={seriesName}
							aria-describedby="basic-addon1"
							onChange={(evt) => handleSeriesNameInput(evt)}
							isInvalid={!validatedSeriesName}
							required
						/>
						{!validatedSeriesName ? (
							<Form.Control.Feedback type="invalid">{errorMessageSeriesName}</Form.Control.Feedback>
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
					onClick={() => (props.setShow(0), props.createFile(fileName, seriesName))}
					disabled={!validatedFileName || !validatedSeriesName}
				>
					Create Mission File
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default CreateMissionModal;
