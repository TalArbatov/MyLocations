import React from "react";
import Modal from "react-modal";
import { Input } from "react-materialize";
import ViewMap from './ViewMap/ViewMap';

const ViewMapModal = props => {

    // var map;
    // function initMap() {
    //     map = new google.maps.Map(document.getElementById('map'), {
    //         center: { lat: -34.397, lng: 150.644 },
    //         zoom: 8
    //     });
    // }


    return (
        <Modal
            isOpen={props.isOpen}
            onAfterOpen={props.afterOpenModal}
            onRequestClose={props.closeModal}
            contentLabel="Example Modal"
            style={customStyles}
        >
            <div>
                <h1>MAP</h1>
                <div id="map"></div>
                <ViewMap
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}

                />
                <button onClick={props.closeModal.bind(this, 'viewMapModal')}>Close</button>
            </div>

        </Modal>
    );
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
