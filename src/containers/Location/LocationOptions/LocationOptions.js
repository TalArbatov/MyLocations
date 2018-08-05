import React from "react";
import SortOption from "./SortOption/SortOption";
import GroupOption from "./GroupOption/GroupOption";
import cssStyles from './LocationOptions.css';

const LocationOptions = props => {
  return (
    <div className={cssStyles.wrapper}>
      <GroupOption selectChange={props.groupOptionChange} />
      <SortOption selectChange={props.sortOptionChange} />
    </div>
  );
};

export default LocationOptions;