import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        {/* <NavigationItem link="/posts/all" Type="Reset">Collection Centers</NavigationItem> */}
        { !props.isAuthenticated
            ? <NavigationItem link="/login">Login</NavigationItem> 
            : <NavigationItem link="/profile">Profile</NavigationItem> }

        { !props.isAuthenticated
            ? <NavigationItem link="/register">Register</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem> }
    </ul>
);

export default navigationItems;