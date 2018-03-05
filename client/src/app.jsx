import React from 'react';
import axios from 'axios';
import { InfoList } from './infoList.jsx';
import MapContainer from './mapContainer.jsx';

var server = location.origin || 'http://localhost:3000';

class App extends React.Component { //props: restaurant object
  constructor(props) {
    super(props);
    this.state = {
      restaurant: null
    };
    this.getRestaurant(props.restaurantId);
  }

  getRestaurant (id) {
    axios.get(server + '/restaurants', {
      params: {
        id: id
      }
    }).then((response) => {
      console.log('received:', response);
      this.setState({ restaurant: response.data.result });
    });
  }

  render() {
    if (!this.state.restaurant) {
      return <div> Loading... </div>;
    } else {
      return (
        <div className="app">
          <InfoList restaurant={this.state.restaurant} />
          <MapContainer geometry={this.state.restaurant.geometry} />
        </div>
      );
    }
  }
}

export { App };
