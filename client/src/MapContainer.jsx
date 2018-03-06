import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="map-container">
        <Map google={this.props.google} zoom={16}
          initialCenter={this.props.geometry.location}
          style={{
            height: '320px',
            width: '300px'
           }} >
          <Marker position={this.props.geometry.location} />
        </Map>
      </div>
    );
  }

}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyBx8Ziw0lS6tVpgKElh6zB9Udsa6mvMUTE'
})(MapContainer)
