import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Switch, Route, Link} from 'react-router-dom';


class NewEntryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        entries: {
            title:'',
            description: '',
            date: '',
            latitude: '',
            longitude:''
        },
        currentUser: ''
    };

    this.toggle = this.toggle.bind(this);
}
componentDidMount = () => {
    this.getLocation();
    this.getUser()
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
    this.newEntry(this.state);
}
getUser = async () => {
    const currentUser = await fetch("http://localhost:9000/users/current", {
        credentials: 'include'
      })
      const parsedResponse = await currentUser.json();
     // console.log(parsedResponse, 'parsed resonse here bbiiiiiii')
      if(parsedResponse.status === 200){
        this.setState({
          currentUser: parsedResponse.data._id,
        })
        // console.log(this.props, "props hereeeeeeeeee")
      }
}
getLocation = async () => {
    await navigator.geolocation.getCurrentPosition((locationInfo) => {
        this.setState({
            latitude: locationInfo.coords.latitude ,
            longitude: locationInfo.coords.longitude
        })
    })
}
getLongitude = async () => {
    await navigator.geolocation.getCurrentPosition((locationInfo) => {
        return locationInfo.coords.longitude
        // this.setState({
        //     latitude: [...this.state.entries.latitude,locationInfo.coords.latitude] ,
        //     longitude: [...this.state.entries.longitude,locationInfo.coords.longitude] 
        // })
    })
}
//MOVE TO CONTAINER
newEntry = async (formData) => {
    formData.latitude = this.state.latitude
    formData.longitude = this.state.longitude
    formData.owner = this.state.currentUser
    console.log(formData, 'form data here')
    const newEntry = await fetch("http://localhost:9000/entries", {
        method: 'POST',
        body: JSON.stringify(formData),
        credentials: 'include',
        headers: {
             "Content-Type": "application/json"
        }
    })
    console.log(newEntry)
    const parsedResponse = await newEntry.json();
    console.log(parsedResponse , 'parsed response from new entry');
//     if(parsedResponse.status === 200){
//     this.setState({
//         entires: {
//             title:'',
//             description: '',
//             date: '',
//             latitude: [],
//             longitude:[]
//         }
//     })
// }
}

render() {


return (
    <div>
    <Link onClick={this.toggle}>{this.props.buttonLabel}New Entry</Link>
    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>New Entry</ModalHeader>
        <ModalBody>
        <form onSubmit={this.handleSubmit}>
        Title: <input onChange={this.handleChange} type="text" name="title"/>
        <br></br>
        Date: <input onChange={this.handleChange} type="date" name="date"/>
        <br></br>
        Description: <input onChange={this.handleChange} type="text" name="description"/>
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


