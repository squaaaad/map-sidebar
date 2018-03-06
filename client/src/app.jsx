import React from 'react';
import axios from 'axios';
import { InfoList } from './InfoList.jsx';
import MapContainer from './MapContainer.jsx';

var server = location.origin || 'http://localhost:3000';

class App extends React.Component { //props: restaurant object
  constructor(props) {
    super(props);
    this.state = {
      restaurant: props.restaurant
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
    }).catch((err) => {
      console.error('Failed to fetch restaurant data from server:', err);
    });
  }

  render() {
    if (!this.state.restaurant) {
      return <div> Loading... </div>;
    } else {
      return (
        <div className="flexbox-col app">
          <InfoList restaurant={this.state.restaurant} />
          <MapContainer geometry={this.state.restaurant.geometry} />
        </div>
      );
    }
  }
}

export { App };
