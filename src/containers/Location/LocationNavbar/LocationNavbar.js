import React from "react";
import { Navbar, NavItem } from "react-materialize";

const LocationNavbar = props => {
  return (
    <Navbar fixed brand="My Locations" right>
      <NavItem disabled={true} onClick={props.add}>Add</NavItem>
      <NavItem onClick={props.remove}>Remove</NavItem>
      <NavItem onClick={props.save}>Save</NavItem>
      <NavItem onClick={props.edit}>Edit</NavItem>
      <NavItem onClick={props.view}>View</NavItem>
      <NavItem onClick={props.map}>View In Map</NavItem>

      <NavItem href="/counter">
        {/* <Button waves='light'>EDIT ME<Icon>save</Icon></Button> */}
        Counter
      </NavItem>
    </Navbar>
  );
};

export default LocationNavbar;
