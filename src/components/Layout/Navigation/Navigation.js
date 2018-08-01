import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  NavItem,
  Navbar,
  Button,
  Icon,
  Footer,
  Modal
} from "react-materialize";
import styles from "./Navigation.css";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";

class Navigation extends React.Component {
 
    

  render() {
    return (
      <div>
       
        <div>{this.props.children}</div>

        <div className={styles.footer}>
          <Link to="/location">
            <Button waves="light">
              Location<Icon left>location_on</Icon>
            </Button>
          </Link>
          <Link to="/category">
            <Button waves="light">
              Category<Icon left>category</Icon>
            </Button>
          </Link>
        </div>

      
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    CategoryReducer: state.CategoryReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncrement: () => {
      return dispatch({
        type: actions.INC_COUNTER
      });
    },
    onDecrement: () => {
      return dispatch({
        type: actions.DEC_COUNTER
      });
    }
  };
};

export default Navigation;