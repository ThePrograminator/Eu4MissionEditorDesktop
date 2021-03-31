import React from 'react';
import { Button, Tab, Container, Row, Col, ListGroup } from 'react-bootstrap';
import Reader from '../Reader';

const electron = window.require('electron');
const appVersion = electron.remote.app.getVersion();
const ipcRenderer = electron.ipcRenderer;
var path = require('path');

const Settings = (props) => {
	ipcRenderer.on('update-available', (event) => {
		console.log('Settings update-available');
		console.log('Settings update-available', event);
	});
	ipcRenderer.on('update-not-available', (event) => {
		console.log('Settings update-not-available');
		console.log('Settings update-not-available', event);
	});
	//ipcRenderer.sendto(,'checking-for-update');
	const handleCheckUpdate = () => {
		console.log('handleCheckUpdate');
		//ipcRenderer.send('checking-for-update');
		//ipcRenderer.sendSync('runCommand', "check");
		//const res = ipcRenderer.sendSync('runCommand', "check");
		ipcRenderer.invoke('runCommand').then((result) => {
			console.log('response', result);
		});
	};

	return (
		<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
			<Row style={{ minWidth: '100%' }}>
				<Col lg={true} style={{ maxWidth: '250px' }}>
					<ListGroup>
						<ListGroup.Item action href={'#link1'} style={{ minWidth: '200px' }}>
							Version
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col lg={true}>
					<Tab.Content>
						<Container fluid>
							<Row lg={true} style={{ margin: 'auto', textAlign: 'center', width: '50%' }}>
								<h1 style={{ width: '100%' }}>Version</h1>
							</Row>
							<Row lg={true}>
								<Col lg={true}>
									<p>Current version: {appVersion}</p>
								</Col>
							</Row>
							<Row lg={true}>
								<Col lg={true}>
									<Button onClick={handleCheckUpdate}>Check for Update</Button>
								</Col>
							</Row>
						</Container>
					</Tab.Content>
				</Col>
			</Row>
		</Tab.Container>
	);
};

export default Settings;

/*<div>
      <Button onClick={() => openFile()}>Import Mission File</Button>
    </div>


    <Container fluid>
      <Row lg={true}>
        <Col lg={true} style={{borderStyle: "solid", borderColor: "#363537"}}>
          <h1>Eu4 Mission Editor</h1>
          <p>{appVersion}</p>
          <Button>Check for Update</Button>
        </Col>
      </Row>
    </Container>
*/
