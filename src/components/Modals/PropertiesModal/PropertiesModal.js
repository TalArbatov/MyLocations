import React from "react";
import Modal from "react-modal";
import cssStyles from './PropertiesModal.css';

const PropertiesModal = props => {
  return (
    <Modal
      isOpen={props.isOpen}
      onAfterOpen={props.afterOpenModal}
      onRequestClose={props.closeModal}
      contentLabel="Example Modal"
      style={customStyles} >
      <div>
        <table className={' ' + cssStyles.table}>
          <thead></thead>
          <tbody>
            <tr>
              <th>Name: </th>
              <td>{props.location.name}</td>
            </tr>
            <tr>
              <th>Address: </th>
              <td>{props.location.address}</td>
            </tr>
            <tr>
              <th>Coords: </th>
              <td>{props.location.coordinates}</td>
            </tr>
            <tr>
              <th>Category: </th>
              <td>{props.location.category}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={props.closeModal.bind(this, 'propertiesModal')}>Close</button>
      </div>
    </Modal>
  );
};

export default PropertiesModal;

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


