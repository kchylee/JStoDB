const pg = require('pg');
const settings = require('./settings');

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection error", err);
  }
  client.query("SELECT $1::char AS number", ["Batman"], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows);
    client.end();
  });
});
