import React from 'react';

var InfoList = (props) => {
  var info = { //refactor to include data necessary for google maps
    openingHours: {
      data: props.restaurant.opening_hours,
      icon: 'icons/clock.svg',
      link: {url: null, newTab: false}
    },
    address: {
      text: props.restaurant.formatted_address,
      icon: 'icons/map_marker.svg',
      link: {url: null, newTab: false}
    },
    phone: { // <a href="tel:+1 415-775-4700">
      text: props.restaurant.international_phone_number,
      icon: 'icons/phone.svg',
      link: {url: 'tel:' + props.restaurant.international_phone_number, newTab: false}
    },
    website: {
      text: (new URL(props.restaurant.website)).hostname,
      icon: 'icons/website.svg',
      link: {url: props.restaurant.website, newTab: true}
    },
    directions: {
      text: 'Get Directions',
      icon: 'icons/directions.svg',
      link: {url: props.restaurant.url, newTab: true}
    }
  };

  return (
    <div className="info-list">
      <InfoListElementOpeningHours info={info.openingHours} />
      <InfoListElement info={info.address} />
      <InfoListElement info={info.phone} />
      <InfoListElement info={info.directions} />
    </div>
  );
};

var InfoListElement = (props) => (
  <div className="info-list-element">
    <div className="info-list-element-icon">
      <img src={props.info.icon} />
    </div>
    <div className="info-list-text">
      <a href={props.info.link.url} target={props.info.link.newTab ? '_blank' : ''}>
        {props.info.text}
      </a>
    </div>
  </div>
);

//factor this out into another file
class InfoListElementOpeningHours extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHours: false
    };
  }

  getOpenNow() {
    var now = new Date(Date.now());
    var weekdayNow = now.getDay();
    var period = this.props.info.data.periods[weekdayNow];
    var open = Number(period.open.time);
    var close = Number(period.close.time);

    var hours = now.getHours().toString();
    var minutes = now.getMinutes().toString();
    if (minutes.length === 1) {
      minutes = '0' + minutes;
    }
    var time = Number(hours + minutes);

    var openNow;
    if (time > open && time < close) {
      openNow = 'Open Now';
    } else {
      openNow = 'Closed';
    }

    return openNow;
  }

  getTimeRange() {
    var now = new Date(Date.now());
    var weekdayNow = now.getDay();
    return this.props.info.data.weekday_text[weekdayNow].split(': ')[1];
  }

  render() {
    var openNow = this.getOpenNow();
    var timeRange = this.getTimeRange();

    return (
      <div className="info-list-element">
        <div className="info-list-element-icon">
          <img src={this.props.info.icon} />
        </div>
        <div className="info-list-text">
          {openNow + ' --- ' + timeRange}
        </div>
      </div>
    );
  }
}

export { InfoList, InfoListElement, InfoListElementOpeningHours };
