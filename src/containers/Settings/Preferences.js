import React, { useState } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';

const Preferences = (props) => {
	const handleThemeChange = (evt) => {
		console.log('Theme change: ', evt.target.value);
		props.setCurrentTheme(props.themesList[evt.target.value]);
	};

	return (
		<Container fluid>
			<Row lg={true} style={{ margin: 'auto', textAlign: 'center', width: '50%' }}>
				<h1 style={{ width: '100%' }}>Preferences</h1>
			</Row>
			<Row lg={true}>
				<Col lg={true}>
					<Form>
						<Form.Group as={Row} controlId="formContainer">
							<Form.Label column sm="2">
								Theme
							</Form.Label>
							<Col sm="2">
								<Form.Control
									as="select"
									onChange={(evt) => handleThemeChange(evt)}
									value={props.themesList.findIndex(
										(theme) => theme.theme === props.currentTheme.theme
									)}
								>
									{props.themesList.map((theme, index) => (
										<option key={index} value={index}>
											{theme.theme}
										</option>
									))}
								</Form.Control>
							</Col>
						</Form.Group>
					</Form>
				</Col>
			</Row>
			<hr />
		</Container>
	);
};

export default Preferences;
