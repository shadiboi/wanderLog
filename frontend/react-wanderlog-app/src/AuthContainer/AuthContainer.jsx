import React, {Component} from 'react';
import LoginForm from './LoginForm/LoginForm';
import RegistrationForm from './RegisterForm/RegisterForm';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            loggedIn: false,
            currentUser: null
        }
    }
    render(){
        return(
            <div>
                <LoginForm handleLogin = {this.props.handleLogin}/>
                <br></br>
                <RegistrationForm handleRegister = {this.props.handleRegister}/>
            </div>
        )
    }
}

export default Login 
