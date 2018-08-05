import React, { Component } from "react";
import LocationNavbar from './LocationNavbar/LocationNavbar';
import Modal from "react-modal";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import LocationOptions from "./LocationOptions/LocationOptions";
import LocationGroups from "./LocationGroups/LocationGroups";
import LocationModal from '../../components/Modals/LocationModal/LocationModal';
import PropertiesModal from '../../components/Modals/PropertiesModal/PropertiesModal';
import ViewMapModal from '../../components/Modals/ViewMapModal/ViewMapModal';

Modal.setAppElement("#root");

class Location extends Component {
  state = {
    isSelected: false,
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
    this.props.getLocations();
    this.props.getCategories();

  }
  addHandler = () => {
    const newLocation = { ...this.state.newLocation };
    // the default coordinates (in-case user reject location permission request) in Jerusalem, Israel
    newLocation.coordinates = '31.771886, 35.289394';
    // the default Category is the first.
    newLocation.category = this.props.CategoryReducer.categories[0].name;
    const modalState = { ...this.state.modalState };
    modalState.addModal = true;
    this.setState({ modalState, newLocation });
  };

  removeHandler = () => {
    this.props.removeLocation();
  };

  closeModal = type => {
    const modalState = this.state.modalState;
    modalState[type] = false
    this.setState({ modalState });
  };

  locationHandler = locationType => {
    if (locationType === 'new') {
      this.props.addLocation(this.state.newLocation);
      this.saveHandler();
      this.closeModal('addModal');
      const newLocation = {
        name: "",
        address: "",
        coordinates: "",
        category: ""
      };
      this.setState({newLocation})
    }
    else { //locationType === 'updated'
      this.props.updateLocation(this.state.updatedLocation);
      this.closeModal('editModal')
    }
  };

  saveHandler = () => {
    this.props.saveLocations();
  };

  selectLocationHandler = name => {
    this.props.selectLocation(name);
    this.setState({isSelected: true})
    // device vibrates on location select
    window.navigator.vibrate(200);
  };

  editHandler = () => {
    const updatedLocation = this.props.LocationReducer.locations.find(
      location => location.isSelected);
    const modalState = { ...this.state.modalState };
    modalState.editModal = true;
    this.setState({ modalState, updatedLocation: updatedLocation });
  };

  onSelectChange = (locationType, e) => {
    if (locationType === 'new') {
      const newLocation = { ...this.state.newLocation };
      newLocation.category = e.target.value;
      this.setState({ newLocation });
    }
    else { // locationType === 'updated'
      const updatedLocation = { ...this.state.updatedLocation };
      updatedLocation.category = e.target.value;
      this.setState({ updatedLocation });
    }
  }

  onInputChange = (locationType, inputType, event) => {
    if (locationType === 'new') {
      const newLocation = this.state.newLocation;
      newLocation[inputType] = event.target.value;
      this.setState({ newLocation });
    }
    else { //locationType === 'updated'
      const updatedLocation = this.state.updatedLocation;
      updatedLocation[inputType] = event.target.value;
      this.setState({ updatedLocation });
    }
  }

  /* 
  * marker - object that represents latLng coords
  * type - represents the type of location coords to change (viewedLocation / newLocation / updatedLocation)
  */
  onCoordsChange = (type, marker) => {
    const latlng = `${marker.lat}, ${marker.lng}`;
    if (type === 'new') {
      const newLocation = this.state.newLocation;
      newLocation.coordinates = latlng;
      this.setState({ newLocation });
    }
    else { //type === 'updated') 
      const updatedLocation = this.state.updatedLocation;
      updatedLocation.coordinates = latlng;
      this.setState({ updatedLocation });
    }
  }

  // when user re-selects option in group-by/sort-by
  sortOptionChange = e => {
    const options = this.state.options;
    options.sortBy = e.target.value;
    this.setState({ options });
    this.props.sortLocation(e.target.value);
  };
  groupOptionChange = e => {
    const options = this.state.options;
    options.groupBy = e.target.value;
    this.setState({ options });
    this.props.groupLocation(e.target.value);
  };


  viewHandler = () => {
    const viewedLocation = this.props.LocationReducer.locations.find(
      location => location.isSelected
    );
    this.setState({ modalState: { ...this.state.modalState, propertiesModal: true }, viewedLocation });
  }

  viewMapHandler = () => {
    const viewedLocation = this.props.LocationReducer.locations.find(
      location => location.isSelected
    );
    this.setState({ modalState: { ...this.state.modalState, viewMapModal: true }, viewedLocation });
  }

  render() {
    return[
      
        <LocationNavbar
          status="category"
          add={this.addHandler}
          remove={this.removeHandler}
          save={this.saveHandler}
          edit={this.editHandler}
          view={this.viewHandler}
          map={this.viewMapHandler}
          isSelected={this.state.isSelected} />,
<div>
        <LocationOptions
          sortOptionChange={this.sortOptionChange}
          groupOptionChange={this.groupOptionChange} />


        <LocationGroups
          locationsByGroup={this.props.LocationReducer.locationsByGroup}
          selectLocationHandler={this.selectLocationHandler} />

        {/*MODALS*/}
        <LocationModal
          type='new'
          isOpen={this.state.modalState.addModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          location={this.state.newLocation}
          categories={this.props.CategoryReducer.categories}
          locationHandler={this.locationHandler}
          closeModal={this.closeModal}
          onCoordsChange={this.onCoordsChange}
          onInputChange={this.onInputChange}
          onSelectChange={this.onSelectChange} />

        <LocationModal
          type='updated'
          isOpen={this.state.modalState.editModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          location={this.state.updatedLocation}
          categories={this.props.CategoryReducer.categories}
          locationHandler={this.locationHandler}
          closeModal={this.closeModal}
          onCoordsChange={this.onCoordsChange}
          onInputChange={this.onInputChange}
          onSelectChange={this.onSelectChange} />

        <PropertiesModal
          isOpen={this.state.modalState.propertiesModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          closeModal={this.closeModal}
          location={this.state.viewedLocation} />

        <ViewMapModal
          type='view'
          coords={this.state.viewedLocation.coordinates}
          isOpen={this.state.modalState.viewMapModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          closeModal={this.closeModal}
          location={this.state.viewedLocation} />
      </div>];
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
        payload: { name }
      });
    },
    removeLocation: () => {
      return dispatch({
        type: actions.REMOVE_LOCATION
      });
    },
    updateLocation: location => {
      return dispatch({
        type: actions.UPDATE_LOCATION,
        payload: { location }
      });
    },
    addLocation: location => {
      return dispatch({
        type: actions.ADD_LOCATION,
        payload: { location }
      });
    },
    sortLocation: sortType => {
      return dispatch({
        type: actions.SORT_LOCATIONS,
        payload: { sortType }
      });
    },
    groupLocation: groupType => {
      return dispatch({
        type: actions.GROUP_LOCATIONS,
        payload: { groupType }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Location);
