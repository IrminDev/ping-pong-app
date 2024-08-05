const pg = require('pg');

const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

pool.query('CREATE TABLE IF NOT EXISTS counter (count INT)', (err, res) => {
    if (err) {
        console.error('Error creating table', err);
    } else {
        console.log('Table created');
        pool.query('INSERT INTO counter (count) VALUES (0)', (err, res) => {
            if (err) {
                console.error('Error inserting data', err);
            } else {
                console.log('Data inserted');
            }
        });
    }
});

module.exports = pool;