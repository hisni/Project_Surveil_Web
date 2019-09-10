import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/images/Logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <NavLink to="/" exact>
        <div className={classes.Logo} style={{height: props.height}}>
            <img src={Logo} alt="Project" />
        </div>
    </NavLink>
);

export default logo;