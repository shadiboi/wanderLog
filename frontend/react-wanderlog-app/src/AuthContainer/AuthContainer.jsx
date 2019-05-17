import React, {Component} from 'react';
// import LoginForm from './LoginForm/LoginForm';
// import RegistrationForm from './RegisterForm/RegisterForm';
import { Nav, NavItem, NavLink, Jumbotron, Container } from 'reactstrap';
import {Switch, Route, Link} from 'react-router-dom';
import LoginModal from './LoginForm/LoginModal';
import RegisterModal from './RegisterForm/RegisterModal'
import 'bootstrap/dist/css/bootstrap.min.css';




class AuthContainer extends Component {
    constructor(){
        super();
        this.state = {
            loggedIn: false,
            currentUser: null
        }
    }
    
    
    render(){
        return(
            <div class = 'authContainer'>
      
            <div class = 'navBarAuth'>
        <Nav>
            <NavLink><LoginModal handleLogin = {this.props.handleLogin} />
            </NavLink> <NavLink> <RegisterModal handleRegister = {this.props.handleRegister} /></NavLink>
        </Nav>  

        <Jumbotron class = 'jumbotron'>
                <Container>
                    <h1>Welcome to WanderLog! </h1>
                    <h5> Your personal online travel journal </h5><br></br>
                     <p> Keeping track of your journal logs has never been so easy!<br></br> WanderLog allows you to keep track of your travels logs through text, photo, and even an interactive world map. </p>

                </Container>
        </Jumbotron>;
            </div>
            </div>
        )
    }
}

export default AuthContainer



