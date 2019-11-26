import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Monitor.css';
import Input from '../../components/UI/Input/Input';


class Monitor extends Component {
    state = {
        posts: null,
        Count:0,
        Update:false,
        // RelayNodes: null,
        // coordinates: null,
        Controls: {
            Node: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: "en1001", displayValue: "en1001" },
                        // { value: "en1002", displayValue: "en1002" }
                    ]
                },
                value: 'en1001',
                validation: {},
                valid: true
            }
        },
    }

    componentDidMount () {
        setInterval(() => this.forceUpdate(), 5000);

        var ID = this.state.Controls.Node.value;

        axios.get( 'https://co321project-e273b.firebaseio.com/Readings/rn1001/'+ID+'.json' )
        .then( response => {
            const fetchedPosts = [];
            for(let key in response.data){
                fetchedPosts.push({
                    ...response.data[key],
                    id: key
                });
            }
            this.setState({posts: fetchedPosts});
        } );
    }

    fetch = () =>{
        var ID = this.state.Controls.Node.value;
        
        axios.get( 'https://co321project-e273b.firebaseio.com/Readings/rn1001/'+ID+'.json' )
        .then( response => {
            const fetchedPosts = [];
            for(let key in response.data){
                fetchedPosts.push({
                    ...response.data[key],
                    id: key
                });
            }
            this.setState({posts: fetchedPosts});
        } );
    }

    componentWillUpdate () {
        this.fetch();
        // console.log(this.state.posts);
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
    }

    render() {

        const filterArray = [];
        let filter = null;

        if( this.state.Controls.Node.elementConfig.options.length ){
            
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

        var data = [];
    
        if( this.state.posts ){
            this.state.posts.map(post => {
                data.push({
                    name: post.id,
                    Temperature: post.Temperature,
                    Pressure: post.Pressure,
                    Humidity: post.Humidity,
                    stab: post.Stability
                });
                return null;
            });
        }

        data = data.slice(-5);
        var condition = null;

        for( let key in data){
            if( key === "4" ){
                condition = data[key].stab;
            }
        }

        var cond = null;
        if( condition ){
            cond = <h3>Condition: {condition}</h3>
        }

        return(
            <Aux>
                <div className={classes.bg} >
                    <div className={classes.Filter} >
                        {filter}
                    </div>
                    <div>
                        <div className={classes.Left}>
                            <LineChart
                                width={600}
                                height={300}
                                data={data}
                                margin={{ top: 5, right: 20, left: 20, bottom: 5,}}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="Temperature" stroke="#2E2A57" activeDot={{ r: 8 }} />
                            </LineChart>
                        </div>
                        <div className={classes.Right}>
                            <LineChart
                                width={600}
                                height={300}
                                data={data}
                                margin={{ top: 5, right: 20, left: 20, bottom: 5,}}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="Humidity" stroke="#2E2A57" activeDot={{ r: 8 }} />
                            </LineChart>
                        </div>
                    </div>
                    <div>
                        <div className={classes.Left}>
                            <LineChart
                                width={600}
                                height={300}
                                data={data}
                                margin={{ top: 5, right: 20, left: 20, bottom: 5,}}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="Pressure" stroke="#2E2A57" activeDot={{ r: 8 }} />
                            </LineChart>
                        </div>
                        <div className={classes.Right}>
                            {cond}
                        </div>
                    </div>
                 
                </div>
            </Aux>
        );
        
    };
}

export default Monitor;