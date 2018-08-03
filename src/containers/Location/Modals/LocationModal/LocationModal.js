import React from "react";
import Modal from "react-modal";
import { Input } from "react-materialize";
import ViewMap from '../ViewMapModal/ViewMap/ViewMap';
//props => addModal / afterOpenModal / closeModal / newLocation / categories /
// addLocationHandler / changedNewSelect / newInputChange / type (new / updated)

const LocationModal = props => {
  // console.log("props inside generic modal");
  // console.log(props);
  //the ADD and EDIT modal are alike, I created variables to store
  //the only differences between them and update them accordingly.

  let inputChange; // newInputChange || updatedInputChange
  let location; //newLocation || updatedLocation
  let locationHandler; //addLocationHandler || updateLocationHandler
  let changedSelect; //changeNewSelect || changeUpdatedSelect
  if (props.type == "updated") {
    console.log("THIS IS A UPDATE MODAL");
    inputChange = "updatedInputChange";
    location = "updatedLocation";
    locationHandler = "updateLocationHandler";
    changedSelect = "changedUpdatedSelect";
  } else {
    //else type = 'new'
    console.log("THIS IS A NEW MODAL");

    inputChange = "newInputChange";
    location = "newLocation";
    changedSelect = "changedNewSelect";
    locationHandler = "addLocationHandler";
  }
  return (
    <Modal
      isOpen={props.isOpen}
      onAfterOpen={props.afterOpenModal}
      onRequestClose={props.closeModal}
      contentLabel="Example Modal"
      style={customStyles}
    >
      <div>
        {props.type == "updated" ? <p>UPDATE</p> : <p>NEW</p>}

        <label>Name:</label>

        <input
          type="text"
          value={props[location].name}
          onChange={props[inputChange].bind(this, "name")}
        />
        <label>Address:</label>
        <input
          type="text"
          value={props[location].address}
          onChange={props[inputChange].bind(this, "address")}
        />
        <label>coordinates:</label>
        <ViewMap />
        <input
          type="text"
          value={props[location].coordinates}
          onChange={props[inputChange].bind(this, "coordinates")}
        />
        <label>category:</label>
        <Input
          type="select"
          onChange={props[changedSelect]}
          defaultValue={props[location].category}
        >
        <option disabled="disabled">Choose Category:</option>
          {props.categories.map((category, index) => {
            
            return <option key={index}>{category.name}</option>;
          })}
        </Input>
      </div>
      <br />
      {props.type == "updated" ? (
        <button onClick={props.updateLocationHandler}>EDIT</button>
      ) : (
        <button onClick={props.addLocationHandler}>ADD</button>
      )}
      {props.type == "updated" ? (
        <button onClick={props.closeModal.bind(this, "editModal")}>
          close
        </button>
      ) : (
        <button onClick={props.closeModal.bind(this, "addModal")}>close</button>
      )}
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
export default LocationModal;
