import React from 'react';
import LocationsTableItem from './LocationsTableItem/LocationsTableItem';
import cssStyles from './LocationsTable.css';

//props => locations
export default props => {
    const noLocations = <h1>No locations available.</h1>;

    return(
        <div className={cssStyles.wrapper}>
        {props.locations.length === 0 ||
        props.locations == undefined ? (
          noLocations
        ) : (
          <table className={cssStyles['table-fill']}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Coords</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
              {props.locations.map((location, index) => {
                let style = { background: "transparent" };
                if (location.isSelected) style.background = "blue !important";
    
                //test
                let newStyle = '';
                if(location.isSelected) newStyle = cssStyles.important;
    
                return (
                  <LocationsTableItem location={location}
                  styling={newStyle} index={index} selectLocationHandler={props.selectLocationHandler}/>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    )
}