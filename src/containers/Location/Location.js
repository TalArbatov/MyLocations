import React, { Component } from "react";
import TopNavbar from "../TopNavbar/TopNavbar";
import Modal from "react-modal";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { Input, Row } from "react-materialize";
import LocationsList from "./LocationsList/LocationsList";
import LocationsOptions from './LocationsOptions/LocationsOptions';

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class Location extends Component {
  state = {
    addModal: false,
    editModal: false,
    newLocation: {
      name: "",
      address: "",
      coordinates: "",
      category: ""
    },
    updatedLocation: {
      name: "",
      address: "",
      coordinates: "",
      category: ""
    },
    options: {
      sortBy: '',
      groupBy: '',
    }
  };

  componentWillMount() {
    //const allCategories = JSON.parse(localStorage.categories);
    //const allLocations = JSON.parse(localStorage.locations);
    this.props.getLocations();
    this.props.getCategories();
    console.log(this.props);
  }
  //   componentWillUpdate() {
  //       this.props.saveCategories();
  //   }

  addHandler = () => {
    console.log("add category");
    const newLocation = { ...this.state.newLocation };
    newLocation.category = this.props.CategoryReducer.categories[0].name;
    this.setState({ addModal: true, newLocation });
  };
  removeHandler = () => {
    this.props.removeLocation();
  };
  closeModal = type => {
    this.setState({ [type]: false });
  };
  //   inputChange = (type, e) => {
  //     const x = { ...this.state[type] };
  //     x.name = e.target.value;
  //     this.setState({ [type]: x });
  //     console.log(this.state);
  //   };

  addLocationHandler = () => {
    this.props.addLocation(this.state.newLocation);
  };

  saveHandler = () => {
    this.props.saveLocations();
  };

  selectLocationHandler = name => {
    this.props.selectLocation(name);
  };

  editHandler = () => {
    //const updatedLocation = this.state.updatedLocation;
    const updatedLocation = this.props.LocationReducer.locations.find(
      location => location.isSelected
    );
    this.setState({ editModal: true, updatedLocation: updatedLocation });
    //console.log(this.props)
    console.log(updatedLocation);
    console.log(this.state);
  };

  // INPUT onChange SECTION

  changedNewSelect = e => {
    const newLocation = { ...this.state.newLocation };
    newLocation.category = e.target.value;
    this.setState({ newLocation });
  };

  changedUpdatedSelect = e => {
    const updatedLocation = { ...this.state.updatedLocation };
    updatedLocation.category = e.target.value;
    console.log(this.state.updatedLocation);
    this.setState({ updatedLocation });
    console.log(this.state.updatedLocation);
  };

  newInputChange = (type, e) => {
    const newLocation = this.state.newLocation;
    newLocation[type] = e.target.value;
    this.setState({ newLocation });
    console.log(this.state);
  };

  updatedInputChange = (type, e) => {
    const updatedLocation = this.state.updatedLocation;
    updatedLocation[type] = e.target.value;
    this.setState({ updatedLocation });
    console.log(this.state);
  };

  // when user re-selects option in group-by/sort-by

  // selectChangeHandler = (type, e) => {
  //   const options = this.state.options;
  //   options[type] = e.target.value;
  //   this.setState({options});
  //   console.log(this.state.options);
  // }
  sortOptionChange = e => {
    const options = this.state.options;
    options.sortBy = e.target.value;
    this.setState({options});
    console.log(this.state.options);
    this.props.sortLocation(e.target.value);
  }
  groupOptionChange = e => {
    const options = this.state.options;
    options.groupBy = e.target.value;
    this.setState({options});
    console.log(this.state.options);
    this.props.groupLocation(e.target.value);
  }
  render() {
    // const noLocations = <h1>No locations available.</h1>;
    return (
      <div>
        <TopNavbar
          status="category"
          add={this.addHandler}
          remove={this.removeHandler}
          save={this.saveHandler}
          edit={this.editHandler}
        />
        <LocationsOptions sortOptionChange={this.sortOptionChange} groupOptionChange={this.groupOptionChange}/>
        <LocationsList
          locations={this.props.LocationReducer.locations}
          locationsByGroup={this.props.LocationReducer.locationsByGroup}
          selectLocationHandler={this.selectLocationHandler}
          
        />
        {/* {this.props.LocationReducer.locations.length === 0 ||
        this.props.LocationReducer.locations == undefined ? (
          noLocations
        ) : (
          <table>
            <thead />
            <tbody>
              {this.props.LocationReducer.locations.map((location, index) => {
                let style = { background: "transparent" };
                if (location.isSelected) style.background = "blue";
                return (
                  <tr
                    style={style}
                    key={index}
                    onClick={this.selectLocationHandler.bind(
                      this,
                      location.name
                    )}
                  >
                    <td>{index}</td>
                    <td>{location.name}</td>
                    <td>{location.address}</td>
                    <td>{location.coordinates}</td>
                    <td>{location.category}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )} */}

        {/*MODALS*/}
        <Modal
          isOpen={this.state.addModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          style={customStyles}
        >
          <div>
            <p>ADD</p>

            <label>Name:</label>
            <input
              type="text"
              value={this.state.newLocation.name}
              onChange={this.newInputChange.bind(this, "name")}
            />
            <label>Address:</label>
            <input
              type="text"
              value={this.state.newLocation.address}
              onChange={this.newInputChange.bind(this, "address")}
            />
            <label>coordinates:</label>
            <input
              type="text"
              value={this.state.newLocation.coordinates}
              onChange={this.newInputChange.bind(this, "coordinates")}
            />
            <label>category:</label>
            <Input
              type="select"
              onChange={this.changedNewSelect}
              defaultValue={this.state.newLocation.category}
            >
              {this.props.CategoryReducer.categories.map((category, index) => {
                <option disabled="disabled">Choose Category:</option>;
                return <option key={index}>{category.name}</option>;
              })}
            </Input>
          </div>
          <br />
          <button onClick={this.addLocationHandler}>Add</button>
          <button onClick={this.closeModal.bind(this, "addModal")}>
            close
          </button>
        </Modal>

        <Modal
          isOpen={this.state.editModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          style={customStyles}
        >
          <div>
            <p>EDIT</p>

            <label>Name:</label>
            <input
              type="text"
              value={this.state.updatedLocation.name}
              onChange={this.updatedInputChange.bind(this, "name")}
            />
            <label>Address:</label>
            <input
              type="text"
              value={this.state.updatedLocation.address}
              onChange={this.updatedInputChange.bind(this, "address")}
            />
            <label>coordinates:</label>
            <input
              type="text"
              value={this.state.updatedLocation.coordinates}
              onChange={this.updatedInputChange.bind(this, "coordinates")}
            />
            <label>category:</label>
            <Input
              type="select"
              onChange={this.changedUpdatedSelect}
              value={this.state.updatedLocation.category}
            >
              {this.props.CategoryReducer.categories.map((category, index) => {
                return <option key={index}>{category.name}</option>;
              })}
            </Input>
          </div>
          <button
            onClick={this.props.updateLocation.bind(
              this,
              this.state.updatedLocation
            )}
          >
            Edit
          </button>
          <button onClick={this.closeModal.bind(this, "editModal")}>
            close
          </button>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    LocationReducer: state.LocationReducer,
    CategoryReducer: state.CategoryReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addLocation: name => {
      return dispatch({
        type: actions.ADD_LOCATION,
        payload: {
          name: name
        }
      });
    },
    getLocations: () => {
      return dispatch({
        type: actions.GET_LOCATIONS
      });
    },
    getCategories: () => {
      return dispatch({
        type: actions.GET_CATEGORIES
      });
    },
    saveLocations: () => {
      return dispatch({
        type: actions.SAVE_LOCATIONS
      });
    },
    selectLocation: name => {
      return dispatch({
        type: actions.SELECT_LOCATION,
        payload: {
          name
        }
      });
    },
    removeLocation: () => {
      return dispatch({
        type: actions.REMOVE_LOCATION
      });
    },
    updateLocation: location => {
      console.log("updated location in dispatch");
      console.log(location);
      return dispatch({
        type: actions.UPDATE_LOCATION,
        payload: {
          location
        }
      });
    },
    addLocation: location => {
      return dispatch({
        type: actions.ADD_LOCATION,
        payload: {
          location
        }
      });
    },
    sortLocation: sortType => {
      return dispatch({
        type: actions.SORT_LOCATIONS,
        payload: {
          sortType
        }
      });
    },
    groupLocation: groupType => {
      return dispatch({
        type: actions.GROUP_LOCATIONS,
        payload: {
          groupType
        }
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location);
