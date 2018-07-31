import React from 'react';
import Navigation from './Navigation/Navigation';

export default (props) => {
    return(
        <div>
            <Navigation />
            {props.children}
        </div>
    )
}