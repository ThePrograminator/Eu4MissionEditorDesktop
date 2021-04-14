import React from "react";

import { Row } from "react-bootstrap";

const UpdateBodyText = (props) => {
  const childrenWithProps = React.Children.map(props.children, (child) => {
    // checking isValidElement is the safe way and avoids a typescript error too
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ...props });
    }
    return child;
  });

  return (
    <Row
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "100%",
      }}
    >
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "100%",
        }}
      >
        <h2>{props.title}</h2>
      </Row>
      {childrenWithProps}
    </Row>
  );
};

export default UpdateBodyText;
