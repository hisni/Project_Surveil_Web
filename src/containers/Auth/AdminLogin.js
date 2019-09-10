import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/smallSpinner';
import classes from './AdminLogin.css';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

class AdminLogin extends Component {
    state = {
        controls: {
            Email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            Password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: false,
        formIsValid: false
    }

    componentDidMount() {
        if ( this.props.error ) {
            this.props.setAuth();
        }
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject( this.state.controls, {
            [controlName]: updateObject( this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            } )
        } );

        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }
        
        this.setState( { controls: updatedControls, formIsValid: formIsValid } );
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        this.props.onAuth( this.state.controls.Email.value, this.state.controls.Password.value );
    }

    render () {
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                label={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );

        let loadSpinner = null;

        if (this.props.loading) {
            loadSpinner = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>Invalid email or password. Please try again.</p>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={'/adminProfile'}/>
        }

        return (
            <div className={classes.Page}>
                <div className={classes.Title}>
                    <h3>Admin Login</h3>
                </div>
                <div className={classes.Auth}>
                    {authRedirect}
                    <form onSubmit={this.submitHandler}>
                        {form}
                        <Button btnType="SuccessRe" disabled={!this.state.formIsValid} >Login</Button>
                        <div className={classes.Extras}>
                            {loadSpinner}
                            {errorMessage}
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.adminAuth.adminLoading,
        error: state.adminAuth.adminError,
        isAuthenticated: state.adminAuth.adminToken !== null,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password ) => dispatch( actions.adminAuthSignIn( email, password ) ),
        setAuth: () => dispatch(actions.setAdminAuth()),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( AdminLogin );