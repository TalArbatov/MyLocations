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
      console.log(newState.categories)
      break;

    case actions.SAVE_CATEGORY:
      localStorage.setItem("categories", JSON.stringify(newState.categories));
      break;

    case actions.SELECT_CATEGORY:
      newState.categories.map(category => {
        if (category.name === action.payload.name) category.isSelected = true;
        else category.isSelected = false;
        return category;
      });
      break;

    case actions.REMOVE_CATEGORY:
      let i;
      newState.categories.map((category, index) => {
        if (category.isSelected) i = index;
        return category;
      });
      newState.categories.splice(i, 1);
      break;

    case actions.UPDATE_CATEGORY:
      newState.categories.map((category, index) => {
        if (category.isSelected) i = index;
        return category;
      });
      newState.categories[i].name = action.payload.name;
      break;

    case actions.GET_CATEGORIES:
      let allCategories = [];
      try {
        allCategories = JSON.parse(localStorage.categories);
        allCategories.map(category => {
          category.isSelected = false;
          return category;
        });
      } catch (e) {
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
