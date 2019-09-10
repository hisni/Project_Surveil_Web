import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Monitor.css';

class Posts extends Component {

    render() {
        return(
            <Aux>
                <div className={classes.Title}>
                    <h1>Adjust Parameters</h1>
                </div>
            </Aux>
        );
        
    };
}

export default Posts;