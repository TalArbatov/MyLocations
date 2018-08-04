import React from "react";
import Modal from "react-modal";
import { Button } from "react-materialize";
import GoogleMaps from '../../GoogleMaps/GoogleMaps';

const ViewMapModal = props => {
        return (
            <Modal
                isOpen={props.isOpen}
                onAfterOpen={props.afterOpenModal}
                onRequestClose={props.closeModal}
                contentLabel="Example Modal"
                style={customStyles}>
                <div>
                    <GoogleMaps coords={props.coords} changeLocation={false} type='view' coordsChange={() => {}}/>
                    <Button style={{marginTop: 10}} onClick={props.closeModal.bind(this, 'viewMapModal')}>Close</Button>
                </div>
            </Modal>
        );
};

export default ViewMapModal;

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