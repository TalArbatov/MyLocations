import React from "react";
import Modal from "react-modal";
import { Input, Row, Button } from "react-materialize";
import Map from '../../../../components/GoogleMaps/GoogleMaps';
//props => addModal / afterOpenModal / closeModal / newLocation / categories /
// addLocationHandler / changedNewSelect / newInputChange / type (new / updated)
import GoogleMaps from '../../../../components/GoogleMaps/GoogleMaps';
const LocationModal = props => {
  // console.log("props inside generic modal");
  // console.log(props);
  //the ADD and EDIT modal are alike, I created variables to store
  //the only differences between them and update them accordingly.

  let inputChange; // newInputChange || updatedInputChange
  let location; //newLocation || updatedLocation
  let locationHandler; //addLocationHandler || updateLocationHandler
  let changedSelect; //changeNewSelect || changeUpdatedSelect
  let coordsChange; // newCoordsChange || updatedCoordsChange
  let isValidated = false;
  if (props.type == "updated") {
    console.log("THIS IS A UPDATE MODAL");
    inputChange = "updatedInputChange";
    location = "updatedLocation";
    locationHandler = "updateLocationHandler";
    changedSelect = "changedUpdatedSelect";
    coordsChange = "updatedCoordsChange";
    isValidated = (props.updatedLocation.name !== '' && props.updatedLocation.address !== '')
  } else {
    //else type = 'new'
    console.log("THIS IS A NEW MODAL");

    inputChange = "newInputChange";
    location = "newLocation";
    changedSelect = "changedNewSelect";
    locationHandler = "addLocationHandler";
    coordsChange = "newCoordsChange";
    isValidated = (props.newLocation.name !== '' && props.newLocation.address !== '')
  }


  let title = props.type === 'updated' ? "Update Existing Location" : "Create new Location"
  return (
    <Modal
      isOpen={props.isOpen}
      onAfterOpen={props.afterOpenModal}
      onRequestClose={props.closeModal}
      contentLabel="Example Modal"
      style={customStyles}
    >
      <div>
        <h5 style={{fontWeight:'100'}}>{title}</h5>


        <Row>
          <Input
            s={6}
            label='Name'
            validate
            error={props[location].name === '' ? 'Please fill Name' : null}
            type="text"
            value={props[location].name}
            onChange={props[inputChange].bind(this, "name")}
          />

          <Input
            s={6}
            error={props[location].address === '' ? 'Please fill Address' : null}
            validate
            label={'Address'}
            value={props[location].address}
            onChange={props[inputChange].bind(this, "address")}
          />
        </Row>
        <div style={{ 'marginTop': '50px' }}>
          <label >Category</label>
        </div>
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

        <label >coordinates:</label>

        {props.type === 'updated'
          ? <Map coordsChange={props[coordsChange]} changeLocation={true} type={props.type} coords={props[location].coordinates} />
          : <Map coordsChange={props[coordsChange]} coords={props[location].coordinates} changeLocation={true} type={props.type} />}



        <input
          type="text"
          value={props[location].coordinates}
          disabled={true}
          onChange={props[inputChange].bind(this, "coordinates")}
        />

      </div>
      <br />
      {props.type === "updated" ? (
        <Button disabled={!isValidated} style={{marginRight: '10px'}} onClick={() => {props.updateLocationHandler(); props.closeModal('editModal')}}>EDIT</Button>
      ) : (
          <Button disabled={!isValidated} style={{marginRight: '10px'}} onClick={() => {props.addLocationHandler(); props.closeModal('addModal')}}>ADD</Button>
        )}
      {props.type === "updated" ? (
        <Button onClick={props.closeModal.bind(this, "editModal")}>
          close
        </Button>
      ) : (
          <Button onClick={props.closeModal.bind(this, "addModal")}>close</Button>
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
    maxHeight: '70vh',
    minWidth: '50vw',
    overflowY: 'scroll',
    transform: "translate(-50%, -50%)",
  }
};
export default LocationModal;
