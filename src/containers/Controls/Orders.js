import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import uuidv4 from 'uuid/v4';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { updateObject, checkValidity } from '../../shared/utility';
import classes from './Set.css';
import Spinner from '../../components/UI/Spinner/Spinner';

// import { node } from 'prop-types';

class Orders extends Component {

    state = {
        Pharmacy: null,
        Drivers:null,
        OrderForm: {
            Pharmacy: {
                elementType: 'select',
                elementConfig: {
                    options: []
                },
                value: 'HtY7qFD8XoZjkVteZJWTUTZAkuV2',
                validation: {},
                valid: true
            },
            Driver: {
                elementType: 'select',
                elementConfig: {
                    options: []
                },
                value: 'rn1001',
                validation: {},
                valid: true
            },
            BoxID: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Box ID'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            },
        },
        updated1:false,
        updated2:false,
        submitted1: false,
        submitted2: false,
        submitted3: false,
        formIsValid: false,
    }

    componentDidMount () {
        axios.get( 'https://co321project-e273b.firebaseio.com/pharmacies.json' )
        .then( response => {
            const fetchedNodes = [];
            for(let key in response.data){
                fetchedNodes.push({
                    ...response.data[key],
                    id: key
                });
            }
            this.setState({Pharmacy: fetchedNodes});
            
            this.state.Pharmacy.map(nodes => {
                const updatedOrderForm = {
                    ...this.state.OrderForm,
                };
                updatedOrderForm.Pharmacy.elementConfig.options.push(
                        { value: nodes.pharmacyId, displayValue: nodes.pharmacyName }
                )
                this.setState({OrderForm: updatedOrderForm});
                return true;
            });
            this.setState({updated1: true});
        } );

        axios.get( 'https://co321project-e273b.firebaseio.com/drivers.json' )
        .then( response => {
            const fetchedNodes = [];
            for(let key in response.data){
                fetchedNodes.push({
                    ...response.data[key],
                    id: key
                });
            }
            this.setState({Drivers: fetchedNodes});
            
            this.state.Drivers.map(nodes => {
                const updatedOrderForm = {
                    ...this.state.OrderForm,
                };
                updatedOrderForm.Driver.elementConfig.options.push(
                        { value: nodes.uid, displayValue: nodes.name }
                )
                this.setState({OrderForm: updatedOrderForm});
                return true;
            });
            this.setState({updated2: true});
        } );
        
    }

    inputChangedHandler = (event, PostIdentifier) =>{
        const updatedPostForm = updateObject( this.state.OrderForm, {
            [PostIdentifier]: updateObject( this.state.OrderForm[PostIdentifier], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.OrderForm[PostIdentifier].validation ),
                touched: true
            } )
        } );

        let formIsValid = true;
        for (let inputIdentifier in updatedPostForm) {
            formIsValid = updatedPostForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({OrderForm: updatedPostForm, formIsValid: formIsValid});
    }

    postDataHandler = (event) => {

        event.preventDefault();
        const formData = {};
        var boxID;

        var driver;
        var driverid;
        var pharmacy;
        var pharmacyid;
        var address;

        for(let formIdentifier in this.state.OrderForm ){
            formData[formIdentifier] = this.state.OrderForm[formIdentifier].value;
            
            if( formIdentifier === 'BoxID' ){
                boxID = this.state.OrderForm[formIdentifier].value;
            }else if( formIdentifier === 'Driver' ){
                for(let id in this.state.Drivers ){
                    if(  this.state.Drivers[id].uid === this.state.OrderForm[formIdentifier].value ){
                        driver = this.state.Drivers[id].name;
                        driverid =this.state.Drivers[id].uid;
                    }
                }
            }else if( formIdentifier === 'Pharmacy' ){
                for(let id in this.state.Pharmacy ){
                    if(  this.state.Pharmacy[id].pharmacyId === this.state.OrderForm[formIdentifier].value ){
                        pharmacy = this.state.Pharmacy[id].pharmacyName;
                        pharmacyid = this.state.Pharmacy[id].pharmacyId;
                        address = this.state.Pharmacy[id].pharmacyAddress.split(" ");
                    }
                }
            }
        }

        var res = boxID.split(" ");
        var len = address.length;

        const id = uuidv4();

        const data = {
            boxList: res,
            distributorId: this.props.UID,
            distributorName: this.props.name,
            driverId: driverid,
            driverName: driver,
            pharmacyId: pharmacyid,
            pharmacyName: pharmacy,
            cityName: address[len-1],
            randomId: id,
            notified: false,
            read: false,
        };
        
        axios.put('https://co321project-e273b.firebaseio.com/distributorTask/' + this.props.UID +'/ongoingDeliveries/'+ id +'.json?auth=' + this.props.tokenID, data)
            .then( response => {                
                this.setState({submitted1:true});
            });

        axios.put('https://co321project-e273b.firebaseio.com/driverTask/' + driverid +'/ongoingDeliveries/'+ id +'.json?auth=' + this.props.tokenID, data)
            .then( response => {                
                this.setState({submitted2:true});
            });

        axios.put('https://co321project-e273b.firebaseio.com/pharmacyTask/' + pharmacyid +'/ongoingDeliveries/'+ id +'.json?auth=' + this.props.tokenID, data)
            .then( response => {                
                this.setState({submitted3:true});
            });
  
    }

    render() {

        let redirect = null;
        
        if( this.state.submitted1 && this.state.submitted2 && this.state.submitted3 ){
            redirect = <Redirect to={"/profile"}/>
        }

        const formElementsArray = [];
        let form = <Spinner />;
        let button = null;

        if( this.state.updated1 && this.state.updated1 ){
            
            for (let key in this.state.OrderForm) {
                formElementsArray.push({
                    id: key,
                    config: this.state.OrderForm[key]
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
        UID: state.auth.userId,
        name: state.auth.username
    }
}

export default connect(mapStateToProps)(Orders);