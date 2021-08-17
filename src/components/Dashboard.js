import React, { Component } from 'react'
import '../index.css'
import generatePassword from '../utils/passwordGenerator'
import axios from 'axios';
import QuizmasterDash from './QuizmasterDash';
import AdminDash from './AdminDash';


import { connect } from 'react-redux';



class Dashboard extends Component {
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
            password: this.state.password
        }
        try {
            if (this.state.nameValue && this.state.password) {
                axios.post('http://localhost:3001/api/v1/user', data, {headers: {'Authorization': sessionStorage.getItem('token')}});
            }
        } catch (error) {
            console.error(error)
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
        const headerTitle = this.props.stateProps.isAdmin === true ? 'Admin' : 'Quizmaster';
        const dashView = this.props.stateProps.isAdmin === true ? <AdminDash /> : <QuizmasterDash />;


        return (

            <div className="dashboard-view">
                <div className='header'>
                    <h3>{headerTitle}</h3>
                    <span></span>
                </div>
                {dashView}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        stateProps : state
    }
}


export default connect(mapStateToProps)(Dashboard);
