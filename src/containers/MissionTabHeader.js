import React, { useState } from 'react';
import MissionTabButton from '../components/MissionTabButton';
import ExportMissionModal from '../components/Modals/ExportMissionModal';
import CreateMissionModal from '../components/Modals/CreateMissionModal';
import DuplicateMissionModal from '../components/Modals/DuplicateMissionModal';
import RemoveMissionModal from '../components/Modals/RemoveMissionModal';
import Reader from '../Reader';
import Writer from '../Writer';
import { Container, Row, Tabs, Tab, ButtonGroup, Button, ButtonToolbar, Nav, Col } from 'react-bootstrap';

import {
	FaFileDownload,
	FaFileUpload,
	FaFileImport,
	FaFileMedical,
	FaFileExcel,
	FaFileMedicalAlt
} from 'react-icons/fa';

const electron = window.require('electron');
const fs = electron.remote.require('fs');
const dialog = electron.remote.dialog;
var path = require('path');

const inProgressIDMap = { import: 1, export: 2, create: 3, duplicate: 4, remove: 5, addMission: 6 };

const MissionTabHeader = (props) => {
	const [ inProgressID, setinProgressID ] = useState(0);
	const [ show, setShow ] = useState(0);

	const handleClick = (id) => {
		console.log('clicked id', id);
		switch (id) {
			//Import
			case 1:
				handleImportMissionFile();
				break;
			//Export
			case 2:
				handleExportMissionFile();
				break;
			//Create
			case 3:
				handleCreateMissionFile();
				break;
			//Duplicate
			case 4:
				handleDuplicateMissionFile();
				break;
			//Remove
			case 5:
                handleRemoveMissionFile();
				break;
			//Remove
			case 6:
				handleCreateMission();
				break;
			default:
				break;
		}
	};

	const openFile = () => {
		var window = electron.remote.getCurrentWindow();
		const files = dialog.showOpenDialogSync(window, {
			properties: [ 'openFile' ],
			filters: [
				{
					name: 'Text Files',
					extensions: [ 'txt' ]
				}
			]
		});
		if (!files) return;
		setinProgressID(inProgressIDMap.import);

		const file = files[0];

		console.log('file', file);

		Reader.asyncHandleFile(file, props.getAvailableFileId(), (allMissionTabs) => {
			props.setMissionTabs((els) => els.concat(allMissionTabs));
			setinProgressID(0);
		});
	};

	const exportFile = (id) => {
		console.log('id', id);
		console.log('props.missionTabs', props.missionTabs);
		//let index = props.missionTabs.findIndex((missionTab) => missionTab.id === id);
		var missionTab = props.missionTabs[id];
		console.log('missionTab', missionTab);
		const fileData = Writer.exportMissionTree(missionTab.series, missionTab.missions);
		var options = {
			title: 'Save Mission File',
			defaultPath:
				'C:\\Users\\Christian\\Documents\\Paradox Interactive\\Europa Universalis IV\\mod\\lou_m\\missions' +
				'\\' +
				missionTab.name,
			buttonLabel: 'Save',

			filters: [ { name: 'txt', extensions: [ 'txt' ] }, { name: 'All Files', extensions: [ '*' ] } ]
		};
		var window = electron.remote.getCurrentWindow();
		dialog.showSaveDialog(window, options).then(({ filePath }) => {
			if (!filePath) return;
			setinProgressID(inProgressIDMap.export);
			console.log('saving');
			fs.writeFileSync(filePath, fileData, 'utf-8');
			setinProgressID(0);
		});
	};

	const createFile = (name) => {
		console.log('name', name);
		let missionTabsCopy = [ ...props.missionTabs ];

		/*var length = 0;
		if (missionTabsCopy.length !== 0) length = missionTabsCopy.length + 1;
		var id = `file_${length.toString()}`;*/

		const newMissionTab = {
			id: props.getAvailableFileId(),
			name: name,
			fileName: name + '.txt',
			series: [],
			missions: [],
			edges: []
		};
		missionTabsCopy.push(newMissionTab);
		props.setMissionTabs(missionTabsCopy);
	};

	const duplicateFile = (duplicateId, fileName) => {
		console.log('duplicateFile duplicateId', duplicateId);
		console.log('duplicateFile fileName', fileName);
	};

	const removeFile = (id) => {
		console.log('removeFile id', id);

		let missionTabsCopy = [ ...props.missionTabs ];
		let index = missionTabsCopy.findIndex((missionTab) => missionTab.id === id);
		missionTabsCopy.splice(index, 1);
		props.setMissionTabs(missionTabsCopy);
	};

	const handleImportMissionFile = () => {
		console.log('Import Mission');
		openFile();
	};

	const handleExportMissionFile = () => {
		console.log('Export Mission');
		//saveFile();
		setShow(2);
	};

	const handleCreateMissionFile = () => {
		console.log('Added Mission');

		setShow(3);
	};

	const handleDuplicateMissionFile = () => {
		console.log('Duplicate Mission');

		setShow(4);
	};

	const handleRemoveMissionFile = () => {
		console.log('Removed Mission');

		setShow(5);
	};

	const handleCreateMission = () => {
		console.log('Create Mission');
	};

	return (
		<div>
			<ButtonToolbar aria-label="Toolbar with button groups">
				<ButtonGroup className="mr-2" aria-label="Second group">
					<MissionTabButton
						id={inProgressIDMap.create}
						inProgress={inProgressID}
						handleClick={handleClick}
						buttonText={'Create Mission File'}
						toolTipText={'Create Mission File'}
						icon={<FaFileMedical />}
					/>
					<MissionTabButton
						id={inProgressIDMap.duplicate}
						inProgress={inProgressID}
						handleClick={handleClick}
						buttonText={'Duplicate Mission File'}
						toolTipText={'Duplicate Mission File'}
						icon={<FaFileImport />}
					/>
					<MissionTabButton
						id={inProgressIDMap.remove}
						inProgress={inProgressID}
						handleClick={handleClick}
						buttonText={'Remove Mission File'}
						toolTipText={'Remove Mission File'}
						icon={<FaFileExcel />}
					/>
				</ButtonGroup>
				<ButtonGroup className="mr-2" aria-label="First group">
					<MissionTabButton
						id={inProgressIDMap.import}
						inProgress={inProgressID}
						handleClick={handleClick}
						buttonText={'Import Mission File'}
						toolTipText={'Import Mission File'}
						icon={<FaFileDownload />}
					/>
					<MissionTabButton
						id={inProgressIDMap.export}
						inProgress={inProgressID}
						handleClick={handleClick}
						buttonText={'Export Mission File'}
						toolTipText={'Export Mission File'}
						icon={<FaFileUpload />}
					/>
				</ButtonGroup>

                <div style={{borderLeft: "2px solid lightgrey"}}></div>

                <ButtonGroup className="mr-2" aria-label="First group">
					<MissionTabButton
						id={inProgressIDMap.addMission}
						inProgress={inProgressID}
						handleClick={handleClick}
						buttonText={'Add Mission'}
						toolTipText={'Add Mission'}
						icon={<FaFileDownload />}
					/>
				</ButtonGroup>
			</ButtonToolbar>
			<ExportMissionModal show={show} setShow={setShow} exportFile={exportFile} missionTabs={props.missionTabs} />
			<CreateMissionModal show={show} setShow={setShow} createFile={createFile} missionTabs={props.missionTabs} />
			<RemoveMissionModal show={show} setShow={setShow} removeFile={removeFile} missionTabs={props.missionTabs} />
			<DuplicateMissionModal
				show={show}
				setShow={setShow}
				duplicateFile={duplicateFile}
				missionTabs={props.missionTabs}
			/>
		</div>
	);
};

export default MissionTabHeader;
