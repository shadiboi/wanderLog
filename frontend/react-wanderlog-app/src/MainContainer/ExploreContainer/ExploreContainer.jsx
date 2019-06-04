import React, {Component} from 'react'
import { CardGroup,Row, Col, Card, CardImg, CardText} from 'reactstrap';


import 'bootstrap/dist/css/bootstrap.min.css';




class ExploreContainer extends Component {
    constructor (props){
        super(props);
        this.state = {
          allEntries: []
        }
    }

    componentDidMount = () => {
        this.getAllEntries()
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
  

    render(){
        const allEntries = this.state.allEntries.map((entries)=> {
            console.log(entries,'<<<<<<<<<<<<ENTRIES<<<<<<<<,,,')
            return (
            <div key = {entries._id}>
            <Row>
                <Col sm='9'>
                    <CardGroup>
                        <Card class= 'entries-card'>
                            <CardImg top width="100%" src={entries.photo} alt="No photo available. Click 'Edit Entry' add" />
                            <h2>{entries.title}</h2>
                            <h6>{entries.date}</h6>
                            <CardText>{entries.description}</CardText>
                            <p>Author: {
                                entries.owner
                            }</p>
                        </Card>
                    </CardGroup>
                 </Col>
            </Row>
            </div>
            
            )
        })
        
        return(
            <div >
              <h1>WanderLog Community</h1>
               {allEntries}
              
            </div>
        )
    }
}

export default ExploreContainer;


