import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Switch, Route, Link} from 'react-router-dom';


class EditEntryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        entryToEdit: {
            title: props.entries.title,
            description: props.entries.description,
            date: props.entries.date,
            photo: props.entries.photo,
            id: props.entries._id,
        },
        currentUser: ''
    };

    this.toggle = this.toggle.bind(this);
}
// componentDidMount = () => {
//     console.log(this.props, "this props from edit entries")

// }
toggle() {
    this.setState(prevState => ({
        modal: !prevState.modal
    }));
}
  
handleChange = (e) => {
    this.setState({
        entryToEdit: {...this.state.entryToEdit, [e.target.name]: e.target.value},
    })
    this.props.getEntryToEdit(this.state.entryToEdit);
}
handleSubmit = (e) => {
    e.preventDefault();

    this.props.editEntry(this.state.entryToEdit);
}

render() {
    // console.log(this.state.entryToEdit)
    // console.log('------------------------------')

return (
        <div>
        <Link onClick={this.toggle}>{this.props.buttonLabel}Edit Entry</Link>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Edit Entry</ModalHeader>
            <ModalBody>
            <form onSubmit={this.handleSubmit}>
            Title: <input value = {this.state.entryToEdit.title} onChange={this.handleChange} type="text" name="title"/>
            <br></br>
            Date: <input value = {this.state.entryToEdit.date} onChange={this.handleChange} type="date" name="date"/>
            <br></br>
            Description: <input value = {this.state.entryToEdit.description} onChange={this.handleChange} type="text" name="description"/>
            <br></br>
            Photo (optional): <input value = {this.state.entryToEdit.photo} onChange={this.handleChange} type="text" name="photo"/>
            <br></br>    
            <Button type = 'submit'color="primary" onClick={this.toggle}>Edit Entry</Button>{''} 
            <Button color="danger" onClick={this.props.deleteEntry}>Delete Entry</Button>{' '} 
            </form>     
            </ModalBody>

        </Modal>
        </div>
    );
}
}

export default EditEntryModal;


