import React from "react";
import { Link } from "react-router-dom";
import {
  NavItem,
  Navbar,
  Tabs,
  Tab,
  Button,
  Icon,
  Footer,
  Modal
} from "react-materialize";
import styles from "./Navigation.css";
import * as actions from "../../../store/actions";

class Navigation extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.children}</div>

        {/* <Tabs className="tab-demo z-depth-1">
          <Tab title="Test 1">Test 1</Tab>
          <Tab title="Test 2" active>
            Test 2
          </Tab>
        </Tabs> */}

        {/*BOTTOM NAVBAR*/}

        {/* <div className={styles.footer}>
          <Link className={styles.navLink} to="/location">
            <Button waves="light">
              Location<Icon left>location_on</Icon>
            </Button>
          </Link>
          <Link className={styles.navLink} to="/category">
            <Button waves="light">
              Category<Icon left>category</Icon>
            </Button>
          </Link>  
        </div> */}

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
