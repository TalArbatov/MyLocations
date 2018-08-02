import React from 'react';
import LocationsGroup from './LocationsGroup/LocationsGroup';

export default props => {
    return(
        <div>
            {
                props.locationsByGroup.map(group => {
                    return(
                        <LocationsGroup group={group} selectLocationHandler={props.selectLocationHandler}/>
                    )
                })
            }
        </div>
    )
}