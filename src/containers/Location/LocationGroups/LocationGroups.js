import React from 'react';
import LocationGroup from './LocationGroup/LocationGroup';
import cssStyles from './LocationGroups.css';

const LocationGroups = props => {
    return(
        <div className={cssStyles.wrapper}>
            {
                props.locationsByGroup.map(group => {
                    return(
                        <LocationGroup group={group} selectLocationHandler={props.selectLocationHandler}/>
                    )
                })
            }
        </div>
    )
}

export default LocationGroups;