import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { updateObject, checkValidity } from '../../shared/utility';
import classes from './Set.css';

class Set extends Component {

    state = {
        PostForm: {
            Title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Title'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            },
            Type: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Type'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            },
            Description: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Description'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            },
            ContactNo: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Contact Number'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true,
                    minLength: 9,
                    maxLength: 10
                },
                valid: false,
                touched: false
            },
            District: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'Matale', displayValue: 'Matale'},
                        {value: 'Kandy', displayValue: 'Kandy'},
                        {value: 'Nuwara Eliya', displayValue: 'Nuwara Eliya'},
                        {value: 'Kurunegala', displayValue: 'Kurunegala'},
                        {value: 'Puttalam', displayValue: 'Puttalam'},
                        {value: 'Colombo', displayValue: 'Colombo'},
                        {value: 'Kaluthara', displayValue: 'Kaluthara'},
                        {value: 'Gampaha', displayValue: 'Gampaha'},
                        {value: 'Badulla', displayValue: 'Badulla'},
                        {value: 'Ampara', displayValue: 'Ampara'},
                        {value: 'Batticaloa', displayValue: 'Batticaloa'},
                        {value: 'Jaffna', displayValue: 'Jaffna'},
                        {value: 'Kegalle', displayValue: 'Kegalle'},
                        {value: 'Mannar', displayValue: 'Mannar'},
                        {value: 'Monaragala', displayValue: 'Monaragala'},
                        {value: 'Mullaitivu', displayValue: 'Mullaitivu'},
                        {value: 'Trincomalee', displayValue: 'Trincomalee'},
                        {value: 'Vavuniya', displayValue: 'Vavuniya'},
                        {value: 'Galle', displayValue: 'Galle'},
                        {value: 'Matara', displayValue: 'Matara'},
                        {value: 'Hambantota', displayValue: 'Hambantota'},
                    ]
                },
                value: '',
                validation: {},
                valid: true
            },
            Address: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
        },
        submitted: false,
        formIsValid: false,
        postID: null
    }

    inputChangedHandler = (event, PostIdentifier) =>{
        const updatedPostForm = updateObject( this.state.PostForm, {
            [PostIdentifier]: updateObject( this.state.PostForm[PostIdentifier], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.PostForm[PostIdentifier].validation ),
                touched: true
            } )
        } );

        let formIsValid = true;
        for (let inputIdentifier in updatedPostForm) {
            formIsValid = updatedPostForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({PostForm: updatedPostForm, formIsValid: formIsValid});
    }

    postDataHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formIdentifier in this.state.PostForm ){
            formData[formIdentifier] = this.state.PostForm[formIdentifier].value;
        }

        const token = this.props.tokenID;
        const ID = this.props.userID

        const data = {
            UID: ID,
            District: formData.District,
            postData : formData
        };
        
        axios.post('/Posts.json?auth=' + token ,data)
            .then( response => {                
                this.setState({submitted:true, postID:response.data.name});
            });

    }

    render() {

        let redirect = null;
        
        if( this.state.submitted ){
            redirect = <Redirect to={"posts/user/" + this.state.postID}/>
        }

        const formElementsArray = [];
        for (let key in this.state.PostForm) {
            formElementsArray.push({
                id: key,
                config: this.state.PostForm[key]
            });
        }
        let form = (
            formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    label={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            ))
        );

        return(
            <Aux>
                <div>
                    <div className={classes.Title}>
                        {redirect}
                        <h1>Adjust Parameters</h1>
                    </div>
                    <div className={classes.FormEl}>
                        <form onSubmit={this.postDataHandler} >
                            {form}
                            <Button btnType="Success" disabled={!this.state.formIsValid} >Add Post</Button>
                        </form>
                    </div>
                </div>
            </Aux>
        );
        
    };
}
const mapStateToProps = state => {
    return {
        tokenID: state.auth.token,
        UID: state.auth.userId
    }
}

export default connect(mapStateToProps)(Set);