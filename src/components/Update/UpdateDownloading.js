import React from 'react';

import { Row, Spinner, ProgressBar } from 'react-bootstrap';

const UpdateVersion = (props) => {
	return (
		<Row
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
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
				<h3>{props.downloadProgress < 100 ? 'Downloading...' : 'Update Downloaded, Starting Installer...'}</h3>
			</Row>
			<ProgressBar animated now={props.downloadProgress} />
		</Row>
	);
};

export default UpdateVersion;
