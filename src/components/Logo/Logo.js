import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/images/Logo.png';
import Logo2 from '../../assets/images/Logo2.png';

import classes from './Logo.css';

const logo = (props) => (
    <NavLink to="/" exact>
        <div className={classes.Logo} style={{height: props.height}}>
            <img src={Logo} alt="ProjectLogo" />
        </div>
        <div className={classes.Logo2} style={{height: props.height}}>
            <img src={Logo2} alt="ProjectLogo" />
        </div>
    </NavLink>
);

export default logo;