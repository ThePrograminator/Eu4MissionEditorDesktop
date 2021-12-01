import React, { useCallback } from "react";
import Container from "../../components/Container";
import { Tab, Row, Col, ListGroup, ButtonGroup, Button } from "react-bootstrap";

let id = 0;

const ContainerEditor = (props) => {
  /*const onAdd = useCallback(() => {
    const newNode = {
      id: id,
      name: "new Container",
      slot: 1,
      generic: false,
      ai: true,
      has_country_shield: false,
      potentialOnLoad: "",
      potential: "",
      selectedContainer: null,
      color: "",
    };
    props.setContainer((els) => els.concat(newNode));
    id++;
    console.log(props.container.length);
  }, [props.setContainer, props.setMissionTabs]);*/

  return (
    <div>
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link0">
        <Row>
          <Col lg={true} style={{ maxWidth: "250px" }}>
            <ListGroup>
              {props.container.map((container) => (
                <ListGroup.Item
                  key={container.id}
                  action
                  href={"#link" + container.id}
                  style={{ minWidth: "200px" }}
                >
                  {container.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col lg={true}>
            <Tab.Content>
              {props.container.map((container) => (
                <Tab.Pane key={container.id} eventKey={"#link" + container.id}>
                  <Container
                    missionTree={props.missionTree}
                    container={container}
                    allContainer={props.container}
                    setContainer={props.setContainer}
                  />
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default ContainerEditor;
