import React from 'react';
import _ from 'underscore';

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
      <InfoListElement info={info.website} />
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
    var weekdayNow = now.getDay() - 1;
    if (weekdayNow === -1) {
      weekdayNow = 6;
    }

    var hours = now.getHours().toString();
    var minutes = now.getMinutes().toString();
    if (minutes.length === 1) {
      minutes = '0' + minutes;
    }
    var timeNow = Number(hours + minutes);
    console.log('timeNow is', timeNow)

    var openNow = _.some(this.props.info.data.periods, (period) => {
      var timeOpen = Number(period.open.time);
      var timeClose = Number(period.close.time);
      console.log('open is', timeOpen, 'close is', timeClose)
      if (period.open.day !== weekdayNow && period.close.day !== weekdayNow) {
        console.log('case 1')
        return false;
      } else if (period.open.day === weekdayNow && period.close.day === weekdayNow) {
        console.log('case 2');
        return timeNow >= timeOpen && timeNow <= timeClose;
      } else if (period.open.day === weekdayNow) {
        return timeNow >= timeOpen;
      } else if (period.close.day === weekdayNow) {
        return timeNow <= timeClose;
      }
    });

    if (openNow) {
      return 'Open';
    } else {
      return 'Closed';
    }
  }

  getTimeRange() {
    var now = new Date(Date.now());
    var weekdayNow = now.getDay() - 1;
    if (weekdayNow === -1) {
      weekdayNow = 6;
    }
    return this.props.info.data.weekday_text[weekdayNow].split(': ')[1];
  }

  render() {
    console.log(this.props);
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

export {InfoList, InfoListElement, InfoListElementOpeningHours};
