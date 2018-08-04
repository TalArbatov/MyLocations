import React from "react";
import { Navbar, NavItem } from "react-materialize";

const LocationNavbar = props => {
  const isSelected = props.isSelected;
  return (
    <Navbar fixed brand="My Locations" right>
      <NavItem disabled={true} onClick={props.add}>Add</NavItem>
      <NavItem onClick={isSelected ? props.remove : () => {}}>Remove</NavItem>
      <NavItem onClick={props.save}>Save</NavItem>
      <NavItem onClick={isSelected ? props.edit : () => {}}>Edit</NavItem>
      <NavItem onClick={isSelected ? props.view : () => {}}>View</NavItem>
      <NavItem onClick={isSelected ? props.map : () => {}}>View In Map</NavItem>
    </Navbar>
  );
};

export default LocationNavbar;
