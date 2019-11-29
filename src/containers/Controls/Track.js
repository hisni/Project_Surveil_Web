import React, { Component } from 'react';
import axios from 'axios';
import { ReactBingmaps } from 'react-bingmaps';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Track.css';
import Input from '../../components/UI/Input/Input';

class Track extends Component {

    state = {
        RelayNodes: null,
        coordinates: null,
        Controls: {
            Nodes: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: "select", displayValue: "Select a node" }
                    ]
                },
                value: 'select',
                validation: {},
                valid: true
            }
        },
        Update:false
    }

    componentDidMount () {
        // console.log("componentDidMount");
        if( this.props.match.params.node ){
            this.setNode( this.props.match.params.node );
        }

        axios.get( 'https://co321project-e273b.firebaseio.com/RelayNodes.json' )
        .then( response => {
            const fetchedNodes = [];
            for(let key in response.data){
                fetchedNodes.push({
                    ...response.data[key],
                    id: key
                });
            }
            this.setState({RelayNodes: fetchedNodes});

            this.state.RelayNodes.map(nodes => {
                const updatedControls = {
                    ...this.state.Controls,
                };
                updatedControls.Nodes.elementConfig.options.push(
                        { value: nodes.id, displayValue: nodes.id }
                )
                this.setState({Controls: updatedControls});
                return true;
            })
            // console.log(this.state.Coordinates);
        } );

    }

    componentDidUpdate() {        
        if( this.props.match.params.node === 'select' && !this.state.Update ){
            this.setNode( 'select' );
            this.setState({Update:true});
        }
    }

    setNode = ( initNode ) => {
        console.log("setNode");
        const updatedControls = {
            ...this.state.Controls,
            Nodes: {
                ...this.state.Controls.Nodes,
                value: initNode,
                touched: true
            }
        };
        this.setState({Controls: updatedControls});

        var updatedCoordinates = null;

        if( initNode === 'select' ){
            updatedCoordinates = [7.2906, 80.7718];
        }else{
            updatedCoordinates = [this.state.RelayNodes[0].Coordinates.latitude, this.state.RelayNodes[0].Coordinates.longitude ]; 
        }
        this.setState({coordinates: updatedCoordinates});
        
    }

    inputChangedHandler = (event, nodeIdentifier) =>{
        // this.resetCount();
        const updatedControls = {
            ...this.state.Controls,
            [nodeIdentifier]: {
                ...this.state.Controls[nodeIdentifier],
                value: event.target.value,
                touched: true
            }
        };
        this.setState({Controls: updatedControls});
        if( nodeIdentifier === "Nodes"){
            this.props.history.push({pathname: '/Nodes/' + event.target.value});
        }
    }

    // resetCount = () =>{
    //     this.setState({Count: 0});
    // }

    render() {

        const filterArray = [];
        let filter = null;

        if( this.state.Controls.Nodes.elementConfig.options.length ){
            

            for (let key in this.state.Controls) {
                filterArray.push({
                    id: key,
                    config: this.state.Controls[key]
                });
            }

            filter = (
                filterArray.map(filterElement => (
                    <Input 
                        key={filterElement.id}
                        label={filterElement.id}
                        class={"Clear"}
                        elementType={filterElement.config.elementType}
                        elementConfig={filterElement.config.elementConfig}
                        value={filterElement.config.value}
                        invalid={!filterElement.config.valid}
                        shouldValidate={filterElement.config.validation}
                        touched={filterElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, filterElement.id)} />
                ))
            );
        }

        let trackMap = null;
        if( this.state.RelayNodes ){
            if( this.state.Controls.Nodes.value === 'select' ){
                trackMap = <h3 style={{color: "rgb(2, 61, 32)"}}>Select a Node</h3>
            }
            else if( this.state.Controls.Nodes.value != null  ){
                for(let key in this.state.RelayNodes){
                    if( this.state.RelayNodes[key].id === this.state.Controls.Nodes.value ){
                        const arr = [ this.state.RelayNodes[key].Coordinates.latitude, this.state.RelayNodes[key].Coordinates.longitude ];
                        trackMap = 
                            <ReactBingmaps 
                                mapTypeId = {"road"}
                                zoom = {7}
                                bingmapKey = "AuIjk7fl6IjgdIgBsz10779RYIKHdLkzdkej9jZhJKmaJlZY093Z6CazJRjhqvVe" 
                                center = {arr}
                                pushPins = {[{
                                    "location":arr,
                                    "option":{ color: 'blue' },
                                    "addHandler": {"type" : "click", callback: this.callBackMethod }
                                }]}
                                infoboxes = {[{
                                        "location":arr,
                                        "option":{ title: this.state.RelayNodes[key].id, description: 'Time' },
                                        "addHandler": {"type" : "click", callback: this.callBackMethod}
                                }]}
                            > 
                            </ReactBingmaps>;
                    }
                };
            }else{
                trackMap = <h3 style={{color: "rgb(2, 61, 32)"}}>Select a Node</h3>
            }
        };


        return(
            <Aux>
                <div className={classes.TrackBg} >
                    <div className={classes.Title}>
                        <h1>Track Vehicles</h1>                    
                    </div>
                    <div className={classes.Main}>
                        <div className={classes.Left} >
                            {filter}
                        </div>
                        <div className={classes.Right} >
                            {trackMap}
                        </div>
                    </div>
                </div>
            </Aux>
        );
        
    };
}

export default Track;