import React, { useState, useEffect, useContext } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import SettingsContext from "../contexts/SettingsContext";
import Factory from "../helper/Factory";

const WorkspaceSelect = (props) => {
  const settingsContext = useContext(SettingsContext);
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
    console.log("workspace", workspace)
    if (workspace === 999999)
    {
      setSelectedWorkSpace(workspace);
      console.log("Not Valid");
      props.setValidated(false);
      return;
    } 
    else
    {
      setSelectedWorkSpace(workspace);

      console.log("Valid");
      props.setValidated(true);
    }
  };

  const setWorkspace = () => {
    if (!props.validated) return;
    var workspaceIndex = selectAbleList.findIndex(x => x.id === selectedWorkSpace)
    console.log("workspace", selectAbleList[workspaceIndex])
    settingsContext.updateState("currentWorkspace", selectAbleList[workspaceIndex]);
    props.setShow(0);
  };

  useEffect(() => {
    setSelectAbleList(() => createDummy());
    setSelectedWorkSpace(selectAbleList[0]);
    props.setValidated(false);
    props.setErrorMessage("Name is Empty");
  }, []);

  return (
    <Form>
      <Form.Group as={Row} controlId="formSeries">
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
                {workspace.name +
                  (workspace.type !== undefined ? " - " + workspace.type : "")}
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
