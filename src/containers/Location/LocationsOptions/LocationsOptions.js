import React from "react";
import SortOption from "./SortOption/SortOption";
import GroupOption from "./GroupOption/GroupOption";

export default props => {
  return (
    <div>
      <GroupOption selectChange={props.groupOptionChange} />
      <SortOption selectChange={props.sortOptionChange} />
    </div>
  );
};
