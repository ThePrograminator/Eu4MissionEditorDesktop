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
import AddContainerModal from "../../components/Modals/AddContainerModal";
import RemoveContainerModal from "../../components/Modals/RemoveContainerModal";

import CodeEditor from "./CodeEditor";
import Factory from "../../helper/Factory";
import MissionTreeContext from "../../contexts/MissionTreeContext";
import SettingsContext from "../../contexts/SettingsContext";
import "../../Provider.css";
import inProgressIDMap from "../../InProgressIDMap";

import CustomHOINode from "../../components/CustomHOINode";

const onLoad = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

const snapGrid = [150, 150];

function applyEdgeStyle(params, type = 0) {
  params.type = "step";
  if (type === 0) {
    params.arrowHeadType = "arrowclosed";
  }
  if (type === 1) {
    params.style = { stroke: "#00A86B" };
    params.label = "< ! >";
    params.labelStyle = { fill: "red", fontWeight: 700 };
  }

  return params;
}

const nodeTypes = {
  hoiNode: CustomHOINode,
};

const MissionTab = (props) => {
  const missionTreeContext = useContext(MissionTreeContext);
  const settingsContext = useContext(SettingsContext);
  const [elements, setElements] = useState(props.missionTree.missions);
  const [selectedElement, setSelectedElement] = useState(null);
  const [container, setContainer] = useState(props.missionTree.container);

  const [closed, setClosed] = useState({
    maxWidth: "30%",
    visibility: "visible",
    maxHeight: "-webkit-fill-available",
  });

  const calcMinNodeExtent = () => {
    switch (settingsContext.currentWorkspace.type) {
      case 0:
        return [150, 0];
      case 1:
        return [0, 0];
      default:
        break;
    }
  };

  const calcMaxNodeExtent = () => {
    switch (settingsContext.currentWorkspace.type) {
      case 0:
        return [settingsContext.maxSlot * 150, 90000];
      case 1:
        return [90000, 90000];
      default:
        break;
    }
  };

  const handleClose = () => {
    console.log("Clicked Closed");
    if (closed.maxWidth === "30%")
      setClosed({
        ...closed,
        maxWidth: "5%",
        visibility: "hidden",
      });
    else
      setClosed({
        ...closed,
        maxWidth: "30%",
        visibility: "visible",
      });
    console.log(closed);
  };

  const isExclusiveConnection = (params) => {
    if (
      params.targetHandle === "leftExclusive" &&
      params.sourceHandle === "rightExclusive"
    ) {
      return true;
    }

    return false;
  };

  const onConnect = (params) => {
    var type = 0;
    if (isExclusiveConnection(params)) type = 1;
    let newParams = applyEdgeStyle(params, type);
    let copyElements = addEdge(newParams, elements);
    console.log("newConnection:", newParams);
    console.log("copyElements:", copyElements);
    setElements(copyElements);
    updateElementsAfterConnection(newParams, copyElements);
  };

  useEffect(() => {
    console.log("MissionTab useEffect, [container, setSelectedElement]");
    console.log("container", container);
    const ele = elements.map((el) => {
      if (isNode(el) && el.data.selectedContainer != null) {
        // unfortunately we need this little hack to pass a slighltiy different position
        // in order to notify react flow about the change
        var x = 0;
        switch (settingsContext.currentWorkspace.type) {
          case 0:
            x =
              container.find((x) => x.id === el.data.selectedContainer).slot *
              150;
            break;
          case 1:
            x = el.data.x * 150;
            break;
          default:
            break;
        }
        el.position = {
          x: x,
          y: el.position.y,
        };
        el.style = {
          ...el.style,
          background: container.find((x) => x.id === el.data.selectedContainer)
            .color,
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
        "missiontab.js useEffect[container, setSelectedElement] updating"
      );
      missionTreesCopy[index].container = container;
      missionTreeContext.editMissionTree(missionTreesCopy[index]);
    }
  }, [container, setSelectedElement]);

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

        if (settingsContext.currentWorkspace.type === 0) {
          el.position = {
            x: el.position.x + Math.random(),
            y: y,
          };
          el.data = {
            ...el.data,
            position: y / 150,
          };
        } else if (settingsContext.currentWorkspace.type === 1) {
          y = node.position.y;
          var x = node.position.x;
          el.position = {
            x: el.position.x + Math.random(),
            y: y,
          };
          el.data = {
            ...el.data,
            x: x / 150,
            y: y / 150,
          };
        }
      }
      return el;
    });
  };

  const onNodeDragStop = (event, node) => {
    console.log("onNodeDragStop");
    console.log("node", node);
    if (isNode(node) && node.data.selectedContainer != null) {
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

  const onAdd = (name, selectedContainer) => {
    //onAddHoi(name, selectedContainer);
    console.log("Elements start", elements);
    console.log("newNode name", name);
    console.log("newNode selectedContainer", selectedContainer);

    const selectedContainerObj = container.find(
      (x) => x.id === selectedContainer
    );

    let newNode = null;

    if (settingsContext.currentWorkspace.type === 0) {
      newNode = Factory.createDefaultMission(
        missionTreeContext.getAvailableNodeId(),
        name,
        selectedContainerObj
      );
    } else if (settingsContext.currentWorkspace.type === 1) {
      newNode = Factory.createDefaultFocus(
        missionTreeContext.getAvailableNodeId(),
        name,
        selectedContainerObj
      );
      newNode.type = "hoiNode";
    }

    console.log("new node", newNode);
    let elementsCopy = [...elements];
    elementsCopy.push(newNode);
    setElements(elementsCopy);

    console.log("Elements End", elements);
  };

  const addContainer = (name) => {
    console.log("name", name);

    let newContainer = Factory.createDefaultContainer(
      missionTreeContext.getAvailableContainerId(),
      name
    );

    console.log("newContainer", newContainer);
    let containerCopy = [...container];
    containerCopy.push(newContainer);
    setContainer(containerCopy);
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

  const removeContainer = (containerId, containerReplaceId) => {
    if (container.length === 1) return;
    console.log("removeContainer containerId", containerId);
    console.log("removeContainer containerReplaceId", containerReplaceId);

    const elementsCopy = elements.map((el) => {
      if (isNode(el)) {
        if (el.data.selectedContainer === containerId) {
          console.log("found node with id:", containerId);
          el = {
            ...el,
            data: {
              ...el.data,
              selectedContainer: containerReplaceId,
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

    let containerCopy = container.slice();
    let containerIndex = container.findIndex(
      (container) => container.id === containerId
    );

    console.log("containerCopy", containerCopy);
    containerCopy.splice(containerIndex, 1);
    setContainer(containerCopy);
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
              props.closedTabsList.maxWidth === "250px"
                ? "Shrink Mission File List"
                : "Expand Mission File List"
            }
            toolTipText={
              props.closedTabsList.maxWidth === "250px"
                ? "Shrink Mission File List"
                : "Expand Mission File List"
            }
            icon={
              props.closedTabsList.maxWidth === "250px" ? (
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
            nodeTypes={nodeTypes}
            snapToGrid={true}
            snapGrid={snapGrid}
            onNodeDragStop={onNodeDragStop}
            selectNodesOnDrag={false}
            nodeExtent={[calcMinNodeExtent(), calcMaxNodeExtent()]}
            deleteKeyCode={46}
          >
            <MiniMap
              nodeStrokeWidth={5}
              style={{ borderStyle: "solid" }}
              nodeColor={(node) => {
                if (node.style.background !== undefined) {
                  //return node.data.color;
                  return node.style.background;
                } else return "#000";
              }}
              
            />
            <Controls showInteractive={false} />
            <Background style={{ borderStyle: "solid" }} />
          </ReactFlow>
        </div>
        <div style={{ minHeight: "100%", margin: "auto" }}>
          <MissionTabButton
            handleClick={handleClose}
            buttonText={
              closed.maxWidth === "30%" ? "Shrink Editor" : "Expand Editor"
            }
            toolTipText={
              closed.maxWidth === "30%" ? "Shrink Editor" : "Expand Editor"
            }
            icon={
              closed.maxWidth === "30%" ? <FaAngleRight /> : <FaAngleLeft />
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
          container={container}
          setContainer={setContainer}
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
            container={container}
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
      {props.show === inProgressIDMap.addContainer ? (
        <div>
          <AddContainerModal
            show={props.show}
            setShow={props.setShow}
            addContainer={addContainer}
            container={container}
          />
        </div>
      ) : null}
      {props.show === inProgressIDMap.removeContainer ? (
        <div>
          <RemoveContainerModal
            show={props.show}
            setShow={props.setShow}
            removeContainer={removeContainer}
            container={container}
          />
        </div>
      ) : null}
    </div>
  );
};

export default MissionTab;
