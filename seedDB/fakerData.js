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
  let min = hours % 100;
  return `${hr < 10 ? '0' : ''}${hr}:${min < 10 ? '0' : ''}${min} ${hr < 12 ? 'AM' : 'PM'}`;
}

const openHoursText = (periods) => {
  let text = [];
  for (var i = 0; i < periods.length; i++) {
    let hours = periods[i];
    let dayText = `${numberToDay(hours.open.day)}: ${militaryTimeToText(hours.open.time)} – ${hours.open.day !== hours.close.day ? numberToDay(hours.close.day) + ' ' : ''}${militaryTimeToText(hours.close.time)}`
    text.push(dayText);
  }
  return text;
}

const randomWeeklyHours = () => {
  let days = [0, 1, 2, 3, 4, 5, 6];
  for (var i = 0; i < 10; i++) {
    if (i === 6) {
      let swap = days[6];
      days[6] = days[0];
      days[0] = swap;
    } else {
      let swap = days[i];
      days[i] = days[i + 1];
      days[i + 1] = swap;
    }
  }
  let openHours = [];
  let daysOpen = Math.floor(Math.random() * days.length);
  for (var k = 0; k < daysOpen; k++) {
    openHours.push(randomHours(k));
  }
  return {periods: openHours, text: openHoursText(openHours)};
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

const fakerRestaurant = (i) => {
  let lat = Faker.Address.latitude();
  let lon = Faker.Address.longitude();
  let hours = randomWeeklyHours();
  let result = {result: {
    place_id: i.toString(), //numbers 1-10mil
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

console.log(JSON.stringify(fakerRestaurant(1)));