import React from 'react';

import { Row } from 'react-bootstrap';

const electron = window.require('electron');
const appVersion = electron.remote.app.getVersion();

const UpdateVersion = (props) => {
	return (
		<Row
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<div>
				<h2>Update is Available</h2>
				<h3>Current Version: {appVersion}</h3>
				<h3>New Version: {props.newVersion}</h3>
			</div>
		</Row>
	);
};

export default UpdateVersion;
