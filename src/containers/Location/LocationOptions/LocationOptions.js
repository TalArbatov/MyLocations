import React from "react";
import SortOption from "./SortOption/SortOption";
import GroupOption from "./GroupOption/GroupOption";

const LocationOptions = props => {
  return (
    <div>
      <GroupOption selectChange={props.groupOptionChange} />
      <SortOption selectChange={props.sortOptionChange} />
    </div>
  );
};

export default LocationOptions;