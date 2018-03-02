import ReactDOM from 'react-dom';
import React from 'react';
import restaurant from '../../restaurants_data_small.js';
import { App } from './app.jsx';

ReactDOM.render(<App restaurant={restaurant.result} />, document.getElementById('app'));
