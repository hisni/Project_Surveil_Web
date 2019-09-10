import React, { Component } from 'react';
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
        var Data = [];
    
        if( this.state.posts ){
            this.state.posts.map(post => {
                Data.push({
                    id: post.id,
                    temp: post.Temperature,
                    pres: post.Pressure,
                    humi: post.Humidity,
                    stab: post.Stability
                });
                return null;
            });
        }

        Data = Data.slice(-7);

        return(
            <Aux>
                <div className={classes.bg}>
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
                </div>
            </Aux>
        );
        
    };
}

export default Posts;