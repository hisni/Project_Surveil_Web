import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/smallSpinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

class Signup extends Component {
    state = {
        controls: {
            Username: {
                elementType: 'input',
                elementConfig: {
                    type: 'username',
                    placeholder: 'Username'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            // District: {
            //     elementType: 'select',
            //     elementConfig: {
            //         options: [
            //             {value: 'Matale', displayValue: 'Matale'},
            //             {value: 'Kandy', displayValue: 'Kandy'},
            //             {value: 'Nuwara Eliya', displayValue: 'Nuwara Eliya'},
            //             {value: 'Kurunegala', displayValue: 'Kurunegala'},
            //             {value: 'Puttalam', displayValue: 'Puttalam'},
            //             {value: 'Colombo', displayValue: 'Colombo'},
            //             {value: 'Kaluthara', displayValue: 'Kaluthara'},
            //             {value: 'Gampaha', displayValue: 'Gampaha'},
            //             {value: 'Badulla', displayValue: 'Badulla'},
            //             {value: 'Ampara', displayValue: 'Ampara'},
            //             {value: 'Batticaloa', displayValue: 'Batticaloa'},
            //             {value: 'Jaffna', displayValue: 'Jaffna'},
            //             {value: 'Kegalle', displayValue: 'Kegalle'},
            //             {value: 'Mannar', displayValue: 'Mannar'},
            //             {value: 'Monaragala', displayValue: 'Monaragala'},
            //             {value: 'Mullaitivu', displayValue: 'Mullaitivu'},
            //             {value: 'Trincomalee', displayValue: 'Trincomalee'},
            //             {value: 'Vavuniya', displayValue: 'Vavuniya'},
            //             {value: 'Galle', displayValue: 'Galle'},
            //             {value: 'Matara', displayValue: 'Matara'},
            //             {value: 'Hambantota', displayValue: 'Hambantota'},
            //         ]
            //     },
            //     value: '',
            //     validation: {},
            //     valid: true
            // },
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
            },
        },
        isSignup: true,
        formIsValid: false
    }

    componentDidMount() {
        if ( this.props.signUpSuccess || this.props.error ) {
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
        const data = {
            Email: this.state.controls.Email.value,
            Password: this.state.controls.Password.value,
            Username: this.state.controls.Username.value,
            District: this.state.controls.District.value,
        }
        this.props.onAuth( data, this.state.isSignup );
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

        if ( this.props.error ) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let redirect = null;
        if (this.props.signUpSuccess) {
            redirect = <Redirect to={'/login'}/>
        }

        return (
            <div className={classes.Page}>
                <div className={classes.Signup}>
                    {redirect}
                    <form onSubmit={this.submitHandler}>
                        {form}
                        <Button btnType="SuccessRe" disabled={!this.state.formIsValid} >Signup</Button>
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
        loading: state.auth.loading,
        error: state.auth.error,
        signUpSuccess: state.auth.signUpSuccess
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( data, isSignup ) => dispatch( actions.authSignUp( data, isSignup ) ),
        setAuth: () => dispatch(actions.setAuth()),        
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Signup );