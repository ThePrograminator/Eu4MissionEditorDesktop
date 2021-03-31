import React, { useState } from "react";

import { Button, Spinner, Tooltip, OverlayTrigger } from "react-bootstrap";

import { FaFileImport } from "react-icons/fa";

const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    {props.toolTipText}
  </Tooltip>
);

const MissionTabButton = (props) => {
  const [id, setID] = useState(props.id);
  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={<Tooltip id="button-tooltip">{props.toolTipText}</Tooltip>}
    >
      <Button
        variant="primary"
        onClick={() => props.handleClick(props.id)}
        disabled={props.inProgress}
      >
        {props.inProgress ? (
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : (
          props.icon
        )}
      </Button>
    </OverlayTrigger>
  );
};

export default MissionTabButton;
//props.buttonText
