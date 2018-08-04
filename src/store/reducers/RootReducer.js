import CategoryReducer from './CategoryReducer';
import LocationReducer from './LocationReducer';

import {combineReducers} from 'redux';

export default combineReducers({
    CategoryReducer: CategoryReducer,
    LocationReducer: LocationReducer
});


