import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "react-materialize";
import styles from "./Navigation.css";

class Navigation extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.children}</div>
        <div className={styles.footer2}>
          <ul>
            <li>
              <Link className={styles.navLink} to="/location">
                <div style={{'paddingTop':5}}>
                  <Icon small>location_on</Icon>
                </div>
              </Link>
            </li>
            <li>
              <Link className={styles.navLink} to="/category">
                <div style={{'paddingTop':5}}>
                  <Icon small>assignment</Icon>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Navigation;
