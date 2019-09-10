import React, { Component } from 'react';
// import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './App.css';
// import AdminLogin from './containers/Auth/AdminLogin';
// import AdminProfile from './containers/AdminProfile/AdminProfile';
import Main from './containers/Main/Main';
// import AdminLogout from './containers/Auth/AdminLogout';
// import PHIusers from './containers/AdminProfile/PHIusers';
// import GeneralUsers from './containers/AdminProfile/GeneralUsers';


import * as actions from './store/actions/index';

import { IconContext } from "react-icons";

class App extends Component {

    componentDidMount(){
        this.props.onTryAutoSignup();
        this.props.onTryAutoAdminSignup();
    }

    render() {

        let routes = (
            <Switch>
                {/* <Route path="/admin" exact component={AdminLogin} /> */}
                <Route path="/" component={Main} />
            </Switch>
        );

        // if ( this.props.isAuthenticated ) {
        //     routes = (
        //         <Switch>
        //             <Route path="/admin" exact component={AdminLogin} />
        //             <Route path="/adminProfile" exact component={AdminProfile} />
        //             <Route path="/adminLogout" exact component={AdminLogout} />
        //             <Route path="/phiusers" exact component={PHIusers} />
        //             <Route path="/GeneralUsers" exact component={GeneralUsers} />
        //             <Route path="/" component={Main} />
        //         </Switch>
        //     );
        // }

        return (
            <IconContext.Provider value={{ color: "rgb(46)",style: { verticalAlign: 'middle' } , className: "global-class-name" }}>
                <div className={classes.App}>
                    {routes}
                </div>
            </IconContext.Provider>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.adminAuth.adminToken !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch( actions.authCheckState() ),
        onTryAutoAdminSignup: () => dispatch( actions.adminAuthCheckState() )
    };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ));
