import React, { Component } from 'react';
import Intro from '../../components/Intro/Intro'
import classes from './HomePage.css';

class HomePage extends Component {

    render() {
        return (            
            <div className={classes.bg}>
                <div className={classes.ints}>
                    <Intro/>
                </div>
                <div className={classes.image}>
                </div>
            </div>
        );
    }
}

export default HomePage