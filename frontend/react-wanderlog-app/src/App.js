import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
//mport { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import User from './UserContainer/UserContainer';
//import {Switch, Route, Link } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';
import AuthContainer from './AuthContainer/AuthContainer'
import 'bootstrap/dist/css/bootstrap.min.css';
import EntriesContainer from './EntriesContainer/EntiresContainer';
import EditUserModal from './UserContainer/EditUser/EditUserModal'
import MapContainer from './MapContainer/MapContainer'
import NewEntryModal from './EntriesContainer/NewEntryModal/NewEntryModal';



class App extends Component {
  constructor (){
    super()
    this.state = {
      loggedIn: false,
      currentUser: null,
      entries: []
    }
  }
  
  componentDidMount = () => {
    //this.getUserEntries();
    //this.props.history.push('/')
  }
  getEntries = (entries) => {
    this.setState({
      entries: entries
    })
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
            currentUser: parsedResponse.data
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
    this.setState({
      loggedIn: false,
      currentUser: ''
    })
  }

  render () {
      return (
      <div className="App">
        <h1> Welcome to WanderLog! </h1>
      
        {this.state.loggedIn ?
         <div class = 'userProfile'>
         <div class= 'navBar' > 
         <Nav>
         <NavLink href="#">Home</NavLink> <NavLink href="#"> <EditUserModal allUsers = {this.state.allUsers} currentUser = {this.state.currentUser} deleteUser= {this.deleteUser}/>
             </NavLink> <NavLink href=""onClick= {this.logout}>Logout</NavLink>
         </Nav> 
         </div>
        <User deleteUser = {this.deleteUser} logout = {this.logout} currentUser = {this.state.currentUser}/>
        
        <div  class='entries'>
        <EntriesContainer class='entries, float-left'  getEntries = {this.getEntries} currentUser = {this.state.currentUser}/> 
        </div>

        <div class='map'>
        <MapContainer class='entries, float-right'   entries = {this.state.entries} currentUser = {this.state.currentUser}/>
        </div>

        </div>
      :  
      
      <AuthContainer handleLogin = {this.handleLogin} handleRegister = {this.handleRegister}/>
       }
      
      </div>
  );
}
}


export default App;
