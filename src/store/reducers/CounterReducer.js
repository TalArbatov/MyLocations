import * as actions from '../actions';

const initialState = {
    counter: 0
}

const CounterReducer = (state = initialState, action) => {
    const newState = {...state};
    switch(action.type) {
        case actions.INC_COUNTER:
            newState.counter++;
            break;
        case actions.DEC_COUNTER: 
            newState.counter--;
            break;
        default:
            break;
    }
    return newState;
}

export default CounterReducer;