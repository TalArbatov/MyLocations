import React from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"

const ViewMap = withScriptjs(withGoogleMap((props) => {
    return (
        <div>
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: -34.397, lng: 150.644 }}
            >
                {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
            </GoogleMap>
        </div>
    )
}));

export default ViewMap;