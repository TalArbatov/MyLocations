import React, { Component } from "react";
import Modal from "react-modal";
import { Input } from "react-materialize";
import Map from '../../../../components/GoogleMaps/GoogleMaps';

class ViewMapModal extends Component {

    // if user does not enable Location, the default position
    // will focus on Jerusalem, Israel.
    state = {
        marker: {
            lat: 31.771886,
            lng: 35.289394
        }
    }
    // when component loads, navigator API will ask for permissions
    // to access location, if granted, it will change the default marker
    // locaion from Jerusalem to current location

    componentDidMount = () => {
        let marker = {
            lat: 31.771886,
            lng: 35.289394
        };
        if (window.navigator.geolocation)
            window.navigator.geolocation.getCurrentPosition(function (position) {
                marker = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            });
        this.setState({ marker });
        
    }

    markerChangeHandler = (e) => {
        console.log(e);
        const marker = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        }
        this.setState({marker})
        console.log(marker)
    }


    render() {

        return (
            <Modal
                isOpen={this.props.isOpen}
                onAfterOpen={this.props.afterOpenModal}
                onRequestClose={this.props.closeModal}
                contentLabel="Example Modal"
                style={customStyles}
            >
                <div>
                    <h1>MAP</h1>
                    <div id="map"></div>
                    <Map changeLocation={false}/>
                    {/* <ViewMap
                        marker={this.state.marker}
                        onClick={this.markerChangeHandler}

                        onMarkerChange={this.markerChangeHandler}
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBgMjtI_RinoSi85S-1p_1SBSPvF9F15_o&callback=initMap"
                        loadingElement={<div style={{ height: `100%`, width: '100%' }} />}
                        containerElement={<div style={{ height: `500px`, width: '500px' }} />}
                        mapElement={<div style={{ height: `100%`, width: '100%' }} />}

                    /> */}
                    <button onClick={this.props.closeModal.bind(this, 'viewMapModal')}>Close</button>
                </div>

            </Modal>
        );
    }
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
};
export default ViewMapModal;