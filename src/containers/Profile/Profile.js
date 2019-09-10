import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Profile.css';
// import UserPosts from '../PostSection/Posts/UserPosts';
import Tile from '../../components/UI/Tile/Tile';
import AUX from '../../hoc/Auxiliary/Auxiliary';

class Profile extends Component {

    postSelectedHandler = (id) => {
        switch ( id ) {
            case "Monitor":
                this.props.history.push({pathname: '/monitor'});
                break;
            case "Track":
                this.props.history.push({pathname: '/track'});
                break;
            case "Set":
                this.props.history.push({pathname: '/set'});
                break;
            default: ;
        }
    }

    render() {
        var profile = (
            <div className={classes.Profile}>
                <div className={classes.Title}>
                    <h1>@{this.props.Name} Profile</h1>
                </div>
                <div>
                    <section className={classes.ProfileMangement}>
                        <div className={classes.Controls}>
                            <Tile 
                                title={'Monitor'}
                                clicked={() => this.postSelectedHandler('Monitor')}/>
                            <Tile 
                                title={'Track'}
                                clicked={() => this.postSelectedHandler('Track')}/>
                            <Tile 
                                title={'Set Params'}
                                clicked={() => this.postSelectedHandler('Set')}/> 
                        </div>
                    </section>
                </div>
            </div>
        );

        if( this.props.Authority === "PHI"  ){
            profile = (
                <div className={classes.Profile}>
                    <div className={classes.Title}>
                        <h2>{this.props.Name}</h2>
                        <h3>Public Health Inspector</h3>
                        <h3>{this.props.District} District</h3>
                    </div>
                    <div className={classes.Tiles}>
                        <Tile 
                            title={'District Accounts'}
                            clicked={() => this.postSelectedHandler('DA')}/>
                        <Tile 
                            title={'District Posts'}
                            clicked={() => this.postSelectedHandler('DP')}/> 
                    </div>
                </div>
            )
        }
     
        return (
            <AUX>
                {profile}
            </AUX>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        UID: state.auth.userId,
        Name: state.auth.username,
        Authority: state.auth.Authority,
        District: state.auth.District
    }
}

export default connect(mapStateToProps)(Profile);