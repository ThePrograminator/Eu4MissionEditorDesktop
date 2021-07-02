import React, { useCallback } from "react";
import Series from "../components/Series";
import { Tab, Row, Col, ListGroup, ButtonGroup, Button } from "react-bootstrap";

let id = 0;

const SeriesEditor = (props) => {
  /*const onAdd = useCallback(() => {
    const newNode = {
      id: id,
      name: "new Series",
      slot: 1,
      generic: false,
      ai: true,
      has_country_shield: false,
      potentialOnLoad: "",
      potential: "",
      selectedSeries: null,
      color: "",
    };
    props.setSeries((els) => els.concat(newNode));
    id++;
    console.log(props.series.length);
  }, [props.setSeries, props.setMissionTabs]);*/

  return (
    <div>
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link0">
        <Row>
          <Col lg={true} style={{ maxWidth: "250px" }}>
            <ListGroup>
              {props.series.map((series) => (
                <ListGroup.Item
                  key={series.id}
                  action
                  href={"#link" + series.id}
                  style={{ minWidth: "200px" }}
                >
                  {series.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col lg={true}>
            <Tab.Content>
              {props.series.map((series) => (
                <Tab.Pane key={series.id} eventKey={"#link" + series.id}>
                  <Series
                    series={series}
                    allSeries={props.series}
                    setSeries={props.setSeries}
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

export default SeriesEditor;
