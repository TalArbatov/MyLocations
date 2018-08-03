import React from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"

const GoogleMaps = withScriptjs(withGoogleMap((props) => {
    return (
        <div style={{ width: '90%', textAlign: 'center' }}>
            <GoogleMap
                onClick={props.onClick}
                defaultZoom={8}
                defaultCenter={{ lat: props.marker.lat, lng: props.marker.lng }}
            >
                <Marker draggable={true} position={{ lat: props.marker.lat, lng: props.marker.lng }} />
            </GoogleMap>
        </div>

    );
}));

export default GoogleMaps;