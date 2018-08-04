import React from 'react';
import { Navbar, NavItem } from 'react-materialize';

const TopNavbar = props => {
    const isSelected = props.isSelected;
    return (
        <Navbar brand="My Locations" right>
            <NavItem onClick={props.add} >Add</NavItem>
            <NavItem onClick={isSelected ? props.remove : () => {}} >Remove</NavItem>
            <NavItem onClick={props.save} >Save</NavItem>
            <NavItem onClick={isSelected ? props.edit : () => {}} >Edit</NavItem>
        </Navbar>
    );
}

export default TopNavbar;