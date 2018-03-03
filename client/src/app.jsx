import React from 'react';
import axios from 'axios';
import { InfoList } from './infoList.jsx';
import { Map } from './map.jsx';

var server = location.origin || 'http://localhost:3000';

class App extends React.Component { //props: restaurant object
  constructor(props) {
    super(props);
    this.state = {
      restaurant: props.restaurant
    }
  }

  componentDidMount() {
    this.getRestaurant('ChIJP5PrLYSAhYARBcWhJXs55P4');
  }

  getRestaurant (id) {
    axios.get(server + '/restaurants', {
      params: {
        id: id
      }
    }).then((result) => {
      console.log('received:', result);
    })
  }

  render() {
    return (
      <div className="app">
        <InfoList restaurant={this.state.restaurant} />
        <Map geometry={this.state.restaurant.geometry} />
      </div>
    );
  }
}

export { App };
