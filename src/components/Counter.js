import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../store/actions';

class Counter extends Component {

    componentDidMount() {
        console.log(this.props)
    }


    render() {
        return(
            <div>
            <button onClick={this.props.onIncrement}>INC</button>
            <button onClick={this.props.onDecrement}>DEC</button>
            <h1>{this.props.CounterReducer.counter}</h1>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        CounterReducer: state.CounterReducer,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIncrement: () => {
            return dispatch({
                type: actions.INC_COUNTER
            });
        },
        onDecrement: () => {
            return dispatch({
                type: actions.DEC_COUNTER
            });
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Counter);