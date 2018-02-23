import ReactDOM from 'react-dom';
import React from 'react';
import restaurants from '../../restaurants_data_small.js';
import App from './app.jsx';

ReactDOM.render(<App restaurants={restaurants} />, document.getElementById('app'));
