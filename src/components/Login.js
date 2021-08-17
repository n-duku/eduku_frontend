import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: ''
        }
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }


    handleUsernameInput(e){
        e.preventDefault();
        this.setState({
            ...this.state,
            username: e.target.value
        })
    }

    handlePasswordInput(e){
        e.preventDefault();
        this.setState({
            ...this.state,
            password: e.target.value
        })
    }

    async handleFormSubmit(e){
        e.preventDefault();
        e.target.reset();
        if(this.state.username && this.state.password){
            try {
                const { data, status } = await axios.post('http://localhost:3001/api/v1/login', {username: this.state.username, password: this.state.password });
                if(status === 200){
                    sessionStorage.setItem("token", `Bearer ${data.data}`)
                    sessionStorage.setItem("user_id", data.user_id )
                    sessionStorage.setItem("username", data.username)
                    sessionStorage.setItem("isAdmin", data.isAdmin)
                    this.props.authorizeUser();
                    this.props.setUser({user_id: data.user_id, username: data.username, isAdmin: data.isAdmin});
                
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
    

    render() {
        return (
            <div className='login-page'>
                <div className='login-info'>
                    <h1>THE BEST QUIZMASTER APP </h1>
                    <p>Hey there, Welcome!</p>

                </div>
                <div className="main">
                    <p className="sign" align="center">Sign in</p>
                    <form className="form1" onSubmit={this.handleFormSubmit}>
                        <input className="un" type="text" align="center" placeholder="Username" onChange={this.handleUsernameInput}/>
                        <input className="pass" type="password" align="center" placeholder="Password" onChange={this.handlePasswordInput}/>
                        <button className="submit" align="center">Sign in</button>
                    </form>

                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        ...state
    }
}


const mapDispatchToProps = dispatch => {
    return {
       authorizeUser : ()=> {
            return dispatch({
                type: 'SETAUTH'
            })
        },
        setUser: (payload)=>{
            return dispatch({
                type: 'SETUSER',
                payload
            })
        }
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
