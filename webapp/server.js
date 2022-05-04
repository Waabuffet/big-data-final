const redis = require('redis');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

const port = 80;

const REDIS_HOST = process.env.REDIS_HOST;
const WEATHER_CHANNEL = 'weather-data';

const redisClient = redis.createClient({url: 'redis://' + REDIS_HOST});

redisClient.on('error', (err) => {
    console.log('Error occured while connecting or accessing redis server');
    console.log(err);
});

redisClient.subscribe(WEATHER_CHANNEL);

redisClient.on('message', function(channel, key) {
  console.log('received message from redis on channel ' + channel + ":");
  console.log(key);

  if(channel == WEATHER_CHANNEL){
      io.emit('redis-message', key);
  }
});

app.use(express.static(path.join(__dirname, '/assets')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

http.listen(port, () => {
    console.log(`Node server running at http://127.0.0.1:${port}/`);
});