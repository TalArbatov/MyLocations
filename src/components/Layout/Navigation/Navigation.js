import React from "react";
import { Link } from "react-router-dom";
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
                Location
              </Link>
            </li>
            <li>
              <Link className={styles.navLink} to="/category">
              Category
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Navigation;
