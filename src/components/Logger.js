import React, { useState } from 'react';

const electron = window.require('electron');

const ipcRenderer = electron.ipcRenderer;

const Logger = (props) => {

    ipcRenderer.on('send-console', (event, data) => {
		console.log('Electron Message: ', data);
	});

	return (
		null
	);
};

export default Logger;
