import React, { Component } from 'react';
import axios from 'axios';
import { ReactBingmaps } from 'react-bingmaps';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Track.css';
import Input from '../../components/UI/Input/Input';

class Posts extends Component {

    state = {
        RelayNodes: null,
        coordinates:[],
        Controls: {
            Nodes: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: "select", displayValue: "Select a node" }
                    ]
                },
                value: 'Select a node',
                validation: {},
                valid: true
            }
        },
        Count:0,
        Update:false
    }

    componentDidMount () {

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

        } );
    }

    inputChangedHandler = (event, nodeIdentifier) =>{
        this.resetCount();
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

    resetCount = () =>{
        this.setState({Count: 0});
    }

    render() {

        const filterArray = [];
        let filter = null;

        console.log(this.state.Controls);

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

        if( this.state.posts ){
            // posts = this.state.posts.map(post => {
            //     if( this.state.Controls.Nodes.value === 'select' ){
            //         count = 0;
            //         return null;
            //     }
            //     else{
            //         if( post.District === this.state.Controls.Nodes.value ){
            //             count = count+1;                        
            //             return (
            //                 <Post 
            //                     key={post.id} 
            //                     title={post.postData.Title} 
            //                     type={post.postData.Type}
            //                     contect={post.postData.ContactNo}
            //                     address={post.postData.Address}
            //                     clicked={() => this.postSelectedHandler(post.id,post.District)}/>
            //             );
            //         }
            //         else{
            //             return null;
            //         }
            //     }
            // });

            // if( count === 0){
            //     posts = <h3 style={{color: "rgb(2, 61, 32)"}}>No Posts Found</h3>
            // }
        }

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
                            <ReactBingmaps 
                                mapTypeId = {"road"}
                                zoom = {7}
                                bingmapKey = "AuIjk7fl6IjgdIgBsz10779RYIKHdLkzdkej9jZhJKmaJlZY093Z6CazJRjhqvVe" 
                                center = {[7.2906, 80.7718]}
                                pushPins = {[{
                                    "location":[7.2906, 80.7718],
                                    "option":{ color: 'blue' },
                                    "addHandler": {"type" : "click", callback: this.callBackMethod }
                                }]}
                                infoboxes = {[{
                                        "location":[7.2906, 80.7718],
                                        "option":{ title: 'RN1001', description: 'Time' },
                                        "addHandler": {"type" : "click", callback: this.callBackMethod}
                                }]}
                            > 
                            </ReactBingmaps>
                        </div>
                    </div>

                </div>
                
            </Aux>
        );
        
    };
}

export default Posts;