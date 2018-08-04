import React from "react";
import Modal from "react-modal";
import { Input, Row, Button } from "react-materialize";
import Map from '../../../../components/GoogleMaps/GoogleMaps';


const LocationModal = props => {

  const isValidated = (props.location.name !== '' && props.location.address !== '')
  const submitButtonText = props.type === 'updated' ? 'Edit' : 'Add'
  const closeButtonAction = props.type === 'updated' ? 'editModal' : 'addModal'
  const title = props.type === 'updated' ? "Update Existing Location" : "Create new Location";

  return (
    <Modal
      isOpen={props.isOpen}
      onAfterOpen={props.afterOpenModal}
      onRequestClose={props.closeModal}
      contentLabel="Example Modal"
      style={customStyles}>

      <div>
        <h5 style={{ fontWeight: '100' }}> {title} </h5>
        <Row>
          <Input
            s={6}
            label='Name'
            validate
            error={props.location.name === '' ? 'Please fill Name' : null}
            type="text"
            value={props.location.name}
            onChange={props.onInputChange.bind(this, props.type, 'name')} />
          <Input
            s={6}
            error={props.location.address === '' ? 'Please fill Address' : null}
            validate
            label={'Address'}
            value={props.location.address}
            onChange={props.onInputChange.bind(this, props.type, "address")} />
        </Row>

        <div style={{ 'marginTop': '50px' }}>
          <label>Category</label>
        </div>

        <Input
          type="select"
          onChange={props.onSelectChange.bind(this, props.type)}
          defaultValue={props.location.category}>
          <option disabled="disabled">Choose Category:</option>
          {props.categories.map((category, index) => {
            return <option key={index}>{category.name}</option>;
          })}
        </Input>

        <label>coordinates:</label>
        <Map coordsChange={props.onCoordsChange.bind(this, props.type)} changeLocation={true} type={props.type} coords={props.location.coordinates} />
        <input
          type="text"
          value={props.location.coordinates}
          disabled={true} />

      </div>
      <br />
      <Button disabled={!isValidated} style={{ marginRight: '10px' }} onClick={props.locationHandler.bind(this, props.type)}>{submitButtonText}</Button>
      <Button onClick={props.closeModal.bind(this, closeButtonAction)}>CLOSE</Button>
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
