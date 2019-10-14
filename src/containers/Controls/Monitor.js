import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Monitor.css';

class Posts extends Component {
    state = {
        posts: null,
        Count:0,
        Update:false,
    }

    componentDidMount () {
        setInterval(() => this.forceUpdate(), 5000);

        axios.get( 'https://co321project-e273b.firebaseio.com/Readings/rn1001/en1001.json' )
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
        axios.get( 'https://co321project-e273b.firebaseio.com/Readings/rn1001/en1001.json' )
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
        console.log(this.state.posts);
    }

    render() {

    // const data = [
    // { name: 'Page A', uv: 4000},
    // { name: 'Page B', uv: 3000},
    // { name: 'Page C', uv: 2000},
    // { name: 'Page D', uv: 2780},
    // { name: 'Page E', uv: 1890},
    // { name: 'Page F', uv: 2390},
    // { name: 'Page G', uv: 3490} ];

        var data = [];
    
        if( this.state.posts ){
            this.state.posts.map(post => {
                data.push({
                    name: post.id,
                    temp: post.Temperature,
                    pres: post.Pressure,
                    humi: post.Humidity,
                    // stab: post.Stability
                });
                return null;
            });
        }

        data = data.slice(-5);

        return(
            <Aux>
                <div className={classes.bg} >
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
                                <Line type="monotone" dataKey="temp" stroke="#2E2A57" activeDot={{ r: 8 }} />
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
                                <Line type="monotone" dataKey="humi" stroke="#2E2A57" activeDot={{ r: 8 }} />
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
                                <Line type="monotone" dataKey="pres" stroke="#2E2A57" activeDot={{ r: 8 }} />
                            </LineChart>
                        </div>
                        {/* <div className={classes.Right}>
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
                                <Line type="monotone" dataKey="humi" stroke="#2E2A57" activeDot={{ r: 8 }} />
                            </LineChart>
                        </div> */}
                    </div>
                </div>
                {/* <div className={classes.bg}>
                    <div className={classes.Table}>
                        <table>
                            <tbody>
                                <tr>
                                    <th>TimeStamp</th>
                                    <th>Temperature</th>
                                    <th>Pressure</th>
                                    <th>Humidity</th>
                                    <th>Stability</th>
                                </tr>
                                {Data.map(row => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td>{row.temp}</td>
                                        <td>{row.pres}</td>
                                        <td>{row.humi}</td>
                                        <td>{row.stab}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> 
                    </div>
                </div> */}
            </Aux>
        );
        
    };
}

export default Posts;