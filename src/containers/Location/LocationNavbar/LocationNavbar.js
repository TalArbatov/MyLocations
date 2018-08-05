import React from "react";
import { Navbar, NavItem } from "react-materialize";

const LocationNavbar = props => {
  return (
    <Navbar brand="My Locations" right>
      <NavItem disabled={true} onClick={props.add}>Add</NavItem>
      <NavItem onClick={props.isSelected ? props.remove : () => {}}>Remove</NavItem>
      {/* <NavItem onClick={props.save}>Save</NavItem> */}
      <NavItem onClick={props.isSelected ? props.edit : () => {}}>Edit</NavItem>
      <NavItem onClick={props.isSelected ? props.view : () => {}}>View</NavItem>
      <NavItem onClick={props.isSelected ? props.map : () => {}}>View In Map</NavItem>
    </Navbar>
  );
};

export default LocationNavbar;
