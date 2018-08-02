import React from 'react';
import LocationsTable from './LocationsTable/LocationsTable';
import cssStyles from './LocationsGroup.css';

export default props => {
    return(
        <div className={cssStyles.wrapper}>

        <div className={cssStyles.text}>
           <p>{props.group.header}</p>
        </div>

            <LocationsTable locations={props.group.locations} selectLocationHandler={props.selectLocationHandler}/>
        </div>
    )
}