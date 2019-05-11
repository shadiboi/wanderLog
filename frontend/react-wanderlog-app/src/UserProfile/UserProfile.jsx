import React, {Component} from 'react'

class Entries extends Component {
    constructor (){
        super();
        this.state = {
            username: '',
            entries: []
        }
    }
    render(){
        return(
            <div>
                <h1>You are logged in! finally..</h1>
            </div>
        )
    }
}

export default Entries