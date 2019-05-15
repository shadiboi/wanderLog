import React, {Component} from 'react'
import EditUser from './EditUser/EditUser';
import {Switch, Route, Link} from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';
import EditUserModal from './EditUser/EditUserModal';
import NewEntryModal from '../EntriesContainer/NewEntryModal/NewEntryModal'
import MapContainer from '../MapContainer/MapContainer';
import EntriesContainer from '../EntriesContainer/EntiresContainer'



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
        this.getUserEntries();
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
    getUserEntries = async () => {
        const userEntries = await fetch('http://localhost:9000/entries/' + this.props.currentUser._id, {
            method: 'GET',
            credientials: 'include'
        })
        const parsedResponse = await userEntries.json();
        console.log(parsedResponse, 'parsed resp>>>>>>>>>>>>>>>>>>>>')
        if(parsedResponse.status === 200){
            this.setState({
              entries: [parsedResponse.data]
            })
           }  
           console.log(this.state.entries, 'check this out!!!!!')

    }

    render(){
        const allUsers = this.state.allUsers.map((users)=> {
            return (
            <div key = {users._id}>
            <li>  Username: {users.username} </li> 
            </div>
            )
        })
console.log(this.props, 'props hereeeee')
        return(
            <div>
                <div class = 'userNav'>
                <Nav>
                <NavLink href="#"><NewEntryModal currentUser={this.currentUser} /></NavLink> <NavLink href="#"> <EditUserModal allUsers = {this.state.allUsers} currentUser = {this.state.currentUser} deleteUser= {this.props.deleteUser}/>
                    </NavLink> <NavLink href=""onClick= {this.props.logout}>Logout</NavLink>
                </Nav> 
                </div>
                <div class = "userInfo">
                <h1>You are logged in! This will be  {this.props.currentUser.username + "'s" + ' page'} </h1><br></br>
                    <h4> All User index (for testing)</h4>
                    <ul> {allUsers}</ul>
                </div>
                 <div class = "entries">
                 
                    <EntriesContainer currentUser = {this.props.currentUser}/>
                    
                
                </div>
                <div class = "map">
                    <MapContainer entries = {this.state.entries}/>
                    
                </div>
               
               
              
            </div>
        )
    }
}

export default User

