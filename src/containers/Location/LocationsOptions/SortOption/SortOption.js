import React from "react";
import { Input, Row } from "react-materialize";

export default props => {
  return (
    <Row>
      <Input s={4} type="select" label="SORT BY" defaultValue="1" onChange={props.selectChange}>
        <option >No sort</option>
        <option >Alphabetical order</option>
        <option >Alphabetical order (reverse)</option>

      </Input>
    </Row>
  );
};
