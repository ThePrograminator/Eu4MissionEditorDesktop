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

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import MissionTabButton from "../components/MissionTabButton";

import AddMissionModal from "../components/Modals/AddMissionModal";
import DuplicateMissionModal from "../components/Modals/DuplicateMissionModal";
import RemoveMissionModal from "../components/Modals/RemoveMissionModal";
import AddSeriesModal from "../components/Modals/AddSeriesModal";

import CodeEditor from "./CodeEditor";
import "../Provider.css";

const onLoad = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

let id = 900;
//const getNodeId = () => `node_${(id++).toString()}`;
const snapGrid = [150, 150];

function applyEdgeStyle(params) {
  params.type = "step";

  params.arrowHeadType = "arrowclosed";
}

const MissionTab = (props) => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [series, setSeries] = useState(props.series);

  const [closed, setClosed] = useState({
    maxWidth: "40%",
    visibility: "visible",
    maxHeight: "-webkit-fill-available",
  });

  const handleClose = () => {
    console.log("Clicked Closed");
    if (closed.maxWidth === "40%")
      setClosed({
        ...closed,
        maxWidth: "5%",
        visibility: "hidden",
      });
    else
      setClosed({
        ...closed,
        maxWidth: "40%",
        visibility: "visible",
      });
    console.log(closed);
  };

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
    let missionTabsCopy = props.missionTabs.slice();
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

        var y = 150;

        if (node.position.y >= 150) y = node.position.y;

        el.position = {
          x: el.position.x + Math.random(),
          y: y,
        };
        el.data = {
          ...el.data,
          position: y / 150,
        };
      }
      return el;
    });
  };

  const onNodeDragStop = (event, node) => {
    console.log("onNodeDragStop");
    console.log("node", node);
    if (isNode(node) && node.data.selectedSeries != null) {
      let layoutedElements = getLayoutedElements(elements, node);
      setElements(layoutedElements);
      console.log("layoutedElements", layoutedElements);
      elements.map((el) => {
        if (isNode(el) && el.id === node.id) {
          console.log("updating position for seletected element el", el);
          setSelectedElement(el);
          console.log(
            "updating position for seletected element",
            selectedElement
          );
        }
      });
      console.log("layoutedElements 2", layoutedElements);
      let missionTabsCopy = props.missionTabs.slice();
      let index = missionTabsCopy.findIndex(
        (missionTab) => missionTab.id === props.fileID
      );
      console.log("index", index);
      missionTabsCopy[index].missions = layoutedElements;
      console.log("onNodeDragStop missionTabsCopy", missionTabsCopy);
      props.setMissionTabs(missionTabsCopy);
      console.log("elemeents", elements);
    }
  };

  const onAdd = (name, selectedSeries) => {
    console.log("Elements start", elements);
    console.log("newNode name", name);
    console.log("newNode selectedSeries", selectedSeries);

    const newNode = {
      //id: getNodeId(),
      id: props.getAvailableFileId(),
      data: {
        label: name,
        position: 1,
        selectedSeries: selectedSeries,
      },
      position: {
        x: 0,
        y: 150,
      },
      type: "default",
    };
    console.log("new node", newNode);
    let elementsCopy = [...elements];
    elementsCopy.push(newNode);
    setElements(elementsCopy);

    //let missionTabsCopy = [...props.missionTabs];
    let missionTabsCopy = props.missionTabs.slice();
    let index = missionTabsCopy.findIndex(
      (missionTab) => missionTab.id === props.fileID
    );
    console.log("index", index);
    missionTabsCopy[index].missions = elementsCopy;
    console.log("missionTabsCopy", missionTabsCopy);
    props.setMissionTabs(missionTabsCopy);
    console.log("props.missiontabs", props.missionTabs);

    console.log("Elements End", elements);
  };

  useEffect(() => {
    console.log("new Elements End", elements);
  }, [elements]);

  const onRemove = (selectedMission) => {
    console.log("onRemove selectedMission", selectedMission);
    console.log("onRemove elements", elements);
    let index = elements.findIndex(
      (mission) => mission.id === selectedMission.id
    );

    var removeElementArr = [];
    removeElementArr.push(elements[index]);
    console.log("onRemove removeElementArr", removeElementArr);

    testRemove(removeElementArr);
  };

  const onUpdate = useCallback(() => {
    console.log("OnUpdate elements", elements);
    let missionTabsCopy = props.missionTabs.slice();
    let index = missionTabsCopy.findIndex(
      (missionTab) => missionTab.id === props.fileID
    );
    missionTabsCopy[index].missions = elements;
    props.setMissionTabs(missionTabsCopy);
    console.log("OnUpdate missionTabs", props.missionTabs);
  }, []);

  const testRemove = (elementsToRemove) => {
    console.log("elementsToRemove", elementsToRemove);

    if (selectedElement !== null) {
      for (let index = 0; index < elementsToRemove.length; index++) {
        const element = elementsToRemove[index];
        if (selectedElement.id === element.id) {
          console.log("same");
          setSelectedElement(null);
        }
      }
    }

    setElements((els) => removeElements(elementsToRemove, els), onUpdate());
  };

  const onElementsRemove = (elementsToRemove) => (
    console.log("elementsToRemove", elementsToRemove),
    testRemove(elementsToRemove)
  );

  const getOnlyNodes = () => {
    if (elements.length === 0) return [];
    let elementsCopy = [];
    elements.map((mission) => {
      if (isNode(mission)) {
        elementsCopy.push(mission);
      }
    });
    return elementsCopy;
  };

  return (
    <div className="providerflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper">
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
        <div style={{ minHeight: "100%", margin: "auto" }}>
          <MissionTabButton
            handleClick={handleClose}
            buttonText={closed.maxWidth === "40%" ? "Shrink" : "Expand"}
            toolTipText={closed.maxWidth === "40%" ? "Shrink" : "Expand"}
            icon={
              closed.maxWidth === "40%" ? <FaAngleRight /> : <FaAngleLeft />
            }
          />
        </div>
        <CodeEditor
          closed={closed}
          missions={elements}
          setMissions={setElements}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          series={series}
          setSeries={setSeries}
          onUpdate={onUpdate}
          missionTabs={props.missionTabs}
          fileID={props.fileID}
          setMissionTabs={props.setMissionTabs}
        />
      </ReactFlowProvider>
      <AddMissionModal
        show={props.show}
        setShow={props.setShow}
        addMission={onAdd}
        missions={elements}
        series={series}
      />
      <DuplicateMissionModal
        show={props.show}
        setShow={props.setShow}
        duplicateMission={onAdd}
        missions={elements}
      />
      <RemoveMissionModal
        show={props.show}
        setShow={props.setShow}
        removeMission={onRemove}
        missions={getOnlyNodes()}
      />
      <AddSeriesModal
        show={props.show}
        setShow={props.setShow}
        addSeries={onAdd}
        series={series}
      />
    </div>
  );
};

export default MissionTab;
/*style={{background: "#2A353C"}}*/
