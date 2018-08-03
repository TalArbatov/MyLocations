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
        if (this.props.changeLocation) {
            console.log(e);
            const newMarker = {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            }
            this.setState({ marker: newMarker })
            console.log('markerChangeHadnler GLOBAL MARKER');
        }
        this.props.coordsChange(this.state.marker)
    }


    render() {
        
        let marker = {};
        console.log('TYPE');
        console.log(this.props.type)
        console.log('COORDS');
        console.log(this.props.coords);
        
        if (this.props.type === 'view' || this.props.type === 'updated') {
            let [lat, lng] = this.props.coords.replace(' ', '').split(',');
            marker = {
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            }
        }
        else if (this.props.type === 'new') {
            marker = {
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
        }
        else {
            //this.props.type === 'updated' {

        }

        if (this.props.type === 'new') {
            return (

                <Map
                    marker={this.state.marker}
                    onClick={this.markerChangeHandler}

                    onMarkerChange={this.markerChangeHandler}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBgMjtI_RinoSi85S-1p_1SBSPvF9F15_o&callback=initMap"
                    loadingElement={< div style={{ height: `100%`, width: '100%' }} />}
                    containerElement={< div style={{ height: `500px`, width: '500px' }} />}
                    mapElement={< div style={{ height: `100%`, width: '100%' }} />}

                />
            );
        }
        else {
            return (

                <Map
                    marker={marker}
                    onClick={this.markerChangeHandler}

                    onMarkerChange={this.markerChangeHandler}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBgMjtI_RinoSi85S-1p_1SBSPvF9F15_o&callback=initMap"
                    loadingElement={< div style={{ height: `100%`, width: '100%' }} />}
                    containerElement={< div style={{ height: `500px`, width: '500px' }} />}
                    mapElement={< div style={{ height: `100%`, width: '100%' }} />}

                />
            );
        }

    }
}