import React, {Component} from 'react'
import { CardGroup,Row, Col, Card, CardImg, CardText} from 'reactstrap';


import 'bootstrap/dist/css/bootstrap.min.css';




class ExploreContainer extends Component {
 
  

    render(){
        let allEntries = this.props.allEntries.filter((entries) => entries.public).map((entries, i)=> {

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
                                entries.owner.username
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
              <h1 class='explore-title'>WanderLog Community</h1>
               {allEntries}
              
            </div>
        )
    }
}

export default ExploreContainer;


