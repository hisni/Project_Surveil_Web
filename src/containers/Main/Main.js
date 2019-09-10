import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Main.css';
import Layout from '../../hoc/Layout/Layout';
import Login from '../../containers/Auth/Login';
import Signup from '../../containers/Auth/Signup';
import HomePage from '../../containers/HomePage/HomePage';
import Logout from '../../containers/Auth/Logout';
import Profile from '../../containers/Profile/Profile';
import Monitor from '../Controls/Monitor';
import Track from '../Controls/Track';
import Set from '../Controls/Set';

import * as actions from '../../store/actions/index';

class Main extends Component {

    componentDidMount(){
        // this.props.onTryAutoSignup();
    }

    render() {

        let routes = (
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/login" exact component={Login} />                        
                <Route path="/register" exact component={Signup} />                                                
                {/* <Route path="/posts/:district" exact component={Posts} />                        
                <Route path="/post/user/:pid" exact component={User} />
                <Route path="/posts/:district/:id" exact component={FullPost} /> */}
                <Redirect to="/" />
            </Switch>
        );
      
        if ( this.props.isAuthenticated ) {
            routes = (
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/monitor" exact component={Monitor} />
                    <Route path="/track" exact component={Track} />
                    <Route path="/set" exact component={Set} />
                    {/* <Route path="/post-add" exact component={NewPost} /> */}
                    <Route path="/profile" exact component={Profile} />                    
                    <Route path="/logout" exact component={Logout} />                 
                    {/* <Route path="/accounts" exact component={Accounts} />                  */}
                    {/* <Route path="/districtposts" exact component={DistrictPosts} />                  */}
                    {/* <Route path="/posts/:district" exact component={Posts} />                         */}
                    {/* <Route path="/post/user/:pid" exact component={User} /> */}
                    {/* <Route path="/profile/posts/:id" exact component={FullPost} />                                                 */} */}
                    {/* <Route path="/posts/:district/:id" exact component={FullPost} />    */}
                    <Redirect to="/" />
                </Switch>
            );
        }

        return (
            <div className={classes.App}>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch( actions.authCheckState() ),
        onTryAutoAdminSignup: () => dispatch( actions.adminAuthCheckState() )
    };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( Main ));