const redis = require('redis');

const port = 80;

const REDIS_HOST = process.env.REDIS_HOST;

const redisPub = redis.createClient({url: 'redis://' + REDIS_HOST});

var timer;

var weatherData = {
  'minTemperature' : 10,
  'maxTemperature' : 30,
  'minHumidity' : 20,
  'maxHumidity' : 80,
  'minWindSpeed' : 5,
  'maxWindSpeed' : 40,
  'avgTemperature' : 20,
  'avgHumidity' : 50,
  'avgWindSpeed' : 25
}

var time = 1650844800000;
// 1651672800 1651676400 3600000
// 1650844800
// 1650916800000 1650920400000 1650924000000

var weatherDataObj = {
  '1650844800000' : weatherData
}

redisPub.connect();

function randomizeData(data){
  var keys = Object.keys(data);
  for(var i = 0; i < keys.length; i++){
    data[keys[i]] += Math.round((Math.random() * 20) - 10);
  }
}

redisPub.on('error', (err) => {
    console.log('Error occured while connecting or accessing redis server');
    console.log(err);
    timer.clearInterval();
});

var counter = 0;

// simulate java publisher
// for(var i = 0; i < 100; i++){
//   weatherDataObj = {}
//   time += 3600;
//   randomizeData(weatherData);
//   weatherDataObj[time] = weatherData;
//   redisPub.publish('weather-data', JSON.stringify(weatherDataObj));
// }

timer = setInterval(() => {
  console.log('pushing message ' + counter);
  weatherDataObj = {}
  time += 3600000;
  randomizeData(weatherData);
  weatherDataObj[time] = weatherData;
  redisPub.publish('weather-data', JSON.stringify(weatherDataObj));
  counter++;
}, 5000);