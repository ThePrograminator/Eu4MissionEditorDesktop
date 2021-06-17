import React, { useState } from 'react';
import MissionTabList from './MissionTabList';
import Settings from './Settings';
import { Container, Row, Tabs, Tab } from 'react-bootstrap';

const Home = (props) => {
	const [ series, setSeries ] = useState([]);
	const [ missions, setMissions ] = useState([]);
	const [ missionTabs, setMissionTabs ] = useState([]);
	const [ edges, setEdges ] = useState([]);
	const [ availableFileId, setAvailableFileId ] = useState(1);

	const getAvailableFileId = () => {
		var availableId = `node_${availableFileId.toString()}`;
		var newId = availableFileId + 1;
		setAvailableFileId(newId);
		return availableId;
	};

	return (
		<Container fluid style={{ minHeight: 'inherit' }}>
			<Tabs defaultActiveKey="missions" id="uncontrolled-tab-example">
				<Tab eventKey="missions" title="Missions" style={{ minHeight: 'inherit' }}>
					<Container
						fluid
						style={{
							minHeight: '83vh',
							padding: '20px',
							paddingLeft: '0px'
						}}
					>
						<Row style={{ minHeight: '83vh' }}>
							<MissionTabList
								missionTabs={missionTabs}
								setMissionTabs={setMissionTabs}
								getAvailableFileId={getAvailableFileId}
							/>
						</Row>
					</Container>
				</Tab>
				<Tab eventKey="settings" title="Settings" style={{ minHeight: 'inherit' }}>
					<Container fluid style={{ minHeight: '83vh' }}>
						<Row style={{ minHeight: '83vh' }}>
							<Settings
								setMissions={setMissions}
								setSeries={setSeries}
								setEdges={setEdges}
								missionTabs={missionTabs}
								setMissionTabs={setMissionTabs}
								getAvailableFileId={getAvailableFileId}
								currentTheme={props.currentTheme}
								setCurrentTheme={props.setCurrentTheme}
								themesList={props.themesList}
							/>
						</Row>
					</Container>
				</Tab>
			</Tabs>
		</Container>
	);
};

export default Home;
