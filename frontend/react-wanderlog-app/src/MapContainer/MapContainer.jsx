import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditEntryModal from '../EntriesContainer/EditEntryModal/EditEntryModal'


class MapContainer extends Component {
    constructor(){
      super();
      this.state = {
        currentUser: '',
        userEntries:[],
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
      }
    }


  onMarkerClick = (props, marker, e) =>{
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });
  }
onMapClicked = (props) => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    })
  }
};
  render() {

    const {google} = this.props;

   console.log(this.state.activeMarker.name)
    const entriesList = this.props.entries.map((entry) => {   
      
     return (
       <Marker 
         onClick={this.onMarkerClick}
         name = {entry.title}
         date = {entry.date}
         description = {entry.description}
         position = {{lng: entry.longitude, lat: entry.latitude}}
         icon = {{
           url: 'https://cdn3.iconfinder.com/data/icons/family-14/100/family-06-512.png',
           anchor: new google.maps.Point(32,32),
           scaledSize: new google.maps.Size(64,64)
         }}
       > 
      </Marker>
     
     )
   })

    return (
         <Map style= {{width: "650px", height: "400px", display: 'block'}}  onClick={this.onMapClicked} google={this.props.google} zoom={10}  initialCenter={{
          lat: 39.735354099999995,
          lng: -104.962317
        }}>
         {entriesList}
            <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}>
                    <div>
                      <h1>{this.state.activeMarker.name}</h1>
                      <h4>{this.state.activeMarker.date}</h4>
                      <p>{this.state.activeMarker.description}</p>
                    </div>
            </InfoWindow>
         </Map>
    );
  }
 }

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg')
})(MapContainer)