import CategoryReducer from './CategoryReducer';
import CounterReducer from './CounterReducer';
import LocationReducer from './LocationReducer';

import {combineReducers} from 'redux';

export default combineReducers({
    CounterReducer: CounterReducer,
    CategoryReducer: CategoryReducer,
    LocationReducer: LocationReducer
});


