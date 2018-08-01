import * as actions from '../actions';

const initialState = {
    locations: []
}

export default (state = initialState, action) => {
    const newState = {...state};
    let appState;
    switch(action.type) {
        case actions.GET_LOCATIONS:
            let allLocations = [];
            try {
                allLocations = JSON.parse(localStorage.appState).locations;   
            }
            catch(e) {
                console.log('ERROR INSIDE GET_LOCATIONS')
            }
            newState.locations = allLocations;
            break;
        default:
            break;
    }
    return newState;
}