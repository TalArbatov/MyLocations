import React from "react";
import { Input } from "react-materialize";
import cssStyles from './GroupOption.css';

const GroupOption = props => {
  return (
    <div className={cssStyles.toLeft}>
      <Input
        s={6}
        type="select"
        label="GROUP BY"
        defaultValue="1"
        onChange={props.selectChange}>
        <option>No Group</option>
        <option>Category</option>
      </Input>
    </div>
  );
};

export default GroupOption;