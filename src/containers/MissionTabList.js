import React, { useState } from 'react';
import MissionTab from './MissionTab';
import MissionTabHeader from './MissionTabHeader';
import { Container, Row, Tab, Nav, Col } from 'react-bootstrap';

import '../tabs.css';

const MissionList = (props) => {
	const [ key, setKey ] = useState('home');
	const [ inProgressID, setinProgressID ] = useState(0);
	const [ show, setShow ] = useState(0);

	return (
		<Container fluid style={{ minHeight: 'inherit' }}>
			<Tab.Container id="left-tabs-example" defaultActiveKey="first">
				<Row style={{ marginBottom: '10px' }}>
					<Col lg={true} className="mr-2">
						<MissionTabHeader
							show={show}
							setShow={setShow}
							inProgressID={inProgressID}
							setinProgressID={setinProgressID}
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
									return (
										<Nav.Item key={missionTab.name}>
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
														show={show}
														setShow={setShow}
														inProgressID={inProgressID}
														setinProgressID={setinProgressID}
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
