import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditEntryModal from '../EntriesContainer/EditEntryModal/EditEntryModal'


class MapContainer extends Component {
    constructor(){
      super();
      this.state = {
        currentUser: '',
        userEntries:[]
      }
    }
   
    onMarkerClick(props, marker, e) {

      return <EditEntryModal />
     }
  render() {
    const {google} = this.props;
   
    const entriesList = this.props.entries.map((entry) => {   
      
     return (
       <Marker 
         onClick={this.onMarkerClick}
         name = {entry.title}
         position = {{lng: entry.longitude, lat: entry.latitude}}
         icon = {{
           url: 'https://cdn3.iconfinder.com/data/icons/family-14/100/family-06-512.png',
           anchor: new google.maps.Point(32,32),
           scaledSize: new google.maps.Size(64,64)
         }}
        
       />
     )
   })
    return (
         <Map style= {{width: "650px", height: "400px"}} google={this.props.google} zoom={10}  initialCenter={{
          lat: 39.735354099999995,
          lng: -104.962317
        }}>
        
         {entriesList}
         </Map>
    );
  }
 }

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg')
})(MapContainer)
