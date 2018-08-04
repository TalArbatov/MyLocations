import React from 'react';
import cssStyles from './CategoryTable.css';

const CategoryTable = props => {
    if (props.categories.length === 0 || props.categories === undefined)
        return (
            <div className={cssStyles.gradient}><h1>No categories available.</h1></div>
        );
    return (
        <div className={cssStyles.wrapper}>
            <table className={cssStyles['table-fill']}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {props.categories.map((category, index) => {
                        let style = '';
                        if (category.isSelected)
                            style = cssStyles.important
                        return (
                            <tr key={index} className={style} onClick={props.selectCategoryHandler.bind(this, category.name)}>
                                <td>{index + 1}</td>
                                <td>{category.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default CategoryTable;