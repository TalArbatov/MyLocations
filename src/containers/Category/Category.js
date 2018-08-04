import React, { Component } from "react";
import TopNavbar from "../TopNavbar/TopNavbar";
import Modal from "react-modal";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import cssStyles from './Category.css';
import CategoryModal from './../../components/Modals/CategoryModal/CategoryModal';

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
    this.props.getCategories();
    console.log(this.props);
  }
  openAddModal = () => {
    this.setState({ addModal: true });
  };
  removeHandler = () => {
    this.props.removeCategory();
  };
  closeModal = (modal) => {
    this.setState({ [modal]: false });
  };
  inputChange = (type, e) => {
    const x = { ...this.state[type] };
    x.name = e.target.value;
    this.setState({ [type]: x });
    console.log(this.state);
  };
  addCategoryHandler = () => {
    this.props.addCategory(this.state.newCategory.name);
    this.closeModal('addModal');
  };
  editCategoryHandler = () => {
    this.props.updateCategory(this.state.updatedCategory.name);
    this.closeModal('editModal');
  }
  saveHandler = () => {
    this.props.saveCategories();
  };

  selectCategoryHandler = (name) => {
      this.props.selectCategory(name);
  }

  openEditModal = () => {
    const updatedCategory = this.state.updatedCategory;
    updatedCategory.name = this.props.CategoryReducer.categories.find(category => category.isSelected).name;
    this.setState({editModal: true, updatedCategory})
  }

  render() {
    const noCategories = <div className={cssStyles.gradient}><h1>No categories available.</h1></div>;
    return (
      <div>
        <TopNavbar
          status="category"
          add={this.openAddModal}
          remove={this.removeHandler}
          save={this.saveHandler}
          edit={this.openEditModal}
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
        <CategoryModal
          type='new'
          isOpen={this.state.addModal}
          onAfterOpen={this.afterOpenModal}
          category={this.state.newCategory}
          closeModal={this.closeModal}
          categoryHandler={this.addCategoryHandler}
          inputChange={this.inputChange}   />
     
        <CategoryModal
          type='updated'
          isOpen={this.state.editModal}
          onAfterOpen={this.afterOpenModal}
          category={this.state.updatedCategory}
          closeModal={this.closeModal}
          categoryHandler={this.editCategoryHandler}
          inputChange={this.inputChange} />
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
