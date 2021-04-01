import React from 'react';

import { Container } from 'react-bootstrap';

import UpdateVersion from './UpdateVersion';
import UpdateDownloading from './UpdateDownloading';

const UpdateBody = (props) => {
	const showUpdateVersion = () => {
		if (props.isUpdateAvailable && props.checkedUpdate) {
			if (!props.isDownloadingUpdate) {
				return true;
			}
		}
		return false;
	};

	const showDownloading = () => {
		if (props.isUpdateAvailable && props.checkedUpdate) {
			if (props.isDownloadingUpdate) {
				return true;
			}
		}
		return false;
	};

	return (
		<Container>
			{showUpdateVersion() ? <UpdateVersion newVersion={props.newVersion} /> : null}
			{showDownloading() ? <UpdateDownloading downloadProgress={props.downloadProgress} /> : null}
		</Container>
	);
};

export default UpdateBody;
