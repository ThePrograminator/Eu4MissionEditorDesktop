import React, { useState } from 'react';

import { Modal, Button, Form } from 'react-bootstrap';

const RemoveMissionFileModal = (props) => {
	const [ selectedMissionTab, setSelectedMissionTab ] = useState(0);

	const handleClose = () => {
		props.setShow(0);
	};

	return (
		<Modal show={props.show === 5} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Remove Mission File</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId="formMission">
						<Form.Label>Select Mission File To Remove</Form.Label>
						<Form.Control
							as="select"
							onChange={(evt) => setSelectedMissionTab(evt.target.value)}
							value={selectedMissionTab}
						>
							{props.missionTabs.map((missionTab) => (
								<option key={missionTab.id} value={missionTab.id}>
									{missionTab.name}
								</option>
							))}
						</Form.Control>
						<Form.Text className="text-muted">This does not remove the mission file from your directory</Form.Text>
						<Form.Text className="text-muted">Your changes not exported will be lost</Form.Text>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button variant="primary" onClick={() => (props.setShow(0), props.removeFile(selectedMissionTab))}>
					Remove Mission File
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default RemoveMissionFileModal;
