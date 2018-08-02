import React from 'react';
import LocationsGroup from './LocationsGroup/LocationsGroup';
import cssStyles from './LocationsGroups.css';

export default props => {
    return(
        <div className={cssStyles.wrapper}>
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