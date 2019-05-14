// import React, {Component} from 'react'

// class EditUser extends Component {
//     constructor(){
//         super();
//         this.state = {
//             allUsers: [],
//             currentUser: ''
//         }
//     }
//     componentDidMount = () => {
//         this.allUsers()
//     }
//     allUsers = () => {
//        // console.log(this.props, 'props her eyo')
//         this.setState({
//             allUsers: this.props.allUsers,
//             currentUser: this.props.currentUser
//         })
//         //console.log(this.state.allUsers, 'new state yo')
//     }
    
    
//     render() {
      
//         return(
//             <div key= {this.state.currentUser._id}> 
//             Edit User:
//             <form> 
//             Username:    <input type = 'text'  value ={this.props.currentUser.username}/> <br></br>
//             Password:    <input type = 'text' value ={this.props.currentUser.password}/> <br></br>
//             Email:       <input type = 'text' value ={this.props.currentUser.email}/> <br></br>
//                          <input type='submit'/> 
//             </form> 
//         <button onClick = {this.props.deleteUser.bind(null,this.props )}> Delete User</button>
           
//         </div>
//         )
//     }
// }


// export default EditUser

// // FOR EDIT
// //value ={props.currentUser.password}
