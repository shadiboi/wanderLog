import React, {Component} from 'react';
// import LoginForm from './LoginForm/LoginForm';
// import RegistrationForm from './RegisterForm/RegisterForm';
import { Nav, NavItem, NavLink } from 'reactstrap';
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
            <div class = 'navBar'>
        <Nav>
            <NavLink href="#">Home</NavLink> <NavLink href="#">About</NavLink> <NavLink><LoginModal handleLogin = {this.props.handleLogin} />
            </NavLink> <NavLink> <RegisterModal handleRegister = {this.props.handleRegister} /></NavLink>
        </Nav>  

       
            </div>
        )
    }
}

export default AuthContainer



