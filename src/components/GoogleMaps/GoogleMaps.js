import React, { Component } from 'react';
import Map from './Map/Map';

export default class GoogleMaps extends Component {

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
            <Map
            marker={this.state.marker}
            onClick={this.markerChangeHandler}

            onMarkerChange={this.markerChangeHandler}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBgMjtI_RinoSi85S-1p_1SBSPvF9F15_o&callback=initMap"
            loadingElement={<div style={{ height: `100%`, width: '100%' }} />}
            containerElement={<div style={{ height: `500px`, width: '500px' }} />}
            mapElement={<div style={{ height: `100%`, width: '100%' }} />}

        />
        );
    }
}