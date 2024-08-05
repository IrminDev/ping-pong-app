const db = require('../database/pg.js');

const getCounter = async () => {
    const query = 'SELECT * FROM counter';
    const result = await db.query(query);

    return result.rows[0].count;
}

const incrementCounter =  () => {
    const query = 'UPDATE counter SET count = count + 1';
    const result = db.query(query, (err, res) => {
        if (err) {
            console.error('Error incrementing counter', err);
        } else {
            console.log('Counter incremented');
        }
    })

    return result;
}

module.exports = {
    getCounter,
    incrementCounter
}