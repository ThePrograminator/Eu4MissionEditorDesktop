import React from "react";
import { Tooltip } from "react-bootstrap";

const RenderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props} style={{ minWidth: "250px" }}>
    {props.text}
  </Tooltip>
);
export default RenderTooltip;
