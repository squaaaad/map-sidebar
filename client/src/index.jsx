import ReactDOM from 'react-dom';
import React from 'react';
import { App } from './app.jsx';

var restaurantId = 'ChIJP5PrLYSAhYARBcWhJXs55P4';

ReactDOM.render(<App restaurantId={restaurantId} restaurant={null}/>, document.getElementById('app'));
