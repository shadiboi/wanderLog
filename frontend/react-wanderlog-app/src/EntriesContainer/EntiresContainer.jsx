import React, {Component} from 'react'
import {Switch, Route, Link} from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';
//import MapContainer from '../MapContainer/MapContainer';



class EntriesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allEntries: [],
            userEntries: []
        };
    }
    componentDidMount = () => {
        this.getAllEntries();
        this.getUserEntries();
    }

    getAllEntries = async () => {
        const allEntries = await fetch('http://localhost:9000/entries', {
            method: 'GET',
            credentials: 'include'
          })
          const parsedResponse = await allEntries.json();
          //console.log(parsedResponse, 'all users parsed resp')

          if(parsedResponse.status === 200){
            this.setState({
              allEntries: parsedResponse.data
            })
           }  
    }
    getUserEntries = async () => {
        const userEntries = await fetch('http://localhost:9000/entries/' + this.props.currentUser._id, {
            method: 'GET',
            credientials: 'include'
        })
        const parsedResponse = await userEntries.json();
        //console.log(parsedResponse, 'parsed resp>>>>>>>>>>>>>>>>>>>>')
        if(parsedResponse.status === 200){
            this.setState({
              userEntries: [parsedResponse.data]
            })
           }  
          // console.log(this.state.userEntries, 'check this out!!!!!')

    }
    
    
    render(){
        
        const userEntries = this.state.userEntries.map((entries) => {
          
            return (
                <div key = {entries._id}>
                <li>{entries[0].title} </li>
                <button>Edit Entry</button>
                </div>
            )   
        })
    
        const allEntries = this.state.allEntries.map((entries)=> {
            return (
            <div key = {entries._id}>
            <li>  {entries.title} </li> 
            Lat:<li>  {entries.latitude} </li> 
            Long:<li>  {entries.longitude} </li> 
             <button>Edit Entry</button>
            </div>
            )
        })
       
        return(
            <div>
               <h1>user entries container</h1>

                    <ul>{userEntries}</ul> 
                    <h1>all entries </h1>
                    <ul>{allEntries}</ul> 
                    
               
              
            </div>
        )
    }
}

export default EntriesContainer
