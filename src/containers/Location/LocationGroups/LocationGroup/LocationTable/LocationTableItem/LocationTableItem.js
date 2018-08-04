import React from 'react';

const LocationTableItem = props => {
    return(
        <tr
        className={props.styling}
        key={props.index}
        onClick={props.selectLocationHandler.bind(this, props.location.name)}>
        <td>{props.index + 1}</td>
        <td>{props.location.name}</td>
        <td>{props.location.address}</td>
        <td>{props.location.coordinates}</td>
        <td>{props.location.category}</td>
      </tr>
    );
}

export default LocationTableItem;