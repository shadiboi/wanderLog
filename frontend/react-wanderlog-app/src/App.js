import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
//mport { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import User from './UserContainer/UserContainer';
//import {Switch, Route, Link } from 'react-router-dom';
import AuthContainer from './AuthContainer/AuthContainer'



class App extends Component {
  constructor (){
    super()
    this.state = {
      loggedIn: false,
      currentUser: null
    }
  }
  
  componentDidMount = () => {
    //this.handleRegister()
    //this.props.history.push('/')
  }
  handleRegister = async (formData) => {
      const newUserResponse = await fetch("http://localhost:9000/users", {
        method: "POST",
        body: JSON.stringify(formData),
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        }
    })
    const parsedResponse = await newUserResponse.json();
    //console.log(parsedResponse);
    if(parsedResponse.status === 200){
        this.setState({
            loggedIn: true,
            currentUser: parsedResponse.data.username
        })
    }
  }
deleteUser = async (user, e) => {
        console.log('delete hit')
        console.log(user, 'this is user from delete container')
        //e.preventDefault();

        // console.log(user, 'id hereeeeeeeeeeeee')
        // console.log(e, 'e hereeeeeeeeeeeee')
        try {
            const deleteUser = await fetch('http://localhost:9000/users/' + user.currentUser._id, {
                method: 'DELETE',
                credentials: 'include'
              });
        console.log(deleteUser, 'deleted userrrrrrrrr')
              } catch (err){
        console.log(err)
        }
        this.setState({
            loggedIn: false,
            currentUser: null
        })
        //currently if you delelete a user and make a new 
        //one it will say this.state.username or whatever is undefined. Will try and fix later
}
handleLogin = async (formData) => {
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

      if(parsedLoginResponse.status === 200){
        this.setState({
          loggedIn: true,
          currentUser: parsedLoginResponse.data
          // keeping current user as username during testing. 
          // Will change to user _id when lanched to avoid showing password
        })
      } else {
        console.log("Username or Password does not exist")
      }

    } catch(err){
      console.log(err)
    }
  }
  logout = async ()=> {
    console.log('logout button wokring')
    this.setState({
      loggedIn: false,
      currentUser: null
    })
  }

  render () {
      return (
      <div className="App">
        <h1> Welcome to WanderLog! </h1>
        {this.state.loggedIn ?
        
        <User deleteUser = {this.deleteUser} logout = {this.logout} currentUser = {this.state.currentUser}/>
      :  
      <AuthContainer handleLogin = {this.handleLogin} handleRegister = {this.handleRegister}/>
       }
      
      </div>
  );
}
}


export default App;
