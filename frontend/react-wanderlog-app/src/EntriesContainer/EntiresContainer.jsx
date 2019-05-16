import React, {Component} from 'react'
//import MapContainer from '../MapContainer/MapContainer';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewEntryModal from './NewEntryModal/NewEntryModal';
import EditEntryModal from './EditEntryModal/EditEntryModal'




class EntriesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: props.currentUser,
            allEntries: [],
            userEntries: [], 
            editedEntriesArray: [],
            latitude: '',
            longitude: '',
            entryToEdit: {
                title: '',
                description:'',
                date: '',
                photo:'',
                id:''
            },
        };
    }
    componentDidMount = () => {
        this.getLocation();
        this.getAllEntries();
        this.getUserEntries(); 
     
    }
    getEntryToEdit = (entry) => {
        this.setState({
          entryToEdit: {
              title: entry.title,
              description: entry.description,
              date: entry.date,
              photo: entry.photo,
              id: entry._id
          }
        })
  
    }

    getAllEntries = async () => {
        const allEntries = await fetch('http://localhost:9000/entries', {
            method: 'GET',
            credentials: 'include'
          })
          const parsedResponse = await allEntries.json();

          if(parsedResponse.status === 200){
            await this.setState({
              allEntries: parsedResponse.data
            })
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
    getUserEntries = async () => {
        //console.log(this.props.currentUser._id, 'chekc this bitch out>>>>>>>>>>>>>>>>.')
        const userEntries = await fetch('http://localhost:9000/entries/' + this.props.currentUser._id, {
            method: 'GET',
            credientials: 'include'
        })
        const parsedResponse = await userEntries.json();
        if(parsedResponse.status === 200){
            this.setState({
              userEntries: parsedResponse.data
            })
           } 
           this.props.getEntries(this.state.userEntries)
 
    }
   
    newEntry = async (formData) => {
        formData.latitude = this.state.latitude
        formData.longitude = this.state.longitude
        formData.owner = this.props.currentUser
        //console.log(formData, 'form data here')
        const newEntry = await fetch("http://localhost:9000/entries", {
            method: 'POST',
            body: JSON.stringify(formData),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log('the new one', newEntry)
        const parsedResponse = await newEntry.json();
        console.log('parsed new one', parsedResponse)
        //console.log(parsedResponse , 'parsed response from new entry');
        if(parsedResponse.status === 200){
          this.setState({
                userEntries: [...this.state.userEntries, parsedResponse.data]
            })
        this.getUserEntries();
    }
    }
 

    editEntry = async (entryToEdit)  => {
    //    e.preventDefault();
    //    console.log(entryToEdit)   
    //    console.log('-------------STATE-----------------')
       
    try {

      const editedResponse = await fetch('http://localhost:9000/entries/' + entryToEdit.id, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(entryToEdit),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      const parsedResponse = await editedResponse.json();
      console.log(parsedResponse)
      const editedEntriesArray = this.state.userEntries.map((entry) => {
            console.log(entry)
      if(entry._id === entryToEdit.id){

            entry = parsedResponse.data;

        }

        return entry
      });


      this.setState({
        userEntries: editedEntriesArray
      });


    }catch(err){
      console.log(err);
    }
}
deleteEntry = async () => {

    try {
        const deletedEntry = await fetch('http://localhost:9000/entries/' + this.state.currentUser._id, {
            method: 'DELETE',
            credentials: 'include'
          });
        console.log(deletedEntry, 'deleted entryyyyyyyy')
        const deletedEntryJson = await deletedEntry.json();
          console.log(deletedEntryJson)
          console.log('---------DELETED ENTRY-----------------------')
        this.setState({
            userEntries: this.state.userEntries.filter(deletedEntryJson)
        })
        // this.setState({movies: this.state.movies.filter((movie, i) => movie._id !== id)});
        
    } catch (err){
        console.log(err)
    }
    //CHANGE STATE AFTER ENTRY IS DELETED
    
   
}
    
    
    render(){
        // console.log(this.state)
        // console.log('----LOOK--------------')

        const userEntries = this.state.userEntries.map((entry, i) => {
            return (
                <div key = {entry._id}>
                <Card>
                <CardImg top width="20%" src={entry.photo} alt="Card image cap" />
                <CardTitle>{entry.title}</CardTitle>
                <CardText>{entry.description}</CardText>
                <EditEntryModal deleteEntry={this.deleteEntry}  getEntryToEdit= {this.getEntryToEdit} editEntry= {this.editEntry} entries = {this.state.userEntries[i]} currentUser= {this.props.currentUser}/>
                </Card>
                </div>
            )   
        })
    
        const allEntries = this.state.allEntries.map((entries)=> {
            return (
            <div key = {entries._id}>
            <Card>
                <CardBody>
                    <CardTitle>{entries.title} </CardTitle> 
                    <CardText> Lat:<li>  {entries.latitude} </li> 
                    Long:<li>  {entries.longitude} </li>
                    </CardText>
                <Button/>
            </CardBody>
             </Card> 
            </div>
            )
        })
       
        return(
            <div>
                <NewEntryModal  currentUser = {this.props.currentUser} newEntry={this.newEntry}/>
               <h1>{this.state.currentUser.username + "'s"+ ' Entries'}</h1>
                   {userEntries}
                    {/* <h1>all entries </h1>
                    <ul>{allEntries}</ul>  */}
                    
               
              
            </div>
        )
    }
}

export default EntriesContainer


