const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');

const secrets = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../secrets/secrets.json')),
);
const PG_URI = secrets.PG_URI;

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
