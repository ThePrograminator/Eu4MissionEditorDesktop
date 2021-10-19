import React, { useState, useContext, useEffect } from "react";
import MissionTab from "./MissionTab";
import MissionTabHeader from "./MissionTabHeader";
import { Container, Row, Tab, Nav, Col, Button } from "react-bootstrap";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import MissionTabButton from "../components/MissionTabButton";
import MissionTreeContext from "../contexts/MissionTreeContext";

import "../tabs.css";

const MissionList = (props) => {
  const missionTreeContext = useContext(MissionTreeContext);
  const [key, setKey] = useState(null);
  const [inProgressID, setinProgressID] = useState(0);
  const [show, setShow] = useState(0);
  const [closedTabsList, setClosedTabsList] = useState({
    maxWidth: "15%",
    visibility: "visible",
    maxHeight: "-webkit-fill-available",
  });

  const handleCloseTabList = () => {
    console.log("Clicked Closed");
    if (closedTabsList.maxWidth === "15%")
      setClosedTabsList({
        ...closedTabsList,
        maxWidth: "1%",
        visibility: "hidden",
      });
    else
      setClosedTabsList({
        ...closedTabsList,
        maxWidth: "15%",
        visibility: "visible",
      });
    console.log(closedTabsList);
  };

  const handleRemoveTabList = (id) => {
    console.log("Clicked RemoveTabList");
  };

  useEffect(() => {}, []);

  return (
    <Container fluid style={{ minHeight: "inherit" }}>
      <Row style={{ marginBottom: "10px" }}>
        <Col lg={true} className="mr-2">
          <MissionTabHeader
            show={show}
            setShow={setShow}
            inProgressID={inProgressID}
            setinProgressID={setinProgressID}
            fileKey={key}
          />
        </Col>
      </Row>
      <hr />
      <Tab.Container
        activeKey={key}
        onSelect={(k) => setKey(k)}
        unmountOnExit={true}
        id="left-tabs-example"
        defaultActiveKey="first"
      >
        {missionTreeContext.missionTrees.length > 0 ? (
          <Row>
            <Col sm={2} style={closedTabsList}>
              <Nav
                variant="pills"
                className="flex-column"
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  overflowWrap: "break-word",
                }}
              >
                {missionTreeContext.missionTrees.map((missionTree) => {
                  return (
                    <Nav.Item
                      key={missionTree.id}
                      style={{
                        width: "inherit",
                        marginRight: "10px",
                      }}
                    >
                      <Nav.Link eventKey={missionTree.id}>
                        {missionTree.name}
                      </Nav.Link>
                    </Nav.Item>
                  );
                })}
              </Nav>
            </Col>
            <Col lg={true}>
              <Tab.Content style={{ maxHeight: "200px" }}>
                {missionTreeContext.missionTrees.map((missionTree) => {
                  return (
                    <Tab.Pane key={missionTree.id} eventKey={missionTree.id}>
                      <Container
                        fluid
                        style={{ minHeight: "83vh", maxHeight: "83vh" }}
                      >
                        <Row style={{ minHeight: "83vh", maxHeight: "83vh" }}>
                          <MissionTab
                            missionTree={missionTree}
                            edges={missionTree.edges}
                            show={show}
                            setShow={setShow}
                            inProgressID={inProgressID}
                            setinProgressID={setinProgressID}
                            closedTabsList={closedTabsList}
                            handleCloseTabList={handleCloseTabList}
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
