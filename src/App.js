import React, { Component } from "react";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Arena from "./components/Arena";
import Login from "./components/Login";
import { connect } from 'react-redux';



class App extends Component {

    

    render() {
        const userAuthenticated = this.props.isAuthenticated === true ? (
            <>
                <Route path="/dashboard" >
                    <Dashboard />
                </Route>
                <Route path="/quiz" >
                    <Arena />
                </Route>
            </>
        ) : <Redirect to='/' />;

        const userNotAuthenticated = this.props.isAuthenticated === false ? ( <Login />) : <Redirect to='/dashboard'/>

        return (
            <Router>
                <div className="App">
                    <div className='main'>
                        <div className='body'>
                            <Switch>
                                <Route exact path="/" >
                                    {userNotAuthenticated }
                                </Route>
                                <Route path={['/quiz', '/dashboard']}>
                                    {userAuthenticated}
                                </Route>

                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }

}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.isAuthenticated
    }
}


export default connect( mapStateToProps)(App);
