import React, { Component } from 'react';
import Displayboard from './Displayboard';
import AddUser from './AddUser';
import axios from 'axios';
import UserForm from './UserForm';


export default class Contestants extends Component {

    state = {
        passer: [
            {
                name: 'Quiz',
                styler: 'quizzes'
            },
            {
                name: 'Contestants',
                styler: 'contestants'
            }
        ],
        contestants: []

    }

    async fetchData(){
        try{
          let {data, status} = await axios.get('http://localhost:3001/api/v1/contestant', {headers: {'Authorization': sessionStorage.getItem('token')}})
          if(status === 200 && data.data){
              this.setState({
                ...this.state,
                contestants: data.data
              })
          }
        }catch(e){
            console.error(e);
        }
    }

    componentDidMount(){
        this.fetchData();
    }

    render() {
        return (

            <div className='display'>
                <div className='grid-layout'>
                    {this.state.passer.map((item,key) => {
                        return item.name === 'Contestants' ?  <Displayboard key={key} name={item.name} styler={item.styler} ><AddUser /><UserForm /></Displayboard> : <Displayboard key={item} name={item.name} styler={item.styler} />
                    })}
                    <div className='leaderboard'>
                        <h3>Contestants</h3>
                        <div className='leaderboard-display'>
                            <ul>
                            {this.state.contestants.map((item,key)=>{
                                return <li key={key}>{item.name}</li>
                            })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

