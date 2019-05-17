import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Switch, Route, Link} from 'react-router-dom';



class NewEntryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        entries: [],
        currentUser: ''
    };

    this.toggle = this.toggle.bind(this);
}
componentDidMount = () => {
    this.getLocation();
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
    this.props.newEntry(this.state);
}

getLocation = async () => {
    await navigator.geolocation.getCurrentPosition((locationInfo) => {
        this.setState({
            latitude: locationInfo.coords.latitude ,
            longitude: locationInfo.coords.longitude
        })
    })
}


render() {


return (
    <div>
    <Link style={{textDecoration: 'none', color:'white', fontSize: "20px", letterSpacing: '2px'}} onClick={this.toggle}>{this.props.buttonLabel}Create New Entry</Link>
    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>New Entry</ModalHeader><br></br>
        <ModalBody>
        <form onSubmit={this.handleSubmit}>
        Title: <input onChange={this.handleChange} type="text" name="title"/>
        <br></br>
        Date: <input onChange={this.handleChange} type="date" name="date"/>
        <br></br>
        Description: <input class='entryDescription' onChange={this.handleChange} type="text" name="description"/>
        <br></br>
        Photo (optional): <input onChange={this.handleChange} type="text" name="photo"/>
        <br></br>    
        <Button type = 'submit'color="primary" onClick={this.toggle}>Create Entry</Button>{' '} </form>     
        </ModalBody>

    </Modal>
    </div>
);
}
}

export default NewEntryModal;


