const redis = require('redis');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Constants
const port = 80;
// const HOST = '0.0.0.0';

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;

const redisClient = redis.createClient(REDIS_PORT, REDIS_HOST);

redisClient.connect();

redisClient.on('error', (err) => {
    console.log('Error occured while connecting or accessing redis server');
    console.log(err);
});

// redisClient.config('set','notify-keyspace-events','KEA');


redisClient.subscribe('weather-data'); //can add second param to listen for specific key

redisClient.on('message', function(channel, key) {
  console.log('channel');
  console.log(channel);
  console.log('key');
  console.log(key);
//   io.emit('redis-message', {
//       'channel': channel,
//       'key' : key
//   });
});

io.on('connection', (socket) => {
    console.log('client connected');
});

// App
app.get('/', (req, res) => {
  res.send('Hello World');
});

http.listen(port, () => {
    console.log(`Node server running at http://127.0.0.1:${port}/`);
});

// app.listen(PORT, HOST);
// console.log(`Running on http://${HOST}:${PORT}`);