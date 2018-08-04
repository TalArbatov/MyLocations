import React from 'react';
import LocationTable from './LocationTable/LocationTable';
import cssStyles from './LocationGroup.css';

const LocationGroup = props => {
    return(
        <div className={cssStyles.wrapper}>

        <div className={cssStyles.text}>
           <p>{props.group.header}</p>
        </div>

            <LocationTable locations={props.group.locations} selectLocationHandler={props.selectLocationHandler}/>
        </div>
    );
}

export default LocationGroup;