import * as actions from "../actions";

const initialState = {
  categories: [],
  selectedCategory: ""
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {

    case actions.ADD_CATEGORY:
      newState.categories.push({ name: action.payload.name });
      break;

    case actions.SAVE_CATEGORY:
      localStorage.setItem("categories", JSON.stringify(newState.categories));
      break;

    case actions.SELECT_CATEGORY:
      //console.log(newState.categories);
      newState.categories.map(category => {
        if (category.name === action.payload.name) category.isSelected = true;
        else category.isSelected = false;
      });
      break;

    case actions.REMOVE_CATEGORY:
      let index;
      newState.categories.map((category, index) => {
        if (category.isSelected) index = index;
      });
      newState.categories.splice(index, 1);
      break;

    case actions.UPDATE_CATEGORY:
      let i;
      newState.categories.map((category, index) => {
        if (category.isSelected) i = index;
      });
      newState.categories[i].name = action.payload.name;
      break;

    case actions.GET_CATEGORIES:
      console.log('GET_CATEGORIES');
      let allCategories = [];
      try {
        allCategories = JSON.parse(localStorage.categories);
        allCategories.map(category => {
          category.isSelected = false;
        });
      } catch (e) {
        console.log("ERROR, CATCHED!");
        console.log(e);
        localStorage.categories = JSON.stringify([]);
      }
      newState.categories = allCategories;
    
      //console.log('state inside reducer: ');
      //console.log(newState)
      break;

    default:
      break;
  }
  return newState;
};
