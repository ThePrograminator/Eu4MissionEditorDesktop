import React, { useEffect, useState, useContext } from "react";
import { FormControl, Form } from "react-bootstrap";
import { getIncomers } from "react-flow-renderer";
import SettingsContext from "../contexts/SettingsContext";

const Mission = (props) => {
  const settingsContext = useContext(SettingsContext);
  const [nodeName, setNodeName] = useState(props.selectedElement.data.label);
  const [icon, setIcon] = useState(props.selectedElement.data.icon);
  const [allowBranch, setAllowBranch] = useState(
    props.selectedElement.data.allow_branch
  );
  const [x, setX] = useState(props.selectedElement.data.x);
  const [y, setY] = useState(props.selectedElement.data.y);
  const [relativePositionId, setRelativePositionId] = useState(
    props.selectedElement.data.relative_position_id
  );
  const [offset, setOffset] = useState(props.selectedElement.data.offset);
  const [prerequisite, setPrerequisite] = useState(
    props.selectedElement.data.prerequisite
  );
  const [mutuallyExclusive, setMutuallyExclusive] = useState(
    props.selectedElement.data.mutually_exclusive
  );
  const [available, setAvailable] = useState(
    props.selectedElement.data.available
  );
  const [bypass, setBypass] = useState(props.selectedElement.data.bypass);
  const [historicalAi, setHistoricalAi] = useState(
    props.selectedElement.data.historical_ai
  );
  const [cancel, setCancel] = useState(props.selectedElement.data.cancel);
  const [availableIfCapitulated, setAvailableIfCapitulated] = useState(
    props.selectedElement.data.available_if_capitulated
  );
  const [cancelIfInvalid, setCancelIfInvalid] = useState(
    props.selectedElement.data.cancel_if_invalid
  );
  const [continueIfInvalid, setContinueIfInvalid] = useState(
    props.selectedElement.data.continue_if_invalid
  );
  const [willLeadToWarWith, setWillLeadToWarWith] = useState(
    props.selectedElement.data.will_lead_to_war_with
  );
  const [searchFilters, setSearchFilters] = useState(
    props.selectedElement.data.search_filters
  );
  const [selectEffect, setSelectEffect] = useState(
    props.selectedElement.data.select_effect
  );
  const [completionReward, setCompletionReward] = useState(
    props.selectedElement.data.completion_reward
  );
  const [completeTooltip, setCompleteTooltip] = useState(
    props.selectedElement.data.complete_tooltip
  );
  const [aiWillDo, setAiWillDo] = useState(
    props.selectedElement.data.ai_will_do
  );
  const [selectedContainer, setSelectedContainer] = useState(
    props.selectedElement.data.selectedContainer
  );

  useEffect(() => {
    console.log(
      "useEffect Mission [props.selectedElement, props.missionTree, props.container]"
    );
    setNodeName(props.selectedElement.data.label);
    setIcon(props.selectedElement.data.icon);
    setAllowBranch(props.selectedElement.data.allow_branch);
    setX(props.selectedElement.data.x);
    setY(props.selectedElement.data.y);
    setRelativePositionId(props.selectedElement.data.relative_position_id);
    setOffset(props.selectedElement.data.offset);
    setPrerequisite(props.selectedElement.data.prerequisite);
    setMutuallyExclusive(props.selectedElement.data.mutually_exclusive);
    setAvailable(props.selectedElement.data.available);
    setBypass(props.selectedElement.data.bypass);
    setHistoricalAi(props.selectedElement.data.historical_ai);
    setCancel(props.selectedElement.data.cancel);
    setAvailableIfCapitulated(
      props.selectedElement.data.available_if_capitulated
    );
    setCancelIfInvalid(props.selectedElement.data.cancel_if_invalid);
    setContinueIfInvalid(props.selectedElement.data.continue_if_invalid);
    setWillLeadToWarWith(props.selectedElement.data.will_lead_to_war_with);
    setSearchFilters(props.selectedElement.data.search_filters);
    setSelectEffect(props.selectedElement.data.select_effect);
    setCompletionReward(props.selectedElement.data.completion_reward);
    setCompleteTooltip(props.selectedElement.data.complete_tooltip);
    setAiWillDo(props.selectedElement.data.ai_will_do);
    setSelectedContainer(props.selectedElement.data.selectedContainer);
  }, [props.selectedElement, props.missionTree, props.container]);

  useEffect(() => {
    console.log("update mission [props.selectedElement]");
    setSelectedContainer(props.selectedElement.data.selectedContainer);
  }, [props.selectedElement]);

  useEffect(() => {
    console.log(
      "update mission [props.selectedElement.data.selectedContainer]"
    );
    setSelectedContainer(props.selectedElement.data.selectedContainer);
  }, [props.selectedElement.data.selectedContainer]);

  useEffect(() => {
    console.log("nodeName", nodeName);
    let missionsCopy = props.missionTree.missions.slice();
    missionsCopy.map((el) => {
      if (el.id === props.selectedElement.id) {
        let incomers = getIncomers(
          props.selectedElement,
          props.missionTree.missions
        );
        let incomerNames = incomers.map((incomer) => {
          return incomer.data.label;
        });
        el.data = {
          ...el.data,
          label: nodeName,
          icon: icon,
          allow_branch: allowBranch,
          relative_position_id: relativePositionId,
          offset: offset,
          prerequisite: incomerNames,
          mutually_exclusive: mutuallyExclusive,
          available: available,
          bypass: bypass,
          historical_ai: historicalAi,
          cancel: cancel,
          cancel_if_invalid: cancelIfInvalid,
          continue_if_invalid: continueIfInvalid,
          available_if_capitulated: availableIfCapitulated,
          will_lead_to_war_with: willLeadToWarWith,
          search_filters: searchFilters,
          select_effect: selectEffect,
          completion_reward: completionReward,
          complete_tooltip: completeTooltip,
          ai_will_do: aiWillDo,
          selectedContainer: selectedContainer,
        };
        el.position = {
          ...el.position,
          x: x * 150,
          y: y * 150,
        };
        if (
          selectedContainer !== undefined &&
          selectedContainer !== null &&
          selectedContainer !== "Select Container"
        ) {
          el.style = {
            ...el.style,
            background: props.container.find((x) => x.id === selectedContainer)
              .color,
          };
        }
        console.log("data", el);
        props.setSelectedElement(el);
      }

      return el;
    });

    props.setMissions(missionsCopy);
  }, [
    nodeName,
    icon,
    allowBranch,
    x,
    y,
    relativePositionId,
    offset,
    prerequisite,
    mutuallyExclusive,
    available,
    bypass,
    historicalAi,
    cancel,
    availableIfCapitulated,
    cancelIfInvalid,
    continueIfInvalid,
    willLeadToWarWith,
    searchFilters,
    selectEffect,
    completionReward,
    completeTooltip,
    aiWillDo,
    selectedContainer,
  ]);

  return (
    <Form>
      <Form.Group controlId="formContainer">
        <Form.Label>
          {"Selected " + settingsContext.getText("containerName")}
        </Form.Label>
        <Form.Control
          as="select"
          onChange={(evt) => setSelectedContainer(evt.target.value)}
          value={selectedContainer}
          placeholder={"Select " + settingsContext.getText("containerName")}
        >
          {props.container.map((container) => (
            <option key={container.id} value={container.id}>
              {container.name}
            </option>
          ))}
        </Form.Control>
        <Form.Text className="text-muted">
          {"(Required) A Focus needs a " +
            settingsContext.getText("containerName")}
        </Form.Text>
      </Form.Group>

      <hr />

      <Form.Group controlId="formLabel">
        <Form.Label>Mission Name</Form.Label>
        <FormControl
          placeholder="name"
          aria-label="label"
          value={nodeName}
          aria-describedby="basic-addon1"
          onChange={(evt) => setNodeName(evt.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formIcon">
        <Form.Label>Icon</Form.Label>
        <FormControl
          placeholder="icon"
          aria-label="icon"
          value={icon}
          aria-describedby="basic-addon1"
          onChange={(evt) => setIcon(evt.target.value)}
        />
        <Form.Text className="text-muted">
          The icon to use for the focus
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formAllowBranch">
        <Form.Label>Allow Branch</Form.Label>
        <FormControl
          as="textarea"
          placeholder="Allow Branch..."
          aria-label="Allow Branch"
          value={allowBranch}
          aria-describedby="basic-addon1"
          onChange={(evt) => setAllowBranch(evt.target.value)}
        />
        <Form.Text className="text-muted">
          Optional. is used to hide branches depending on certain triggers. Used
          in base game focus trees of majors to hide DLC-exclusive branches. Is
          only checked when the focus tree is loaded or when the check is
          forcibly refreshed by the mark_focus_tree_layout_dirty effect.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formX">
        <Form.Label>X</Form.Label>
        <FormControl
          type="number"
          placeholder="x"
          aria-label="x"
          value={x}
          aria-describedby="basic-addon1"
          min={0}
          onChange={(evt) => setX(evt.target.value)}
          style={{ width: "20%" }}
        />
        <Form.Text className="text-muted">
          Which row the mission appears in. 0 is top.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formY">
        <Form.Label>Y</Form.Label>
        <FormControl
          type="number"
          placeholder="y"
          aria-label="y"
          value={y}
          aria-describedby="basic-addon1"
          min={0}
          onChange={(evt) => setY(evt.target.value)}
          style={{ width: "20%" }}
        />
        <Form.Text className="text-muted">
          Which colounm the mission appears in. 0 is top.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formRelativePositionId">
        <Form.Label>Relative Position Id</Form.Label>
        <FormControl
          placeholder="Relative Position Id..."
          aria-label="Relative Position Id"
          value={relativePositionId}
          aria-describedby="basic-addon1"
          onChange={(evt) => setRelativePositionId(evt.target.value)}
        />
        <Form.Text className="text-muted">
          Optional. Makes the x and y values relative to the defined focus,
          which allows for negative values.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formOffset">
        <Form.Label>Offset</Form.Label>
        <FormControl
          as="textarea"
          placeholder="Offset..."
          aria-label="Offset"
          value={offset}
          aria-describedby="basic-addon1"
          onChange={(evt) => setOffset(evt.target.value)}
        />
        <Form.Text className="text-muted">
          Optional. Will modify the position of the focus by a certain amount if
          the trigger is true. Is only checked when the focus tree is loaded or
          when the check is forcibly refreshed by the
          mark_focus_tree_layout_dirty effect.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId={"formIncomer"}>
        <Form.Label>Required Focuses</Form.Label>
        {getIncomers(props.selectedElement, props.missionTree.missions).map(
          (incomer) => (
            <Form.Control
              key={incomer.id}
              readOnly
              defaultValue={incomer.data.label}
            />
          )
        )}
        <Form.Text className="text-muted">
          Which Focuses must be completed before this focus is active.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formMutuallyExclusive">
        <Form.Label>Mutually Exclusive</Form.Label>
        <FormControl
          as="textarea"
          placeholder="Mutually Exclusive..."
          aria-label="Mutually Exclusive"
          value={mutuallyExclusive}
          aria-describedby="basic-addon1"
          onChange={(evt) => setOffset(evt.target.value)}
        />
        <Form.Text className="text-muted">
          Optional. Will make it so only one of the listed focuses can be done.
          Can have more than one.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formAvailable">
        <Form.Label>Available</Form.Label>
        <FormControl
          as="textarea"
          placeholder="Available..."
          aria-label="Available"
          value={available}
          aria-describedby="basic-addon1"
          onChange={(evt) => setAvailable(evt.target.value)}
        />
        <Form.Text className="text-muted">
          Optional. Will make it so a focus can only be started if the following
          triggers are true.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBypass">
        <Form.Label>Bypass</Form.Label>
        <FormControl
          as="textarea"
          placeholder="Bypass..."
          aria-label="Bypass"
          value={bypass}
          aria-describedby="basic-addon1"
          onChange={(evt) => setBypass(evt.target.value)}
        />
        <Form.Text className="text-muted">
          Optional. Will make it so a focus will be skipped if the following
          triggers are true. Note that the rewards will not be given when the
          focus is bypassed instead of completed.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formHistoricalAi">
        <Form.Label>Historical Ai</Form.Label>
        <FormControl
          as="textarea"
          placeholder="Historical Ai..."
          aria-label="Historical Ai"
          value={historicalAi}
          aria-describedby="basic-addon1"
          onChange={(evt) => setHistoricalAi(evt.target.value)}
        />
        <Form.Text className="text-muted">
          Optional. Is a trigger used when Historical Focus is enabled. It
          overrides the ai_strategy_plan focus lists, so an AI will skip this
          focus if triggers are false.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formCancel">
        <Form.Label>Cancel</Form.Label>
        <FormControl
          as="textarea"
          placeholder="Cancel..."
          aria-label="Cancel"
          value={cancel}
          aria-describedby="basic-addon1"
          onChange={(evt) => setCancel(evt.target.value)}
        />
        <Form.Text className="text-muted">
          Optional. Will abort the focus if the triggers are true.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formAvailableIfCapitulated">
        <Form.Check
          type="checkbox"
          label="Available If Capitulated"
          checked={availableIfCapitulated}
          onChange={(evt) => setAvailableIfCapitulated(evt.target.checked)}
        />
        <Form.Text className="text-muted">
          Optional. Will make it so a focus can not be completed if the country
          has capitulated. Defaults to false.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formCancelIfInvalid">
        <Form.Check
          type="checkbox"
          label="Cancel If Invalid"
          checked={cancelIfInvalid}
          onChange={(evt) => setCancelIfInvalid(evt.target.checked)}
        />
        <Form.Text className="text-muted">
          Optional. Will make it so a focus will cancel if the trigger
          (available = {} ) is false.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formContinueIfInvalid">
        <Form.Check
          type="checkbox"
          label="Continue If Invalid"
          checked={continueIfInvalid}
          onChange={(evt) => setContinueIfInvalid(evt.target.checked)}
        />
        <Form.Text className="text-muted">
          Optional. Will make it so a focus will continue even if the triggers
          (available = {} ) become false. Defaults to false. Same as
          "cancel_if_invalid" but with an inverse logic.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formWillLeadToWarWith">
        <Form.Label>Will Lead to War With</Form.Label>
        <FormControl
          placeholder="Will Lead to War With..."
          aria-label="Will Lead to War With"
          value={willLeadToWarWith}
          aria-describedby="basic-addon1"
          onChange={(evt) => setWillLeadToWarWith(evt.target.value)}
        />
        <Form.Text className="text-muted">
          Optional. Will make it so a focus will continue even if the triggers
          (available = {} ) become false. Defaults to false. Same as
          "cancel_if_invalid" but with an inverse logic.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formSearchFilters">
        <Form.Label>Search Filters</Form.Label>
        <FormControl
          as="textarea"
          placeholder="Search Filters..."
          aria-label="Search Filters"
          value={searchFilters}
          aria-describedby="basic-addon1"
          onChange={(evt) => setSearchFilters(evt.target.value)}
        />
        <Form.Text className="text-muted">
          Optional. Assigns the search filters to the focus, making it be
          highlighted if the player chooses the specified filter. Separated by
          spaces if multiple.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formSelectEffect">
        <Form.Label>Select Effect</Form.Label>
        <FormControl
          as="textarea"
          placeholder="Select Effect..."
          aria-label="Select Effect"
          value={selectEffect}
          aria-describedby="basic-addon1"
          onChange={(evt) => setSelectEffect(evt.target.value)}
        />
        <Form.Text className="text-muted">
          Optional. Will make it so when a focus is selected, a command will be
          run. Will make the focus unable to be canceled.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formCompletionReward">
        <Form.Label>Completion Reward</Form.Label>
        <FormControl
          as="textarea"
          placeholder="Completion Reward..."
          aria-label="Completion Reward"
          value={completionReward}
          aria-describedby="basic-addon1"
          onChange={(evt) => setCompletionReward(evt.target.value)}
        />
        <Form.Text className="text-muted">
          Is the reward of the focus and will execute the effects inside for the
          country that did the focus.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formCompleteTooltip">
        <Form.Label>Complete Tooltip</Form.Label>
        <FormControl
          as="textarea"
          placeholder="Complete Tooltip..."
          aria-label="Complete Tooltip"
          value={completeTooltip}
          aria-describedby="basic-addon1"
          onChange={(evt) => setCompleteTooltip(evt.target.value)}
        />
        <Form.Text className="text-muted">
          Optional. If specified, will overwrite the tooltip (The completion
          reward shown to the player) of the reward with the effects inside. It
          is assumed that the focus was already done when the complete_tooltip
          is calculated.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formAiWillDo">
        <Form.Label>Ai Will Do</Form.Label>
        <FormControl
          as="textarea"
          placeholder="Ai Will Do..."
          aria-label="Ai Will Do"
          value={aiWillDo}
          aria-describedby="basic-addon1"
          onChange={(evt) => setAiWillDo(evt.target.value)}
        />
        <Form.Text className="text-muted">
          Will set the likelihood of the AI completing a focus. Defaults to one.
          If the focus is not at the start of a branch, the likelihood will
          increase by 50%. It will be proportionally reduced if the focus is
          mutually exclusive to another. It will be affected by focus_factor in
          AI strategy plans. The final percentage will be a number between 0 and
          the number you define.
        </Form.Text>
      </Form.Group>
    </Form>
  );
};

export default Mission;
