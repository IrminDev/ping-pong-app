// Create an app that generete a time stamp every 5 seconds and write it to a file called 'time-stamp.txt'. The app should also have a route that reads the file and returns the time stamp.
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3002;
const logFilePath = 'files/data.txt';

// Create a directory for the logs if it doesn't exist
fs.mkdirSync(path.dirname(logFilePath), { recursive: true });

// Function to generate the log
function generateLog() {
    const message = new Date().toISOString();
    // Add a random hash to message
    const hash = Math.random().toString(36).substring(7);
    fs.writeFileSync(logFilePath, `${message} ${hash}\n`, { flag: 'a' });
}

// Generate the log every 5 seconds
setInterval(generateLog, 5000);

// Increment the counter every get request
app.get('/time-stamp', (req, res) => {
    fs.readFile(logFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading log file');
            return;
        }
        res.send(`<pre>${data}</pre>`);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
