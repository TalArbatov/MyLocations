import CategoryReducer from './CategoryReducer';
import CounterReducer from './CounterReducer';

import {combineReducers} from 'redux';

export default combineReducers({
    CounterReducer: CounterReducer,
    CategoryReducer: CategoryReducer
});