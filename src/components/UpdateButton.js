import React from 'react';

import { Button } from 'react-bootstrap';

const UpdateVersion = (props) => {
	const getButtonText = () => {
		if (!props.checkedUpdate) return 'Check for Update';
		if (props.isUpdateAvailable) return 'Update';
		if (props.isDownloadingUpdate) return 'Updating';
	};

	return (
		<Button
			variant="primary"
			onClick={props.handleClick}
			disabled={props.isCheckingForUpdate || props.isDownloadingUpdate}
		>
			{getButtonText()}
		</Button>
	);
};

export default UpdateVersion;
