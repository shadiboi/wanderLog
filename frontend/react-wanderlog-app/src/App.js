import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
//mport { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import User from './UserContainer/UserContainer';
import {Switch, Route, Link } from 'react-router-dom';
import { Nav, NavItem, NavLink, Container, Row, Col} from 'reactstrap';
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
        alert("Username or Password does not exist")
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
  editUser = async () => {
 
    try {

      const editedUser = await fetch('http://localhost:9000/users/' + this.state.currentUser._id, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(editedUser),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      const parsedResponse = await editedUser.json();
      console.log(parsedResponse)
       editedUser = this.state.currentUser


      this.setState({
        currentUser: editedUser
      });


    }catch(err){
      console.log(err);
    }

}

  render () {
      return (
      <div className="App">
       
      
        {this.state.loggedIn ?
      <div class = "profile" > 
        <Container>
        <h1 id='title'> WanderLog</h1>
        <div class= 'navBar' > 
              <Row>
                <Col>
                <Nav>
                <NavLink  href="#"> <EditUserModal  editUser={this.editUser} allUsers = {this.state.allUsers} currentUser = {this.state.currentUser} deleteUser= {this.deleteUser}/>
                    </NavLink> <NavLink style={{textDecoration: 'none', color:'white'}} href=""onClick= {this.logout}>Logout</NavLink>
                </Nav> 
                </Col>
              </Row>
        </div>

        
        <div class = 'user'>
              <User deleteUser = {this.deleteUser} logout = {this.logout} currentUser = {this.state.currentUser}/>
        </div>
        <div class='map'>
              <MapContainer  entries = {this.state.entries} currentUser = {this.state.currentUser}/>
        </div>
   
        <div class='entries'>
              <EntriesContainer   getEntries = {this.getEntries} currentUser = {this.state.currentUser}/> 
        </div>

        </Container>
       
      </div> 
      :  
      <div class='loginPage'>
      <div class='authContainer'> 
     
      <AuthContainer handleLogin = {this.handleLogin} handleRegister = {this.handleRegister}/>
      </div>
      </div> 
       }
      
      </div>
  );
}
}


export default App;


{/* <Container>
  <Row>
    <Col sm={8}>sm=8</Col>
    <Col sm={4}>sm=4</Col>
  </Row>
  <Row>
    <Col sm>sm=true</Col>
    <Col sm>sm=true</Col>
    <Col sm>sm=true</Col>
  </Row>
</Container>; */}