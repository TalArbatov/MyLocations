import * as actions from "../actions";

let allLocations = [];
let locationsByGroup = [
  {
    header: "All locations",
    locations: JSON.stringify([])
  }
];
test();
function test() {
  try {
    allLocations = JSON.parse(localStorage.locations);
    locationsByGroup = [
      {
        header: "All locations",
        locations: allLocations
      }
    ];
  } catch (e) {
    localStorage.locations = JSON.stringify([]);
    test();
  }
}
const initialState = {
  locations: allLocations,
  locationsByGroup: locationsByGroup
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case actions.GET_LOCATIONS:
      let allLocations = [];
      let locationsByGroup;
      try {
        allLocations = JSON.parse(localStorage.locations);
        locationsByGroup = [
          {
            header: "All locations",
            locations: allLocations
          }
        ];
      } catch (e) {
        throw e;
      }
      newState.locationsByGroup = locationsByGroup;
      newState.locations = allLocations;
      break;

    case actions.ADD_LOCATION:
      newState.locations.push({ ...action.payload.location });
      break;

    case actions.SAVE_LOCATIONS:
      localStorage.setItem("locations", JSON.stringify(newState.locations));
      break;

    case actions.SELECT_LOCATION:
      newState.locations.map(location => {
        if (location.name === action.payload.name) location.isSelected = true;
        else location.isSelected = false;
        return location;
      });
      break;

    case actions.REMOVE_LOCATION:
      let i;
      newState.locations.map((location, index) => {
        if (location.isSelected) i = index;
        return location;
      });
      newState.locations.splice(i, 1);
      break;

    case actions.UPDATE_LOCATION:
      newState.locations.map((location, index) => {
        if (location.isSelected) i = index;
        return location;
      });
      newState.locations[i] = { ...action.payload.location };
      break;

    case actions.SORT_LOCATIONS:
      switch (action.payload.sortType) {
        case "Alphabetical order":
          newState.locationsByGroup.forEach(group => {
            group.locations.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              return -1;
            });
          });
          break;
        case "Alphabetical order (reverse)":
          newState.locationsByGroup.forEach(group => {
            group.locations.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              return 1;
            });
          });
          break;
        case "No sort":
          let allLocations = [];
          try {
            allLocations = JSON.parse(localStorage.locations);
          } catch (e) {
            throw e;
          }
          newState.locations = allLocations;
          break;

        default:
          break;
      }
      break;

    case actions.GROUP_LOCATIONS:
      locationsByGroup = [];
      let uniqueExsitingCategories = [];
      switch (action.payload.groupType) {
        case "No Group":
          locationsByGroup.push({
            header: "All locations",
            locations: newState.locations
          });
          break;

        case "Category":
          // PROBLEM: exisiting location can possibly cotnain a category property
          // that has been already removed || edited and does not show in the category local storage
          // SOLUTION: fetch (unique) category names from the location array instead.
          // step 1: create an array of unique and currently exisitng category names
          newState.locations.map(location => {
            uniqueExsitingCategories.push(location.category);
            return location;
          });
          uniqueExsitingCategories = uniqueExsitingCategories.filter(
            onlyUnique
          );
          // step 2: for each unique group name, create a GROUP object, that contains the group
          // header, which is the category name, and the group content, which is a list of locations
          // where the location's category matches the GROUP's header.
          for (let i = 0; i < uniqueExsitingCategories.length; i++) {
            const group = {
              header: uniqueExsitingCategories[i],
              locations: []
            };
            newState.locations.map(location => {
              if (location.category === uniqueExsitingCategories[i])
                group.locations.push(location);
              return location;
            });
            locationsByGroup.push(group);
          }
          break;

        default:
          break;
      }
      newState.locationsByGroup = locationsByGroup;
      break;

    default:
      break;
  }
  return newState;
};

// utilities
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
