import React from 'react';

import classes from './Post.css';
import { FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const post = (props) => (
    <article className={classes.Post} onClick={props.clicked}>
        <h1>{props.title}</h1>
        <div className={classes.Info}>
            <div>{props.type}</div>
            <div><FaPhone/> {props.contect}</div>  
            <div className={classes.Author}><FaMapMarkerAlt/> {props.address}</div>
        </div>
    </article>
);

export default post;