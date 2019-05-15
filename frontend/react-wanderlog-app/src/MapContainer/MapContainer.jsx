import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {
    constructor(){
      super();
      this.state = {
        entries:[]
      }
    }
  
  render() {
   const {google} = this.props;
   const entriesList = this.props.entries.map((entries, i) => {
     //console.log(entries[i].latitude, 'FUCKkkkkkkkkkkkkkkkkk')
     return (
       <Marker 
         title = {entries.title}
         position = {{lng: entries[i].longitude, lat: entries[i].latitude}}
         //latitude: 39.735385699999995
          //longitude: -104.9623438
         icon = {{
           url: 'https://cdn3.iconfinder.com/data/icons/family-14/100/family-06-512.png',
           anchor: new google.maps.Point(32,32),
           scaledSize: new google.maps.Size(64,64)
         }}
       />
     )
   })
    return (
         <Map style= {{width: "650px", height: "400px"}} google={this.props.google} zoom={4}>
         {entriesList}
         </Map>
    );
  }
 }

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg')
})(MapContainer)
