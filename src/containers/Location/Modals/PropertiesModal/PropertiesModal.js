import React from "react";
import Modal from "react-modal";
import { Input } from "react-materialize";
const PropertiesModal = props => {



  return (
    <Modal
      isOpen={props.isOpen}
      onAfterOpen={props.afterOpenModal}
      onRequestClose={props.closeModal}
      contentLabel="Example Modal"
      style={customStyles}
    >
      <div>
       <p>hello</p>
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
export default PropertiesModal;
