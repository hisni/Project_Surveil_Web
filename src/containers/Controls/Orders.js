import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { updateObject, checkValidity } from '../../shared/utility';
import classes from './Set.css';
import Spinner from '../../components/UI/Spinner/Spinner'
import { node } from 'prop-types';

class Orders extends Component {

    state = {
        EndNodes: null,
        ParamForm: {
            Node: {
                elementType: 'select',
                elementConfig: {
                    options: []
                },
                value: 'en1001',
                validation: {},
                valid: true
            },
            TemperatureMin: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Temperature Min'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true,
                    minLength: 1,
                    maxLength: 2
                },
                valid: false,
                touched: false
            },
            TemperatureMax: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Temperature Max'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true,
                    minLength: 1,
                    maxLength: 2
                },
                valid: false,
                touched: false
            },
            PressureMin: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Pressure Min'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true,
                    minLength: 1,
                    maxLength: 7
                },
                valid: false,
                touched: false
            },
            PressureMax: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Pressure Max'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true,
                    minLength: 1,
                    maxLength: 7
                },
                valid: false,
                touched: false
            },
            HumidityMin: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Humidity Min'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true,
                    minLength: 1,
                    maxLength: 3
                },
                valid: false,
                touched: false
            },
            HumidityMax: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Humidity Max'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true,
                    minLength: 1,
                    maxLength: 3
                },
                valid: false,
                touched: false
            },
        },
        updated:false,
        submitted: false,
        formIsValid: false,
        // postID: null
    }

    componentDidMount () {
        // console.log("componentDidMount");
        // if( this.props.match.params.node ){
        //     this.setNode( this.props.match.params.node );
        // }

        axios.get( 'https://co321project-e273b.firebaseio.com/EndNodes.json' )
        .then( response => {
            const fetchedNodes = [];
            for(let key in response.data){
                fetchedNodes.push({
                    ...response.data[key],
                    id: key
                });
            }
            this.setState({EndNodes: fetchedNodes});
            
            this.state.EndNodes.map(nodes => {
                const updatedParamForm = {
                    ...this.state.ParamForm,
                };
                updatedParamForm.Node.elementConfig.options.push(
                        { value: nodes.id, displayValue: nodes.id }
                )
                this.setState({ParamForm: updatedParamForm});
                return true;
            });
            this.setState({updated: true});
            // console.log(this.state.ParamForm);
            
        } );

    }

    inputChangedHandler = (event, PostIdentifier) =>{
        const updatedPostForm = updateObject( this.state.ParamForm, {
            [PostIdentifier]: updateObject( this.state.ParamForm[PostIdentifier], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.ParamForm[PostIdentifier].validation ),
                touched: true
            } )
        } );

        let formIsValid = true;
        for (let inputIdentifier in updatedPostForm) {
            formIsValid = updatedPostForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ParamForm: updatedPostForm, formIsValid: formIsValid});
    }

    postDataHandler = (event) => {
        event.preventDefault();
        const formData = {};
        var nodeID;
        for(let formIdentifier in this.state.ParamForm ){
            formData[formIdentifier] = this.state.ParamForm[formIdentifier].value;
            
            if( formIdentifier === 'Node' ){
                nodeID = this.state.ParamForm[formIdentifier].value;
            }
        }

        console.log(nodeID);
        
        axios.put('https://co321project-e273b.firebaseio.com/EndNodes/' + nodeID +'/Parameters.json?auth=' + this.props.tokenID ,formData)
            .then( response => {                
                this.setState({submitted:true});
            });
        
    }

    render() {

        let redirect = null;
        
        if( this.state.submitted ){
            redirect = <Redirect to={"/profile"}/>
        }

        const formElementsArray = [];
        let form = <Spinner />;
        let button = null;

        if( this.state.updated ){
            
            for (let key in this.state.ParamForm) {
                formElementsArray.push({
                    id: key,
                    config: this.state.ParamForm[key]
                });
            }
            
            form = (
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

            button = <Button btnType="Success" disabled={!this.state.formIsValid} >Add Post</Button>
        }

        return(
            <Aux>
                <div className={classes.SetBG}>
                    <div className={classes.FormBG}>
                        <div className={classes.Title}>
                            {redirect}
                            <h1>Adjust Parameters</h1>
                        </div>
                        <div className={classes.FormEl}>
                            <form onSubmit={this.postDataHandler} >
                                {form}
                                {button}
                            </form>
                        </div>
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

export default connect(mapStateToProps)(Orders);