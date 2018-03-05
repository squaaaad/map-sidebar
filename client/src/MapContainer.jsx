import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="map-container">
        <div id="map" className="map">
          <Map google={this.props.google} zoom={16}
            initialCenter={this.props.geometry.location}
            style={{ height: '350px', width: '350px' }} >
            <Marker position={this.props.geometry.location} />
          </Map>
        </div>
      </div>
    );
  }

}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyBx8Ziw0lS6tVpgKElh6zB9Udsa6mvMUTE'
})(MapContainer)
