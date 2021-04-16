import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Configuration = (props) => {
	return (
		<Container fluid>
			<Row lg={true} style={{ margin: 'auto', textAlign: 'center', width: '50%' }}>
				<h1 style={{ width: '100%' }}>Configuration</h1>
			</Row>
			<Row lg={true}>
				<Col lg={true} />
			</Row>
			<hr />
		</Container>
	);
};

export default Configuration;
