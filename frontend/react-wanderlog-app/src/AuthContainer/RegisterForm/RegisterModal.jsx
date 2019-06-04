import React from 'react';
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import { Link} from 'react-router-dom';
const classNames = require('classnames');


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
        <Link  style={{textDecoration: 'none', letterSpacing: '2px'}} onClick={this.toggle}>{this.props.buttonLabel}REGISTER</Link>
        <Modal  style={{maxWidth: '50vh'}}  isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
          <form onSubmit={this.handleSubmit}>
            Username: <input onChange={this.handleChange} type="text" name="username"/>
            <br></br>  <br></br>
            Password: <input onChange={this.handleChange} type="password" name="password"/>
            <br></br>  <br></br>
            Email: <input onChange={this.handleChange} type="email" name="email"/>
            <br></br>  <br></br>
            <Button type = 'submit'color="primary" onClick={this.toggle}>Register</Button>  </form>         
            </ModalBody>
            
        </Modal>
      </div>
    );
  }
}

export default RegisterModal;
