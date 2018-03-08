import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export var MapContainer = (props) => (
  <div className="sidebar-map-container">
    <Map google={props.google} zoom={16}
      initialCenter={props.geometry.location}
      style={{
        height: '320px',
        width: '280px'
       }} >
      <Marker position={props.geometry.location}
        icon="http://res.cloudinary.com/madlicorice/image/upload/v1520470825/map_icon_small.png"
      />
    </Map>
  </div>
);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBx8Ziw0lS6tVpgKElh6zB9Udsa6mvMUTE'
})(MapContainer);
