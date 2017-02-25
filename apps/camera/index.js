const path = require('path');
const express = require('express');
const webcam = require('node-webcam');

const app = express();

app.get('/capture', (req, res) => {

  const opts = {
    width: 1280,
    height: 720,
    quality: 100,
    delay: 0,
    saveShots: true,
    output: 'jpeg',
    device: false,
    callbackReturn: 'buffer',
    verbose: false,
    skip: 10
  };

  webcam.capture('photo', opts, (err, data) => {
    res.writeHead(200, {'Content-Type': 'image/jpeg'});
    res.end(data, 'binary');
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
