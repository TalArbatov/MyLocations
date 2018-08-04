import React from 'react';
import {Navbar, NavItem} from 'react-materialize';

export default props => {
    return(
        <Navbar brand="My Locations" right>
        <NavItem onClick={props.add} >Add</NavItem>
        <NavItem onClick={props.remove} >Remove</NavItem>
        <NavItem onClick={props.save} >Save</NavItem>
        <NavItem onClick={props.edit} >Edit</NavItem>
      </Navbar>
    )
}