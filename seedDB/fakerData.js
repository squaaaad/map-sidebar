const Faker = require('Faker');

const numberToDay = (n) => {
  let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return days[n];
}

const randomTime = () => {
  let time = Math.floor(Math.random() * 24) * 100 + Math.floor(Math.random() * 60);
  if (time === 0) {
    return '00';
  } else if (time < 100) {
    return '00' + time.toString();
  } else if (time < 1000) {
    return '0' + time.toString();
  }
  return time.toString();
}

const randomHours = (day) => {
  let timeOne = randomTime();
  let timeTwo = randomTime();
  return {
    open: {
      day: day,
      time: timeOne < timeTwo ? timeOne : timeTwo
    },
    close: {
      day: day,
      time: timeTwo > timeOne ? timeTwo : timeOne
    }
  };
}

const militaryTimeToText = (hours) => {
  let hr = Math.floor(hours / 100);
  let evening = hr < 12 ? 'AM' : 'PM';
  if (hr > 12) {
    hr = hr - 12;
  }
  if (hr === 0) {
    hr = '12';
  }
  let min = hours % 100;
  if (min < 10) {
    min = '0' + min;
  }
  return `${hr}:${min} ${evening}`;
}

const openHoursText = (hours, day) => {
  if (hours) {
    return `${numberToDay(hours.open.day)}: ${militaryTimeToText(hours.open.time)} – ${hours.open.day !== hours.close.day ? numberToDay(hours.close.day) + ' ' : ''}${militaryTimeToText(hours.close.time)}`;
  } else {
    return `${numberToDay(day)}: -`;
  }
}

const randomWeeklyHours = () => {
  let openHours = [];
  let openText = [];
  for (var i = 0; i < 7; i++) {
    let tenPercentChance = (0.1 > Math.random());
    if (tenPercentChance) {
      openText.push(openHoursText(null, i));
    } else {
      let hours = randomHours(i);
      openHours.push(hours);
      openText.push(openHoursText(hours));
    }
  }
  return {periods: openHours, text: openText};
}

const googleMapsLink = (lat, lon) => (`https://maps.google.com/?q=${lat},${lon}`);

const intlFormatPhoneNum = (phone) => {
  let hasCountryCode = phone.slice(1,1) === '-' && phone.length > 11;
  let countryCode = hasCountryCode ? '+' + phone.slice(0,1) + ' ' : '+1 ';
  let ext = phone.indexOf('x');
  let number = ext === -1 ? phone.slice(-12) : phone.slice(ext - 13, ext - 1);
  number = number.replace(/\./g, '-');
  number = number.replace(/\(/g, '');
  number = number.replace(/\)/g, '-');
  return countryCode + number;
}

const fakerRestaurant = (i, indexStart) => {
  //console.log('indexStart', indexStart);
  
  let index = indexStart + i;
  //console.log('i', index.toString());
  let id = (index + 1).toString();
  let lat = Faker.Address.latitude();
  let lon = Faker.Address.longitude();
  let hours = randomWeeklyHours();
  let result = {result: {
    _id: id,
    place_id: id, //numbers 1-10mil
    name: Faker.Company.companyName(),
    formatted_address: Faker.Address.streetAddress(), //number and street
    international_phone_number: intlFormatPhoneNum(Faker.PhoneNumber.phoneNumber()),  //+1 9 digit
    website: 'http://github.com/seanlangbrown', //website of business
    url: googleMapsLink(lat, lon),//link to google maps location (for directions)
    opening_hours: {
      open_now: true, //???why store
      periods: hours.periods, //array of objects
      weekday_text: hours.text, //Array of strings representing periods above
    },
    geometry: {
      location: {
        lat: Number(lat),
        lng: Number(lon)
      }
    }
  }};
  return result;
};

const fakeData = (i, indexStart) => {
  let results = [];
  indexStart = indexStart || 0;
  for (var j = 1; j < i + 1; j++) {
    results.push(fakerRestaurant(j, indexStart));
  }
  return results;
}


module.exports.fakeData = fakeData;
module.exports.fakeItem = fakerRestaurant;