import React from 'react';
import Modal from 'react-modal';
import { Input, Button } from 'react-materialize';


const CategoryModal = props => {
    const submitButtonText = props.type === 'new' ? 'ADD' : 'EDIT'

    return (
        <Modal isOpen={props.isOpen}
            onAfterOpen={props.afterOpenModal}
            onRequestClose={props.closeModal}
            contentLabel="Example Modal"
            style={customStyles} >
            <div>
                <Input
                    label="Name: "
                    type="text"
                    value={props.category.name}
                    onChange={props.inputChange.bind(this, props.type === 'new' ? 'newCategory' : 'updatedCategory')} />
            </div>
            <Button style={customStyles.button} onClick={props.categoryHandler}>{submitButtonText}</Button>
            <Button onClick={props.closeModal.bind(this, props.type === 'updated' ? 'editModal' : 'addModal')}>CLOSE</Button>
        </Modal>
    );
}

export default CategoryModal;

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)"
    },
    button: {
        marginRight: '10px'
    }
};
