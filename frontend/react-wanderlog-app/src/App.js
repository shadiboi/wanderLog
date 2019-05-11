import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './AuthContainer/LoginForm/LoginForm'
import RegistrationForm from './AuthContainer/RegisterForm/RegisterForm';
import Entries from './UserProfile/UserProfile';
import {Switch, Route, Link } from 'react-router-dom';
import AuthContainer from './AuthContainer/AuthContainer'


class App extends Component {
  constructor (){
    super()
    this.state = {
      loggedIn: false,
      currentUser: null
    }
  }
  handleLogin = async (formData) => {
    console.log(formData)
  }

  handleRegister = async (formData) => {
      const response = await fetch("http://localhost:9000", {
        method: "POST",
        body: JSON.stringify(formData),
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        }
    })
    const parsedResponse = await response.json();
    console.log(parsedResponse);
    if(parsedResponse.status === 200){
        this.setState({
            loggedIn: true,
            currentUser: parsedResponse.data
        })
    }
  }
  handleLogin = async (formData) => {
    console.log(formData)
    try {
      const loginResponse = await fetch("http://localhost:9000/login", {
        method: "POST",
        body: JSON.stringify(formData),
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        }
      })
      const parsedLoginResponse = await loginResponse.json();
      console.log(parsedLoginResponse, 'parsed response here ...........');

      if(parsedLoginResponse.status === 200){
        this.setState({
          loggedIn: true,
          currentUser: parsedLoginResponse.data
        })
        console.log(this.state, 'this state here ...........');

      } else {
        console.log("Username or Password does not exist")
      }

    } catch(err){
      console.log(err)
    }
  }
  render () {
      return (
      <div className="App">
        <h1> Welcome to WanderLog! </h1>
        {this.state.loggedIn ?
        <Entries/>
      :  
      <AuthContainer handleLogin = {this.handleLogin} handleRegister = {this.handleRegister}/>
       }
      </div>
  );
}
}


export default App;
