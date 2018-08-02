import React, { Component } from "react";
// import TopNavbar from "../TopNavbar/TopNavbar";
import LocationNavbar from './LocationNavbar/LocationNavbar';
import Modal from "react-modal";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { Input } from "react-materialize";
import LocationsList from "./LocationsList/LocationsList";
import LocationsOptions from "./LocationsOptions/LocationsOptions";
import LocationsGroups from "./LocationsGroups/LocationsGroups";
import LocationModal from './Modals/LocationModal/LocationModal';
import PropertiesModal from './Modals/PropertiesModal/PropertiesModal';
import ViewMapModal from './Modals/ViewMapModal/ViewMapModal';

Modal.setAppElement("#root");

class Location extends Component {
  state = {
    modalState: {
      addModal: false,
      editModal: false,
      propertiesModal: false,
      viewMapModal: false,
    },
    
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
    viewedLocation: {
      name: "",
      address: "",
      coordinates: "",
      category: ""
    },
    options: {
      sortBy: "",
      groupBy: ""
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
    const modalState = {...this.state.modalState};
    modalState.addModal = true;
    this.setState({modalState, newLocation });
  };
  removeHandler = () => {
    this.props.removeLocation();
  };
  closeModal = type => {
    const modalState = this.state.modalState;
    modalState[type] = false
    this.setState({ modalState });
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
    const modalState = {...this.state.modalState};
    modalState.editModal = true;
    this.setState({ modalState, updatedLocation: updatedLocation });
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

  sortOptionChange = e => {
    const options = this.state.options;
    options.sortBy = e.target.value;
    this.setState({ options });
    console.log(this.state.options);
    this.props.sortLocation(e.target.value);
  };
  groupOptionChange = e => {
    const options = this.state.options;
    options.groupBy = e.target.value;
    this.setState({ options });
    console.log(this.state.options);
    this.props.groupLocation(e.target.value);
  };


  viewHandler = () => {
    const viewedLocation = this.props.LocationReducer.locations.find(
      location => location.isSelected
    );
    this.setState({ modalState: {...this.state.modalState, propertiesModal: true}, viewedLocation});
  }

  viewMapHandler = () => {
    const viewedLocation = this.props.LocationReducer.locations.find(
      location => location.isSelected
    );
    this.setState({ modalState: {...this.state.modalState, viewMapModal: true}, viewedLocation});
  }

  render() {
    // const noLocations = <h1>No locations available.</h1>;
    return (
      <div style={{ "padding-bottom": "70px", }}>
        <LocationNavbar
          status="category"
          add={this.addHandler}
          remove={this.removeHandler}
          save={this.saveHandler}
          edit={this.editHandler}
          view={this.viewHandler}
          map={this.viewMapHandler}
        />
        <LocationsOptions
          sortOptionChange={this.sortOptionChange}
          groupOptionChange={this.groupOptionChange}
        />
      
        <LocationsGroups
          locationsByGroup={this.props.LocationReducer.locationsByGroup}
          selectLocationHandler={this.selectLocationHandler}
        />
      
        {/*MODALS*/}
        <LocationModal
          type='new'
          isOpen={this.state.modalState.addModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          newLocation={this.state.newLocation}
          categories={this.props.CategoryReducer.categories}
          newInputChange={this.newInputChange}
          addLocationHandler={this.addLocationHandler}
          closeModal={this.closeModal}
          changedNewSelect={this.changedNewSelect}
        />

        <LocationModal
          type='updated'
          isOpen={this.state.modalState.editModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          updatedLocation={this.state.updatedLocation}
          categories={this.props.CategoryReducer.categories}
          updatedInputChange={this.updatedInputChange}
          updateLocationHandler={this.props.updateLocation.bind(this, this.state.updatedLocation)}
          closeModal={this.closeModal}
          changedUpdatedSelect={this.changedUpdatedSelect}
        />

        <PropertiesModal
          isOpen={this.state.modalState.propertiesModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          closeModal={this.closeModal}
          location={this.state.viewedLocation}
        />

        <ViewMapModal 
           isOpen={this.state.modalState.viewMapModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          closeModal={this.closeModal}
          location={this.state.viewedLocation}
        />

       
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

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location);
