import React from "react";
import { Input, Row } from "react-materialize";

export default props => {
  return (
    <Row>
      <Input s={4} type="select" label="GROUP BY" defaultValue="1" onChange={props.selectChange}>
        <option>No Group</option>
        <option>Category</option>
      </Input>
    </Row>
  );
};
