import React, { Component } from 'react';
import Map from './Map/Map';
import cssStyles from './GoogleMaps.css';

export default class GoogleMaps extends Component {
    // if user does not enable Location, the default position
    // will focus on Jerusalem, Israel.
    state = {
        marker: {
            lat: 31.771886,
            lng: 35.289394
        }
    }
    mapStyle = this.props.type === 'updated' ? cssStyles.updatedMap : cssStyles.viewedMap;
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

    markerChangeHandler = e => {
        if (this.props.changeLocation) {
            const newMarker = {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            }
            this.setState({ marker: newMarker })
        }
        this.props.coordsChange(this.state.marker)
    }

    render() {
        let marker = {};
        if (this.props.type === 'new') {
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
            return (
                <Map
                    marker={this.state.marker}
                    onClick={this.markerChangeHandler}
                    onMarkerChange={this.markerChangeHandler}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCGNQD1Gdkz0i_1tIGLKP0dJ0mOC9U6ZO8&callback=initMap"
                    loadingElement={< div style={{ height: `100%`, width: '100%' }} />}
                    containerElement={< div style={{ height: `500px`, width: '100%', textAlign: 'center' }} />}
                    mapElement={< div style={{ height: `100%`, width: '100%' }} />} />
            );
        }
        else { // this.props === 'viewed' || 'updated'
            let [lat, lng] = this.props.coords.replace(' ', '').split(',');
            marker = {
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            }
            return (
                <Map
                    marker={marker}
                    onClick={this.markerChangeHandler}
                    onMarkerChange={this.markerChangeHandler}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCGNQD1Gdkz0i_1tIGLKP0dJ0mOC9U6ZO8&callback=initMap"
                    loadingElement={< div style={{ height: `100%`, width: '100%' }} />}
                    containerElement={< div className={this.mapStyle} />}
                    mapElement={< div style={{ height: `100%`, width: '100%' }} />} />
            );
        }
    }
}