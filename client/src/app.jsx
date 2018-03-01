import React from 'react';
import InfoList from './infoList.jsx';
import Map from './map.jsx';

var App = (props) => { //props: restaurant object

  return (
    <div className="app">
      <InfoList restaurant={props.restaurant} />
      <Map geometry={props.restaurant.geometry} />
    </div>
  );
};

export default App;
