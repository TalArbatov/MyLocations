import React from "react";
import { Navbar } from "react-materialize";
import cssStyles from "./TopNavbar.css";

const TopNavbar = props => {
  return (
    <div className={" " + cssStyles.navbar}>
      <Navbar brand="My Locations" />
    </div>
  );
};

export default TopNavbar;
