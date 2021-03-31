import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  MiniMap,
  Background,
  isNode,
} from "react-flow-renderer";
import { Button, Form, Col } from "react-bootstrap";
import Writer from "../Writer";

import CodeEditor from "./CodeEditor";
import "../Provider.css";

const onLoad = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

let id = 900;
const getNodeId = () => `node_${(id++).toString()}`;
const snapGrid = [150, 150];

function applyEdgeStyle(params) {
  params.type = "step";

  params.arrowHeadType = "arrowclosed";
}

const MissionTab = (props) => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [series, setSeries] = useState(props.series);
  const onConnect = (params) =>
    setElements(
      (els) => (
        console.log("newConnection:", params),
        applyEdgeStyle(params),
        addEdge(params, els)
      )
    );
  useEffect(() => {
    console.log("MissionTab useEffect, [series, setSelectedElement]");
    console.log("series", series);
    const ele = elements.map((el) => {
      if (isNode(el) && el.data.selectedSeries != null) {
        // unfortunately we need this little hack to pass a slighltiy different position
        // in order to notify react flow about the change
        el.position = {
          x: series.find((x) => x.id === el.data.selectedSeries).slot * 150,
          y: el.position.y,
        };
        el.style = {
          ...el.style,
          background: series.find((x) => x.id === el.data.selectedSeries).color,
        };
      }
      return el;
    });
    setElements(ele);
    let missionTabsCopy = [...props.missionTabs];
    let index = missionTabsCopy.findIndex(
      (missionTab) => missionTab.id === props.fileID
    );
    missionTabsCopy[index].series = series;
    props.setMissionTabs(missionTabsCopy);
  }, [series, setSelectedElement]);

  useEffect(() => {
    console.log("MissionTab useEffect, [props.setMissionTabs]");
    props.missions.map((mission) => {
      const newNode = {
        id: "node_" + mission.id,
        data: mission.data,
        position: mission.position,
      };
      elements.push(newNode);
    });
    props.edges.map((edge) => {
      elements.push(edge);
    });

    setElements([...elements]);
    console.log("Elements End", elements);
  }, [props.setMissionTabs]);

  const onElementClick = (event, element) => (
    console.log("click", element), setSelectedElement(element)
  );

  const getLayoutedElements = (elements, node) => {
    return elements.map((el) => {
      if (isNode(el) && el.id === node.id) {
        // unfortunately we need this little hack to pass a slighltiy different position
        // in order to notify react flow about the change
        el.position = {
          x: el.position.x + Math.random(),
          y: node.position.y,
        };
        el.data = {
          ...el.data,
          position: node.position.y / 150,
        };
      }
      return el;
    });
  };

  const onNodeDragStop = (event, node) => {
    console.log("onNodeDragStop");
    console.log("node", node);
    if (isNode(node) && node.data.selectedSeries != null) {
      const layoutedElements = getLayoutedElements(elements, node);
      setElements(layoutedElements);
      elements.map((el) => {
        if (isNode(el) && el.id === node.id) {
          setSelectedElement(el);
          console.log(
            "updating position for seletected element",
            selectedElement
          );
        }
      });
      let missionTabsCopy = [...props.missionTabs];
      let index = missionTabsCopy.findIndex(
        (missionTab) => missionTab.id === props.fileID
      );
      missionTabsCopy[index].missions = elements;
      props.setMissionTabs(missionTabsCopy);
      console.log("elemeents", elements);
    }
  };

  const onAdd = useCallback(() => {
    console.log("Elements start", elements);
    const newNode = {
      id: getNodeId(),
      data: {
        label: "sadfasdf",
      },
      position: {
        x: 0,
        y: 0,
      },
    };
    elements.push(newNode);
    setElements([...elements]);

    let missionTabsCopy = [...props.missionTabs];
    let index = missionTabsCopy.findIndex(
      (missionTab) => missionTab.id === props.fileID
    );
    missionTabsCopy[index].missions = elements;
    props.setMissionTabs(missionTabsCopy);

    console.log("Elements End", elements);
  }, [setElements]);

  const onExport = useCallback(() => {
    const fileData = Writer.exportMissionTree(series, elements);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "filename.txt";
    link.href = url;
    link.click();
  }, []);

  const onUpdate = useCallback(() => {
    console.log("OnUpdate elements", elements)
    let missionTabsCopy = [...props.missionTabs];
    let index = missionTabsCopy.findIndex(
      (missionTab) => missionTab.id === props.fileID
    );
    missionTabsCopy[index].missions = elements;
    props.setMissionTabs(missionTabsCopy);
    console.log("OnUpdate missionTabs", props.missionTabs)
  }, []);

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  return (
    <div className="providerflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper">
          <div style={{ position: "static", left: 10, top: 10, zIndex: 4 }}>
            <Form>
              <Form.Row className="align-items-center">
                <Col lg={true} style={{ maxWidth: "350px" }}>
                  <Form.Group controlId="formMissionName" className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Enter Mission Name"
                    />
                  </Form.Group>
                </Col>
                <Col lg={2}>
                  <Button onClick={onAdd} className="mb-2">
                    Add Mission
                  </Button>
                </Col>
                <Col lg={5}>
                  <Button onClick={onExport} className="mb-2">
                    Export Mission tree
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </div>
          <ReactFlow
            elements={elements}
            elementsSelectable={true}
            onElementClick={onElementClick}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onPaneClick={() => setSelectedElement(null)}
            onLoad={onLoad}
            snapToGrid={true}
            snapGrid={snapGrid}
            onNodeDragStop={onNodeDragStop}
            selectNodesOnDrag={false}
            nodeExtent={[
              [150, 0],
              [750, 90000],
            ]}
            deleteKeyCode={46}
          >
            <MiniMap nodeStrokeWidth={15} style={{ borderStyle: "solid" }} />
            <Controls showInteractive={false} />
            <Background style={{ borderStyle: "solid" }} />
          </ReactFlow>
        </div>
        <CodeEditor
          missions={elements}
          setMissions={setElements}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          series={series}
          setSeries={setSeries}
          onUpdate={onUpdate}
        />
      </ReactFlowProvider>
    </div>
  );
};

export default MissionTab;
/*style={{background: "#2A353C"}}*/
