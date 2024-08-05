const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
const logFilePath = 'files/data.txt';
const informationPath = '/etc/config/information.txt';
const path = require('path');
const axios = require('axios');
const urlPingPong = process.env.PING_PONG_URL || 'http://localhost:3001';
const envMessage = process.env.MESSAGE;

// Create a directory for the logs if it doesn't exist
fs.mkdirSync(path.dirname(logFilePath), { recursive: true });

// Endpoint para servir el contenido del log
app.get('/', (req, res) => {
  fs.readFile(logFilePath, 'utf8', async (err, data) => {
    if (err) {
      res.status(500).send('Error reading log timestamp file');
      console.log(err);
      return;
    }

    // Read the information file
    let information = '';
    try {
      information = fs.readFileSync(informationPath, 'utf8');
      console.log('Information file read successfully');
      console.log(information);
    } catch (err) {
      console.log('Error reading information file');
      console.log(err);
    }

    console.log('Getting counter from ping-pong service');
    // Get the counter from ping-pong service
    const response = await axios.get(`${urlPingPong}/pingpong`);
    const counter = response.data;

    // Send the response
    res.send(`${data}\n ${information}\n Ping Pongs: ${counter}\n Message: ${envMessage}`);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});