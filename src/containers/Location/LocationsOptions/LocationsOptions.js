import React from 'react';
import SortOption from './SortOption/SortOption';
import GroupOption from './GroupOption/GroupOption';

export default props => {
    return(
        <div>
            <SortOption selectChange={props.sortOptionChange}/>
            <GroupOption selectChange={props.groupOptionChange}/>
        </div>
    )
}