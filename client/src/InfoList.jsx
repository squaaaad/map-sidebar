import React from 'react';
import _ from 'underscore';

var InfoList = (props) => {
  var info = { //refactor to include data necessary for google maps
    openingHours: {
      data: props.restaurant.opening_hours,
      icon: 'fas fa-clock fa-lg',
      link: {url: null, newTab: false}
    },
    address: {
      text: props.restaurant.formatted_address,
      icon: 'fas fa-map-marker-alt fa-lg',
      link: {url: null, newTab: false}
    },
    phone: { // <a href="tel:+1 415-775-4700">
      text: props.restaurant.international_phone_number,
      icon: 'fas fa-phone fa-lg',
      link: {url: 'tel:' + props.restaurant.international_phone_number, newTab: false}
    },
    website: {
      text: (new URL(props.restaurant.website)).hostname,
      icon: 'fas fa-globe fa-lg',
      link: {url: props.restaurant.website, newTab: true}
    },
    directions: {
      text: 'Get Directions',
      icon: 'fas fa-compass fa-lg',
      link: {url: props.restaurant.url, newTab: true}
    }
  };

  return (
    <div className="flexbox-col info-list">
      <InfoListElementOpeningHours info={info.openingHours} />
      <InfoListElement info={info.address} />
      <InfoListElement info={info.phone} />
      <InfoListElement info={info.website} />
      <InfoListElement info={info.directions} />
    </div>
  );
};

var InfoListElement = (props) => (
  <div className="flexbox-row info-list-element">
    <div className="info-list-element-icon">
      <i className={props.info.icon} />
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
      showHours: true
    };
  }

  clickHandler(event) {
    this.setState({ showHours: !this.state.showHours });
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

    var openNow = _.some(this.props.info.data.periods, (period) => {
      var timeOpen = Number(period.open.time);
      var timeClose = Number(period.close.time);
      if (period.open.day !== weekdayNow && period.close.day !== weekdayNow) {
        return false;
      } else if (period.open.day === weekdayNow && period.close.day === weekdayNow) {
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
    var range = this.props.info.data.weekday_text[weekdayNow].split(': ')[1];
    var time1;
    var time2;
    if (range.includes(', ')) {
      time1 = range.split(', ')[0];
      time2 = range.split(', ')[1];
    } else {
      time1 = range;
      time2 = null;
    }

    return { time1: time1, time2: time2 };
  }

  render() {
    var openNow = this.getOpenNow();
    var timeRange = this.getTimeRange();

    return (
      <div className="flexbox-col info-list-element">
        <div onClick={this.clickHandler.bind(this)} className="flexbox-row opening-hours-title">
          <div className="info-list-element-icon">
            <i className={this.props.info.icon} />
          </div>
          <div className="flexbox-row info-list-text opening-hours-title">
            <div>
              <div className="periods-element-day">{openNow}</div>
            </div>
            <div>
              <div className="periods-element-time">{timeRange.time1}</div>
              <div className="periods-element-time">{timeRange.time2}</div>
            </div>
          </div>
          <div className="expand-arrow" style={ this.state.showHours ? { transform: 'rotate(0deg)' } : { transform: 'rotate(180deg)' }}>
            <i className="fas fa-angle-down fa-lg"/>
          </div>
        </div>
        <div className="flexbox-col periods" style={ this.state.showHours ? {display: 'none'} : {'display': 'flex'}}>
          <Periods weekdayText={this.props.info.data.weekday_text}/>
        </div>
      </div>
    );
  }
}

var Periods = (props) => {
  var periodDivs = _.map(props.weekdayText, (period, index) => {
    var weekday = period.split(': ')[0];
    var time1;
    var time2;
    if (period.includes(', ')) {
      time1 = period.split(': ')[1].split(', ')[0];
      time2 = period.split(': ')[1].split(', ')[1];
    } else {
      time1 = period.split(': ')[1];
      time2 = null;
    }

    var periodObj = {
      weekday: weekday,
      time1: time1,
      time2: time2
    }

    return (
      <div key={index} className="flexbox-col periods-element">
        <div className="flexbox-row periods-element-part1">
          <div className="periods-element-day">{periodObj.weekday}</div>
          <div className="periods-element-time">{periodObj.time1}</div>
        </div>
        <div className="periods-element-part2">
          <div className="periods-element-time">{periodObj.time2}</div>
        </div>
      </div>
    )

  });
//prop will be weekdayText
  return (
      <div className="flexbox-col periods">
        {periodDivs}
      </div>
  )
}

export {InfoList, InfoListElement, InfoListElementOpeningHours};
