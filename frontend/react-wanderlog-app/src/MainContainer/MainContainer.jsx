import React, {Component} from 'react'
import EntriesContainer from './EntriesContainer/EntiresContainer';
import MapContainer from './MapContainer/MapContainer';
import ExploreContainer from './ExploreContainer/ExploreContainer';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { TabContent, TabPane, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import EditUserModal from './UserContainer/EditUser/EditUserModal';




class MainContainer extends Component {
    constructor (props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            activeTab: '1',
            collapsed: true,
            currentUser: props.currentUser,
            userEntries: [],
            allEntries:[]
        }
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
    }
    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    componentDidMount = () => {
        this.getUserEntries();
        //this.getAllEntries();
    }

    getEntries = (entries) => {
        this.setState({
          userEntries: entries
        })
    }
    getAllEntries = (entries) => {
        this.setState({
          allEntries: entries
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
           //this.props.getEntries(this.state.userEntries)
    }
    
    render(){
       console.log(this.state, "THIS STATE FORM MAIN")
    
        return(
            <div>
        <div class='profile-nav'>
        <Navbar color="faded" light>
                <NavbarBrand className="mr-auto">Wander Log</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav navbar>
                        <NavItem>
                            <NavLink   href="#"> <EditUserModal  editUser={this.editUser} allUsers = {this.state.allUsers} currentUser = {this.state.currentUser} deleteUser= {this.props.deleteUser}/></NavLink> 
                        </NavItem>
                        <NavItem>
                            <a  style={{textDecoration: 'none', color: 'grey'}} href="http://www.google.com/flights" target='_blank'>Fly </a>
                        </NavItem>
                        <NavItem>
                            <NavLink style={{textDecoration: 'none', color: 'grey'}} href=""onClick= {this.logout}>Logout</NavLink> 
                        </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
        </div>

        {/* <UserContainer currentUser = {this.props.currentUser}/>  */}

                <Nav tabs>
        <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}>
                Entries
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }} >
                Map
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTab === '3' })}
                onClick={() => { this.toggle('3'); }}>
                Explore
            </NavLink>
        </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
        <TabPane style={{background: '#EFEFEF'}} tabId="1">
        <Row>
            <Col sm="12">
                <div class='entries'>
                    <EntriesContainer getAllEntries={this.getAllEntries} getEntries = {this.getEntries} currentUser = {this.props.currentUser}/>
                </div>
            <footer>@WanderLog</footer>
            </Col>
        </Row>
        </TabPane>
        <TabPane  tabId="2">
                <div class='map'>
                    <MapContainer userEntries= {this.state.userEntries} currentUser = {this.props.currentUser}/>
                </div>
        </TabPane>
        <TabPane style={{background: '#EFEFEF'}} tabId="3">
                <div class='allEntries'>
                    <ExploreContainer allEntries = {this.state.allEntries} getAllEntries = {this.getAllEntries} userEntries= {this.state.userEntries}/>     
                </div>
             <footer>@WanderLog</footer>
        </TabPane>
        </TabContent>
        
            </div>
        )
    }
}

export default MainContainer;

