import React, { Component } from 'react';
import MastersData from './MastersData';
import axios from 'axios';
import generatePassword from '../utils/passwordGenerator';

class AdminDash extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            users: []
        }
        this.fetchQuizMasters = this.fetchQuizMasters.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handlePasswordGenerator = this.handlePasswordGenerator.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    

    componentDidMount(){
        this.fetchQuizMasters();
    }

    

    async fetchQuizMasters(){
        try {
            const {data, status } = await axios.get(`http://localhost:3001/api/v1/users`, {headers: {'Authorization': sessionStorage.getItem('token')}})
            if(status === 200){
                this.setState({
                    ...this.state,
                    users: data
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    async handleFormSubmit(e){
        e.preventDefault();
        e.target.reset();
        if(this.state.username && this.state.password){
            let users ={
                username: this.state.username,
                password: this.state.password
            }
                try {
                    const {data, status} = await axios.post('http://localhost:3001/api/v1/user', users , {headers: {'Authorization': sessionStorage.getItem('token')}}) ;
                    if(status === 200){
                        this.setState({
                            ...this.state,
                            username: data.username,
                            password: data.password
                        })
                        this.fetchQuizMasters();
                        
                    }
                } catch (error) {
                    console.error(error)
                }
            }else{
                //flash error here
                console.log('Check for valid data')
            }
    }

    handlePasswordGenerator(){
        this.setState({
            password: generatePassword()
        })
    }

    handleInput(e){
        this.setState({
            ...this.state,
           username: e.target.value 
        })
    }

    handlePassword(e){
        this.setState({
            ...this.state,
           password: e.target.value 
        })
    }


    render() {
        return (
            <div>
                 <div className="content-view">
                    <div className='content-table'>
                        <h1>Quizmasters</h1>
                        <div className='quizmasters-table'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Quizmaster</th>
                                        <th>Password</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.users.map((item, key)=>{
                                        return <MastersData key={key} name={item.username} password={item.password} user_id={item.user_id}/>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='content-form'>
                        <div>
                            <h4>Add Quizmasters</h4>
                            <form onSubmit={this.handleFormSubmit} >
                                <div>
                                    <label htmlFor="name">Name: </label>
                                    <input type='text' id='name' value={this.state.username} onChange={this.handleInput} required />
                                </div>
                                <div>
                                    <label htmlFor="password">Password: </label>
                                    <input type='text' id='password' value={this.state.password} onChange={ this.handlePassword} required />
                                </div>
                                <div>
                                    <button onClick={this.handlePasswordGenerator}>Generate</button>
                                </div>
                                <button className='add-quizmaster'>Add Quizmaster</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminDash;
