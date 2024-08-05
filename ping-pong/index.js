const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const counterService = require('./services/counterService');

// Increment the counter every get request
app.get('/pingpong', (req, res) => {
    counterService.incrementCounter();
    const count = counterService.getCounter().then(count => {
        res.send(`Ping-pongs: ${count}`);
    }).catch(err => {
        console.error('Error getting counter', err);
        res.status(500).send('Error getting counter');
    })
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});