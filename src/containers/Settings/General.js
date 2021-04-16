import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const General = (props) => {
	return (
		<Container fluid>
			<Row lg={true} style={{ margin: 'auto', textAlign: 'center', width: '50%' }}>
				<h1 style={{ width: '100%' }}>General</h1>
			</Row>
			<Row lg={true}>
				<Col lg={true}>
					<h2>Support: </h2>
					<hr />
				</Col>
			</Row>
			<Row lg={true}>
				<Col lg={true}>
					<h2>About: </h2>
					<hr />
				</Col>
			</Row>
		</Container>
	);
};

export default General;
