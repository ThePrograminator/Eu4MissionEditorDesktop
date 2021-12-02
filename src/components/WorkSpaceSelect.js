import React, { useState, useEffect, useContext } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import SettingsContext from "../contexts/SettingsContext";
import MissionTreeContext from "../contexts/MissionTreeContext";
import Factory from "../helper/Factory";
import Reader from "../Reader";

const WorkspaceSelect = (props) => {
  const settingsContext = useContext(SettingsContext);
  const missionTreeContext = useContext(MissionTreeContext);
  var createDummy = () => {
    var workspace = Factory.createDefaultWorkspace(999999, "Select Workspace");
    var workSpaceList = [];
    workSpaceList.push(workspace);
    workSpaceList.push(...settingsContext.workspaces);
    console.log("workSpaceList", workSpaceList);
    return workSpaceList;
  };
  const [selectAbleList, setSelectAbleList] = useState(() => createDummy());
  const [selectedWorkSpace, setSelectedWorkSpace] = useState(selectAbleList[0]);

  const handleInput = (event) => {
    var workspaceValue = event.target.value;
    var workspace = parseInt(workspaceValue);
    console.log("workspace", workspace);
    if (workspace === 999999) {
      setSelectedWorkSpace(workspace);
      console.log("Not Valid");
      props.setValidated(false);
      return;
    } else {
      setSelectedWorkSpace(workspace);

      console.log("Valid");
      props.setValidated(true);
    }
  };

  const setWorkspace = () => {
    if (!props.validated) return;
    var workspaceIndex = selectAbleList.findIndex(
      (x) => x.id === selectedWorkSpace
    );
    var workspace = selectAbleList[workspaceIndex];
    console.log("Change", settingsContext.currentWorkSpace);
    var filePathsIndexToDelete = [];
    var readFile = false;
    for (let index = 0; index < workspace.filePaths.length; index++) {
      const filepath = workspace.filePaths[index];

      Reader.asyncHandleFile(
        filepath,
        missionTreeContext.getAvailableTreeId(),
        workspace.id,
        (allMissionTabs) => {
          missionTreeContext.addMissionTree(allMissionTabs[0]);
          missionTreeContext.setAvailableNodeId(
            allMissionTabs[0].importedMissionLastId
          );
          missionTreeContext.setAvailableContainerId(
            allMissionTabs[0].importedContainerLastId
          );
          readFile = true;
        }
      );
      if (!readFile) {
        filePathsIndexToDelete.push(index);
      }
      readFile = false;
    }

    //Delete filepaths which do not exist anymore
    for (let index = 0; index < filePathsIndexToDelete.length; index++) {
      const element = filePathsIndexToDelete[index];
      workspace.filePaths = workspace.filePaths.filter(function (
        value,
        index,
        arr
      ) {
        return index !== element;
      });
    }

    console.log("workspace", workspace);
    settingsContext.updateState("currentWorkspace", workspace, () => {
      props.setShow(0);
    });
  };

  useEffect(() => {
    setSelectAbleList(() => createDummy());
    setSelectedWorkSpace(selectAbleList[0]);
    props.setValidated(false);
    props.setErrorMessage("Name is Empty");
  }, []);

  const getName = (type) => {
    return settingsContext.getText("name", type);
  };

  return (
    <Form>
      <Form.Group as={Row} controlId="formContainer">
        <Form.Label column sm="2">
          Workspace
        </Form.Label>
        <Col lg={true}>
          <Form.Control
            as="select"
            onChange={(evt) => handleInput(evt)}
            value={selectedWorkSpace}
          >
            {selectAbleList.map((workspace, index) => (
              <option key={index} value={workspace.id}>
                {(workspace.type !== undefined
                  ? getName(workspace.type) + " - "
                  : "") + workspace.name}
              </option>
            ))}
          </Form.Control>
        </Col>
      </Form.Group>
      <Button
        variant="primary"
        onClick={() => setWorkspace()}
        disabled={!props.validated}
      >
        Submit
      </Button>
    </Form>
  );
};

export default WorkspaceSelect;

/*
<ListGroup defaultActiveKey="#link1">
      {settingsContext.workspaces.length > 0 ? (
        settingsContext.workspaces.map((workspace, idx) => (
          <ListGroup.Item
            key={idx}
            id={`workspace-${idx}`}
            name="workspace"
            action
            onClick={(e) => setSelectedWorkSpace(e.currentTarget.value.id)}
          >
            {workspace.name}
          </ListGroup.Item>
        ))
      ) : (
        <h1>No Workspaces to load</h1>
      )}
    </ListGroup>
    */
