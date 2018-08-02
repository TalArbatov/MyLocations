import React, { Component } from "react";
import TopNavbar from "../TopNavbar/TopNavbar";
import Modal from "react-modal";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
Modal.setAppElement("#root");

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

class Category extends Component {
  state = {
    addModal: false,
    editModal: false,
    newCategory: {
      name: ""
    },
    updatedCategory: {
        name: ''
    }
  };

  componentDidMount() {
    const allCategories = localStorage.categories;
    this.props.getCategories();
    console.log(this.props);
  }
  addHandler = () => {
    this.setState({ addModal: true });
  };
  removeHandler = () => {
    this.props.removeCategory();
  };
  closeModal = (type) => {
    this.setState({ [type]: false });
  };
  inputChange = (type, e) => {
    const x = { ...this.state[type] };
    x.name = e.target.value;
    this.setState({ [type]: x });
    console.log(this.state);
  };
  addCategoryHandler = () => {
    this.props.addCategory(this.state.newCategory.name);
  };

  saveHandler = () => {
    this.props.saveCategories();
  };

  selectCategoryHandler = (name) => {
      this.props.selectCategory(name);
  }

  editHandler = () => {
    const updatedCategory = this.state.updatedCategory;
    updatedCategory.name = this.props.CategoryReducer.categories.find(category => category.isSelected).name;
    this.setState({editModal: true, updatedCategory})
  }

  render() {
    const noCategories = <h1>No categories available.</h1>;
    return (
      <div>
        <TopNavbar
          status="category"
          add={this.addHandler}
          remove={this.removeHandler}
          save={this.saveHandler}
          edit={this.editHandler}
        />
        {this.props.CategoryReducer.categories.length === 0 ||
        this.props.CategoryReducer.categories == undefined ? (
          noCategories
        ) : (
          <table>
            <thead />
            <tbody>
              {this.props.CategoryReducer.categories.map((category, index) => {
                  let style = {'background': 'transparent'};
                  if(category.isSelected)
                    style.background = 'blue';
                return (
                  <tr key={index} style={style} onClick={this.selectCategoryHandler.bind(this, category.name)}>
                    <td>{index}</td>
                    <td>{category.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/*MODALS*/}
        <Modal
          isOpen={this.state.addModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          style={customStyles}
        >
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={this.state.newCategory.name}
              onChange={this.inputChange.bind(this, 'newCategory')}
            />
          </div>
          <button onClick={this.addCategoryHandler}>Add</button>
          <button onClick={this.closeModal.bind(this, 'addModal')}>close</button>
        </Modal>


          <Modal
          isOpen={this.state.editModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          style={customStyles}
        >
          <div>
              <p>EDIT</p>
            <label>Name:</label>
            <input
              type="text"
              value={this.state.updatedCategory.name}
              onChange={this.inputChange.bind(this, 'updatedCategory')}
            />
          </div>
          <button onClick={this.props.updateCategory.bind(this, this.state.updatedCategory.name)}>Edit</button>
          <button onClick={this.closeModal.bind(this, 'editModal')}>close</button>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    CategoryReducer: state.CategoryReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCategory: name => {
      return dispatch({
        type: actions.ADD_CATEGORY,
        payload: {
          name: name
        }
      });
    },
    getCategories: () => {
      return dispatch({
        type: actions.GET_CATEGORIES
      });
    },
    saveCategories: () => {
      return dispatch({
        type: actions.SAVE_CATEGORY
      });
    },
    selectCategory: name => {
        return dispatch({
          type: actions.SELECT_CATEGORY,
          payload: {
              name
          }
        });
      },
      removeCategory: () => {
        return dispatch({
          type: actions.REMOVE_CATEGORY
        });
      },
      updateCategory: name => {
        return dispatch({
          type: actions.UPDATE_CATEGORY,
          payload: {
              name
          }
        });
      }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
