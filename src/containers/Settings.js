import React, { useState } from 'react';
import { Button, Tab, Container, Row, Col, ListGroup } from 'react-bootstrap';
import UpdateModal from '../components/UpdateModal';

const electron = window.require('electron');
const appVersion = electron.remote.app.getVersion();
const ipcRenderer = electron.ipcRenderer;
var path = require('path');

const Settings = (props) => {
	const [ showUpdateModal, setShowUpdateModal ] = useState(false);
	const [ isCheckingForUpdate, setIsCheckingForUpdate ] = useState(false);

	//ipcRenderer.sendto(,'checking-for-update');
	const handleCheckUpdate = () => {
		console.log('handleCheckUpdate');
		setShowUpdateModal(true);
		//const res = ipcRenderer.sendSync('runCommand');
		//console.log('response', res);
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
			<UpdateModal
				isCheckingForUpdate={isCheckingForUpdate}
				setIsCheckingForUpdate={setIsCheckingForUpdate}
				showUpdateModal={showUpdateModal}
				setShowUpdateModal={setShowUpdateModal}
			/>
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
