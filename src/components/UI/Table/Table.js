import React from 'react';
import classes from './Table.css';

const Table = (props) => (
    <div className={classes.Content}>
        <div className={classes.Email}>{props.email}</div>
        <div className={classes.Name}>{props.name}</div>  
        <div className={classes.District}>{props.district}</div>
    </div>
);

export default Table;