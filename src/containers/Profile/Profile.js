import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Profile.css';
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
            case "Order":
                this.props.history.push({pathname: '/order'});
                break;
            default: ;
        }
    }

    render() {
        var profile = (
            <div className={classes.Profile}>
                <div className={classes.Title}>
                    <h1>@{this.props.Name} Profile</h1>
                    <h3>Phone No: {this.props.phone}</h3>
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
                                title={'Set Parameters'}
                                clicked={() => this.postSelectedHandler('Set')}/> 
                            <Tile 
                                title={'Add Orders'}
                                clicked={() => this.postSelectedHandler('Order')}/> 
                        </div>
                    </section>
                </div>
            </div>
        );

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
        phone: state.auth.phone,
        // District: state.auth.District
    }
}

export default connect(mapStateToProps)(Profile);