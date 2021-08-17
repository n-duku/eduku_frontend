import React, { Component } from 'react';
import axios from 'axios';
import generatePassword from '../utils/passwordGenerator'

class AddContestant extends Component {
    constructor() {
        super();
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.state = {
            nameValue: '',
            password: ''
        }
    }

  

    handleFormSubmit(e) {
        e.preventDefault();
        let data = {
            username: this.state.nameValue,
            password: this.state.password,
            isAdmin: ['contestant']
        }
        if (this.state.nameValue && this.state.password) {
            axios.post('http://localhost:3001/api/v1/contestant', data, {headers: {'Authorization': sessionStorage.getItem('token')}});
        }

    }

    handleInput(e, password) {
        if (password) {
            this.setState({
                ...this.state,
                password: e.target.value
            })

        } else {
            this.setState({
                ...this.state,
                nameValue: e.target.value
            })
        }
    }

    handlePasswordGenerator(e) {
        e.preventDefault();
        let newPassword = generatePassword();
        this.setState({
            ...this.state,
            password: newPassword
        })
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <div>
                    <label htmlFor='name'>Name: </label>
                    <input name='name' type='text' value={this.state.nameValue} onChange={this.handleInput} />
                </div>
                {/* <div>
                    <label htmlFor='roles'>Role: </label>
                    <br />
                    <select name='roles'>
                        <option value='Admin'>Admin</option>
                        <option value='Quizmaster'>Quizmaster</option>
                        <option value='Contestant'>Contestant</option>
                    </select>
                </div> */}
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input type='text' name='password' value={this.state.password} onChange={(e) => { this.handleInput(e, true) }} />
                    <button onClick={(e)=>{ this.handlePasswordGenerator(e, true)}}>Generate Password</button>
                </div>
                <input type='submit' value='Add User' />
            </form>
        );
    }
}

export default AddContestant;
