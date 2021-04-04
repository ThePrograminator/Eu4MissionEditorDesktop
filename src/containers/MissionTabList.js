import React, { useState } from 'react';
import MissionTab from './MissionTab';
import MissionTabHeader from './MissionTabHeader';
import MissionTabButton from '../components/MissionTabButton';
import ExportMissionModal from '../components/Modals/ExportMissionModal';
import CreateMissionModal from '../components/Modals/CreateMissionModal';
import DuplicateMissionModal from '../components/Modals/DuplicateMissionModal';
import RemoveMissionModal from '../components/Modals/RemoveMissionModal';
import Reader from '../Reader';
import Writer from '../Writer';
import { Container, Row, Tabs, Tab, ButtonGroup, Button, ButtonToolbar, Nav, Col } from 'react-bootstrap';

import '../tabs.css';

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

const inProgressIDMap = { import: 1, export: 2, create: 3, duplicate: 4, remove: 5 };

const MissionList = (props) => {
	const [ key, setKey ] = useState('home');
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

	return (
		<Container fluid style={{ minHeight: 'inherit' }}>
			<Tab.Container id="left-tabs-example" defaultActiveKey="first">
				<Row style={{ marginBottom: '10px' }}>
					<Col lg={true} className="mr-2">
						<MissionTabHeader
							missionTabs={props.missionTabs}
							setMissionTabs={props.setMissionTabs}
							getAvailableFileId={props.getAvailableFileId}
						/>
					</Col>
				</Row>
				{props.missionTabs.length > 0 ? (
					<Row>
						<Col sm={2}>
							<Nav variant="pills" className="flex-column">
								{props.missionTabs.map((missionTab) => {
									console.log('MissionTabs loaded', props.missionTabs);
									return (
										<Nav.Item>
											<Nav.Link eventKey={'missionTab_' + missionTab.id}>
												{missionTab.name}
											</Nav.Link>
										</Nav.Item>
									);
								})}
							</Nav>
						</Col>
						<Col lg={true}>
							<Tab.Content>
								{props.missionTabs.map((missionTab) => {
									console.log('MissionTabs loaded', props.missionTabs);
									return (
										<Tab.Pane key={missionTab.name} eventKey={'missionTab_' + missionTab.id}>
											<Container fluid style={{ minHeight: '78vh', maxHeight: '78vh' }}>
												<Row style={{ minHeight: '78vh', maxHeight: '78vh' }}>
													<MissionTab
														missions={missionTab.missions}
														series={missionTab.series}
														edges={missionTab.edges}
														missionTabs={props.missionTabs}
														setMissionTabs={props.setMissionTabs}
														fileID={missionTab.id}
													/>
												</Row>
											</Container>
										</Tab.Pane>
									);
								})}
							</Tab.Content>
						</Col>
					</Row>
				) : null}
			</Tab.Container>
		</Container>
	);
};

export default MissionList;

/*


<NodeEditor
                        missions={props.missions}
                        setMissions={props.setMissions}
                        series={props.series}
                        setSeries={props.setSeries}
                        edges={props.edges}
                      />
                      */

/*
					  {props.missionTabs.length > 0 ? (
				<div>
					<hr />
					<Tabs defaultActiveKey="createMissionFile" id="uncontrolled-tab-example">
						{props.missionTabs.map((missionTab) => {
							console.log('MissionTabs loaded', props.missionTabs);
							return (
								<Tab
									key={missionTab.name}
									eventKey={'missionTab_' + missionTab.id}
									title={missionTab.name}
									style={{ minHeight: 'inherit' }}
								>
									<Container fluid style={{ minHeight: '90vh' }}>
										<Row style={{ minHeight: '90vh' }}>
											<MissionTab
												missions={missionTab.missions}
												series={missionTab.series}
												edges={missionTab.edges}
												missionTabs={props.missionTabs}
												setMissionTabs={props.setMissionTabs}
												fileID={missionTab.id}
											/>
										</Row>
									</Container>
								</Tab>
							);
						})}
					</Tabs>
				</div>
			) : null}*/
