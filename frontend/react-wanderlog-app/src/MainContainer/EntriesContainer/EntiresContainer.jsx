import React, {Component} from 'react'
import { UncontrolledAlert ,CardGroup,Row, Col, Card, CardImg, CardText, CardBody, CardTitle,  Button} from 'reactstrap';
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
            // editedEntriesArray: [],
            // allEditedEntriesArray: [],
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
           this.props.getAllEntries(this.state.allEntries)
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
            console.log(formData, "FORM DATA<<<<<<<<<<<<<<<<<<")
            const newEntry = await fetch("http://localhost:9000/entries", {
                method: 'POST',
                body: JSON.stringify(formData),
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await newEntry.json();
            if(parsedResponse.status === 200){
            this.setState({
                    userEntries: [...this.state.userEntries, parsedResponse.data],
                    allEntries: [...this.state.allEntries, parsedResponse.data]
                })
            this.getUserEntries();
            this.props.getAllEntries(this.state.allEntries)

        }
    }
 

    editEntry = async (entryToEdit)  => {
 
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
        const editedEntriesArray = this.state.userEntries.map((entry) => {
        if(entry._id === entryToEdit.id){

                entry = parsedResponse.data;

            }
            return entry
        });

        const allEditedEntriesArray = this.state.allEntries.map((entry) => {
            if(entry._id === entryToEdit.id){
    
                    entry = parsedResponse.data;
    
                }
                return entry
        });
        console.log(editedEntriesArray)
        this.setState({
            userEntries: editedEntriesArray,
            allEntries: allEditedEntriesArray
        });
        this.props.getAllEntries(this.state.allEntries);
        this.getUserEntries();
        }catch(err){
        console.log(err);
        }
    }

    deleteEntry = async (entryToEdit) => {
        
        try {
            console.log(this.state)
            const deletedEntry = await fetch('http://localhost:9000/entries/' + entryToEdit.id, {
                method: 'DELETE',
                credentials: 'include'
            });
            console.log(deletedEntry, 'deleted entryyyyyyyy')
            const deletedEntryJson = await deletedEntry.json();
            console.log(deletedEntry)
            console.log('---------DELETED ENTRY-----------------------')
            this.setState({
                userEntries: this.state.userEntries.filter((entry) => entry._id !== entryToEdit.id),
                allEntries: this.state.allEntries.filter((entry) => entry._id !== entryToEdit.id)
            })
            this.getUserEntries();
            this.getAllEntries();
            
        } catch (err){
            console.log(err)
        }    
    
    }
       
    render(){

        const userEntries = this.state.userEntries.map((entry, i) => {
           
            return (
             
                <div key = {entry._id}>
                <Row>
                    <Col sm='6'>
                        <CardGroup>
                            <Card class= 'entries-card'>
                                <CardImg top width="100%" src={entry.photo} alt="No photo was uploaded." />
                                <h2>{entry.title}</h2>
                                <h6>{entry.date}</h6>
                                <CardText>{entry.description}</CardText>
                                <EditEntryModal deleteEntry={this.deleteEntry}  getEntryToEdit= {this.getEntryToEdit} editEntry= {this.editEntry} entries = {this.state.userEntries[i]} currentUser= {this.props.currentUser}/>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
                      
                </div>
            )   
        })
    
        const allEntries = this.state.allEntries.map((entries)=> {
            return (
            <div key = {entries._id}>
            <Card>
                <CardBody>
                    <CardTitle>{entries.title} </CardTitle> 
                    <CardText> 
                    Lat:<li>  {entries.latitude} </li> 
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
               <h2 class='user-title' >{this.state.currentUser.username + "'s"+ ' Entries'}</h2>
               <NewEntryModal  currentUser = {this.props.currentUser} newEntry={this.newEntry}/>
                    <UncontrolledAlert style={{width: '45%'}} color="danger">
                        <h6 >Don't forget your daily log!</h6>
                     </UncontrolledAlert>
               <div className="entries-list">
                {userEntries}
               </div>
            </div>
        )
    }
}

export default EntriesContainer

