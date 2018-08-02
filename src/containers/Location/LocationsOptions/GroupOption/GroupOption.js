import React from "react";
import { Input, Row } from "react-materialize";
import cssStyles from './GroupOption.css';

export default props => {
  return (
    <div className={cssStyles.toLeft}>
        <Input
          s={4}
          type="select"
          label="GROUP BY"
          defaultValue="1"
          onChange={props.selectChange}
        >
          <option>No Group</option>
          <option>Category</option>
        </Input>
    </div>
  );
};
