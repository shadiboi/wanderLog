import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Switch, Route, Link} from 'react-router-dom';


class RegisterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      username: '',
      password: ''
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  
  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value,
    })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleRegister(this.state);
    }

  render() {
    return (
      <div>
        <Link onClick={this.toggle}>{this.props.buttonLabel}REGISTER</Link>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
          <form onSubmit={this.handleSubmit}>
            Username: <input onChange={this.handleChange} type="text" name="username"/>
            <br></br>
            Password: <input onChange={this.handleChange} type="password" name="password"/>
            <br></br>
            Email: <input onChange={this.handleChange} type="email" name="email"/>
            <br></br>
            <Button type = 'submit'color="primary" onClick={this.toggle}>Register</Button>  </form>         
            </ModalBody>
            
        </Modal>
      </div>
    );
  }
}

export default RegisterModal;
