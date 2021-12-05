import React, { memo } from "react";

import { Handle } from "react-flow-renderer";

export default memo(({ data, isConnectable }) => {
  return (
    <>
      <Handle
        type="target"
        position="left"
        id="leftExclusive"
        style={{ background: "#00A86B" }}
        isValidConnection={(connection) =>
          connection.sourceHandle === "rightExclusive"
        }
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position="top"
        id="topExclusive"
        isValidConnection={(connection) => connection.sourceHandle === "bottomExclusive"}
        isConnectable={isConnectable}
      />
      {data.label}
      <Handle
        type="source"
        position="bottom"
        id="bottomExclusive"
        isValidConnection={(connection) => connection.targetHandle === "topExclusive"}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position="right"
        id="rightExclusive"
        style={{ background: "#00A86B" }}
        isValidConnection={(connection) =>
          connection.targetHandle === "leftExclusive"
        }
        isConnectable={isConnectable}
      />
    </>
  );
});
