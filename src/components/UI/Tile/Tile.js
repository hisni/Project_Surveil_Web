import React from 'react';

import classes from './Tile.css';

const post = (props) => (
    <article className={classes.Tile} onClick={props.clicked}>
        <p>{props.title}</p>
    </article>
);

export default post;