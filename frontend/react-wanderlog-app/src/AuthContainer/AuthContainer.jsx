import React, {Component} from 'react';
import { Jumbotron, Container ,Button} from 'reactstrap';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import LoginModal from './LoginForm/LoginModal';
import RegisterModal from './RegisterForm/RegisterModal'
import 'bootstrap/dist/css/bootstrap.min.css';


const items = [
    {
      src: 'http://www.fodors.com/images/itineraries/prague-public-square.jpg',

    },
    {
      src: 'https://travel.savacations.com/wp-content/uploads/2016/10/Destinations-Brazil-Tours-Travel24-450x300.jpg',
  
    },
    {
      src: 'https://4.bp.blogspot.com/-Hj6PWHpVaDA/UQiYUwPzhmI/AAAAAAAADJY/0LvpnvkjxYg/s400/%2528Philippines%2529+%25E2%2580%2593Travel+to+Palawan+4.jpg',
    }
];

class AuthContainer extends Component {
    constructor(props){
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.state = {
            collapsed: true,
            activeIndex: 0,
            loggedIn: false,
            currentUser: null
        }
    }
    
    toggleNavbar() {
    this.setState({
        collapsed: !this.state.collapsed
    });
    }
    onExiting() {
        this.animating = true;
    }
    
    onExited() {
    this.animating = false;
    }
    
    next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
    }
    
    previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
    }
    
    goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
    }
    
    render(){
        const { activeIndex } = this.state;
        const slides = items.map((item) => {
            return (
              <CarouselItem
                onExiting={this.onExiting}
                onExited={this.onExited}
                key={item.src}
              >
                <img className="rounded-sm" src={item.src} alt={item.altText} />
                <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
              </CarouselItem>
            );
          });
        return(
         <div class='authContainer'>
            <div class='authNav' >
             <Navbar style={{margin: 'auto'}} color="faded" light>
                <NavbarBrand href="/" className="mr-auto">Wander Log</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav navbar>
                        <NavItem>
                            <NavLink ><LoginModal handleLogin = {this.props.handleLogin} /></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink > <RegisterModal handleRegister = {this.props.handleRegister} /></NavLink>                    </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                
            </div>
                <div>
              <h1></h1>
            </div>
        <div  class='jumbotron'>
               <Jumbotron  >
                        <h1 className="display-4">Welcome to Wander<br></br>Log!</h1>
                        <p className="lead">Your personal online travel journal</p>
                        <hr className="my-2" />
                        <p>Keeping track of your journal logs has never been so easy!WanderLog allows you to keep track of your travels logs through text, photo, and even an interactive world map.</p>
                        <p className="lead">
                        </p>
                </Jumbotron>
         </div>
            <div class='authCarousel'>
                <Carousel
                    activeIndex={activeIndex}
                    next={this.next}
                    previous={this.previous}>
                    <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                </Carousel>
            </div>    
        </div>
   
        )
    }
}

export default AuthContainer



