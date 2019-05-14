import React, {Component} from 'react'
import EditUser from './EditUser/EditUser';
import {Switch, Route, Link} from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';
import EditUserModal from './EditUser/EditUserModal';
import NewEntryModal from './NewEntryModal/NewEntryModal'


class User extends Component {
    constructor (){
        super();
        this.state = {
            allUsers: [],
            currentUser: "",
            entries: [],
        }
    }
    
    componentDidMount(){
        this.getUser();
        this.getAllUsers();
    }

    getUser = async () => {
        const currentUser = await fetch("http://localhost:9000/users/current", {
            credentials: 'include'
          })
          const parsedResponse = await currentUser.json();
         // console.log(parsedResponse, 'parsed resonse here bbiiiiiii')
          if(parsedResponse.status === 200){
            this.setState({
              currentUser: parsedResponse.data,
            })
            // console.log(this.props, "props hereeeeeeeeee")
          }
    }

    getAllUsers = async () => {
        const allUsers = await fetch('http://localhost:9000/users/all', {
            credentials: 'include'
          })
          const parsedResponse = await allUsers.json();
          //console.log(parsedResponse, 'all users parsed resp')

          if(parsedResponse.status === 200){
            this.setState({
              allUsers: parsedResponse.data
            })
        }  
    }
    newEntry = async (formData) => {
        //console.log(formData)
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
        console.log(parsedResponse);
        if(parsedResponse.status === 200){
        this.setState({
            entires: [...this.state.entries, 
            parsedResponse]
        })
    }
}



    render(){
        const allUsers = this.state.allUsers.map((users)=> {
            return (
            <div key = {users._id}>
            <li>  Username: {users.username} </li> 
            <li>  Entries: {users.entries} </li> 
            </div>
            )
        })

        return(
            <div>
                <Nav>
                <NavLink href="#"><NewEntryModal newEntry={this.newEntry}/></NavLink> <NavLink href="#"> <EditUserModal allUsers = {this.state.allUsers} currentUser = {this.state.currentUser} deleteUser= {this.props.deleteUser}/>
                    </NavLink> <NavLink href=""onClick= {this.props.logout}>Logout</NavLink>
                </Nav> 

                <h1>You are logged in! This will be  {this.state.currentUser.username + "'s" + ' page'} </h1><br></br>

                    <h4> All User index (for testing)</h4>
                    <ul> {allUsers}</ul>
            </div>
        )
    }
}

export default User

