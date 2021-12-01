import React, { useState, useCallback, useEffect, useContext } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  MiniMap,
  Background,
  isNode,
  getIncomers,
} from "react-flow-renderer";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import MissionTabButton from "../../components/MissionTabButton";

import AddMissionModal from "../../components/Modals/AddMissionModal";
import DuplicateMissionModal from "../../components/Modals/DuplicateMissionModal";
import RemoveMissionModal from "../../components/Modals/RemoveMissionModal";
import AddSeriesModal from "../../components/Modals/AddSeriesModal";
import RemoveSeriesModal from "../../components/Modals/RemoveSeriesModal";

import CodeEditor from "./CodeEditor";
import Factory from "../../helper/Factory";
import MissionTreeContext from "../../contexts/MissionTreeContext";
import SettingsContext from "../../contexts/SettingsContext";
import "../../Provider.css";
import inProgressIDMap from "../../InProgressIDMap";

const onLoad = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

const snapGrid = [150, 150];

function applyEdgeStyle(params) {
  params.type = "step";

  params.arrowHeadType = "arrowclosed";
  return params;
}

const MissionTab = (props) => {
  const missionTreeContext = useContext(MissionTreeContext);
  const settingsContext = useContext(SettingsContext);
  const [elements, setElements] = useState(props.missionTree.missions);
  const [selectedElement, setSelectedElement] = useState(null);
  const [series, setSeries] = useState(props.missionTree.series);

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

  const onConnect = (params) => {
    let newParams = applyEdgeStyle(params);
    let copyElements = addEdge(newParams, elements);
    console.log("newConnection:", newParams);
    console.log("copyElements:", copyElements);
    setElements(copyElements);
    updateElementsAfterConnection(newParams, copyElements);
  };

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
    let missionTreesCopy = missionTreeContext.missionTrees.slice();
    let index = missionTreesCopy.findIndex(
      (missionTree) => missionTree.id === props.missionTree.id
    );
    if (index != -1) {
      console.log(
        "missiontab.js useEffect[series, setSelectedElement] updating"
      );
      missionTreesCopy[index].series = series;
      missionTreeContext.editMissionTree(missionTreesCopy[index]);
    }
  }, [series, setSelectedElement]);

  const updateElementsAfterConnection = (params, copyElements) => {
    let indexMission = copyElements.findIndex(
      (mission) => mission.id === params.target
    );
    let incomers = getIncomers(copyElements[indexMission], copyElements);
    let incomerNames = incomers.map((incomer) => {
      return incomer.data.label;
    });
    let missionsCopy = copyElements.slice();
    missionsCopy[indexMission].data.required_missions = incomerNames;

    let missionTreesCopy = missionTreeContext.missionTrees.slice();
    let indexMissionTree = missionTreesCopy.findIndex(
      (missionTree) => missionTree.id === props.missionTreeId
    );
    if (indexMissionTree != -1) {
      console.log("missiontab.js updateElementsAfterConnection updating");
      missionTreesCopy[indexMissionTree].missions = missionsCopy;
      missionTreeContext.editMissionTree(missionTreesCopy[indexMissionTree]);
    }
  };

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
          setSelectedElement({ ...el });
          console.log(
            "updating position for seletected element",
            selectedElement
          );
        }
      });
      console.log("layoutedElements 2", layoutedElements);
      let missionTreesCopy = missionTreeContext.missionTrees.slice();
      let index = missionTreesCopy.findIndex(
        (missionTree) => missionTree.id === props.missionTree.id
      );
      console.log("index", index);
      if (index !== -1) {
        console.log("missiontab.js onNodeDragStop updating");
        missionTreesCopy[index].missions = layoutedElements;
        console.log("onNodeDragStop missionTabsCopy", missionTreesCopy);
        missionTreeContext.editMissionTree(missionTreesCopy[index]);
        console.log("elemeents", elements);
      }
    }
  };

  const onAdd = (name, selectedSeries) => {
    console.log("Elements start", elements);
    console.log("newNode name", name);
    console.log("newNode selectedSeries", selectedSeries);

    const selectedSeriesObj = series.find((x) => x.id === selectedSeries);

    const newNode = Factory.createDefaultMission(
      missionTreeContext.getAvailableNodeId(),
      name,
      selectedSeriesObj
    );

    console.log("new node", newNode);
    let elementsCopy = [...elements];
    elementsCopy.push(newNode);
    setElements(elementsCopy);

    console.log("Elements End", elements);
  };

  const addSeries = (name) => {
    console.log("name", name);

    let newSeries = Factory.createDefaultSeries(
      missionTreeContext.getAvailableSeriesId(),
      name
    );

    console.log("newSeries", newSeries);
    let seriesCopy = [...series];
    seriesCopy.push(newSeries);
    setSeries(seriesCopy);
  };

  useEffect(() => {
    console.log("missiontab.js useEffect [elements]");
    console.log("new Elements End", elements);

    let missionTreesCopy = missionTreeContext.missionTrees.slice();
    let index = missionTreesCopy.findIndex(
      (missionTree) => missionTree.id === props.missionTree.id
    );
    if (index !== -1) {
      missionTreesCopy[index].missions = elements;
      console.log("missionTabsCopy", missionTreesCopy);
      missionTreeContext.editMissionTree(missionTreesCopy[index]);
    }
  }, [elements]);

  const onRemove = (selectedMission) => {
    console.log("onRemove selectedMission", selectedMission);
    console.log("onRemove elements", elements);
    let index = elements.findIndex((mission) => mission.id === selectedMission);
    console.log("onRemove index", index);
    var removeElementArr = [];
    removeElementArr.push(elements[index]);
    console.log("onRemove removeElementArr", removeElementArr);

    testRemove(removeElementArr);
  };

  const onUpdate = useCallback(() => {
    console.log("OnUpdate elements", elements);
    let missionTreesCopy = missionTreeContext.missionTrees.slice();
    let index = missionTreesCopy.findIndex(
      (missionTree) => missionTree.id === props.missionTree.id
    );
    if (index !== -1) {
      missionTreesCopy[index].missions = elements;
      console.log("missiontab.js onUpdate updating");
      missionTreeContext.editMissionTree(missionTreesCopy[index]);
    }
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

  const removeSeries = (seriesId, seriesReplaceId) => {
    if (series.length === 1) return;
    console.log("removeSeries seriesId", seriesId);
    console.log("removeSeries seriesReplaceId", seriesReplaceId);

    const elementsCopy = elements.map((el) => {
      if (isNode(el)) {
        if (el.data.selectedSeries === seriesId) {
          console.log("found node with id:", seriesId);
          el = {
            ...el,
            data: {
              ...el.data,
              selectedSeries: seriesReplaceId,
            },
          };
        }
      }
      return el;
    });
    console.log("elementsCopy", elementsCopy);
    if (selectedElement !== null) {
      let index = elementsCopy.findIndex(
        (mission) => mission.id === selectedElement.id
      );
      let layoutedElements = getLayoutedElements(
        elementsCopy,
        elementsCopy[index]
      );
      setElements(layoutedElements);
      index = layoutedElements.findIndex(
        (mission) => mission.id === selectedElement.id
      );
      let selectedElementCopy = { ...layoutedElements[index] };
      setSelectedElement({ ...selectedElementCopy });
      console.log("selectedElementCopy", selectedElementCopy);
      console.log("layoutedElements", layoutedElements);
    } else {
      setElements(elementsCopy);
    }

    let seriesCopy = series.slice();
    let seriesIndex = series.findIndex((serie) => serie.id === seriesId);

    console.log("seriesCopy", seriesCopy);
    seriesCopy.splice(seriesIndex, 1);
    setSeries(seriesCopy);
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
        <div style={{ minHeight: "100%", margin: "auto" }}>
          <MissionTabButton
            handleClick={props.handleCloseTabList}
            buttonText={
              props.closedTabsList.maxWidth === "15%"
                ? "Shrink Mission File List"
                : "Expand Mission File List"
            }
            toolTipText={
              props.closedTabsList.maxWidth === "15%"
                ? "Shrink Mission File List"
                : "Expand Mission File List"
            }
            icon={
              props.closedTabsList.maxWidth === "15%" ? (
                <FaAngleLeft />
              ) : (
                <FaAngleRight />
              )
            }
          />
        </div>
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
              [settingsContext.maxSlot * 150, 90000],
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
            buttonText={
              closed.maxWidth === "40%" ? "Shrink Editor" : "Expand Editor"
            }
            toolTipText={
              closed.maxWidth === "40%" ? "Shrink Editor" : "Expand Editor"
            }
            icon={
              closed.maxWidth === "40%" ? <FaAngleRight /> : <FaAngleLeft />
            }
          />
        </div>
        <CodeEditor
          closed={closed}
          missions={elements}
          missionTree={props.missionTree}
          setMissions={setElements}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          series={series}
          setSeries={setSeries}
          onUpdate={onUpdate}
          fileId={props.missionTree.id}
        />
      </ReactFlowProvider>
      {props.show === inProgressIDMap.addMission ? (
        <div>
          <AddMissionModal
            show={props.show}
            setShow={props.setShow}
            addMission={onAdd}
            missions={elements}
            series={series}
          />
        </div>
      ) : null}
      {props.show === inProgressIDMap.duplicateMission ? (
        <div>
          <DuplicateMissionModal
            show={props.show}
            setShow={props.setShow}
            duplicateMission={onAdd}
            missions={getOnlyNodes()}
          />
        </div>
      ) : null}
      {props.show === inProgressIDMap.removeMission ? (
        <div>
          <RemoveMissionModal
            show={props.show}
            setShow={props.setShow}
            removeMission={onRemove}
            missions={getOnlyNodes()}
          />
        </div>
      ) : null}
      {props.show === inProgressIDMap.addSeries ? (
        <div>
          <AddSeriesModal
            show={props.show}
            setShow={props.setShow}
            addSeries={addSeries}
            series={series}
          />
        </div>
      ) : null}
      {props.show === inProgressIDMap.removeSeries ? (
        <div>
          <RemoveSeriesModal
            show={props.show}
            setShow={props.setShow}
            removeSeries={removeSeries}
            series={series}
          />
        </div>
      ) : null}
    </div>
  );
};

export default MissionTab;