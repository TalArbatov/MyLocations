import React from "react";
import { Input } from "react-materialize";
import cssStyles from './SortOption.css';

export default props => {
  return (
    <div className={cssStyles.toRight}>
        <Input
          s={8}
          type="select"
          label="SORT BY"
          defaultValue="1"
          onChange={props.selectChange}
        >
          <option>No sort</option>
          <option>Alphabetical order</option>
          <option>Alphabetical order (reverse)</option>
        </Input>
    </div>
  );
};
