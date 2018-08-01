import React from 'react';
import Navigation from './Navigation/Navigation';

export default (props) => {


    return(
        <Navigation>
            {props.children}
        </Navigation>
    )
}