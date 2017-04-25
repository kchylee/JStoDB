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



let args = process.argv[2];
client.connect((err, result) => {
  if (err) {
    return console.error("Connection error", err);
  }

  client.query("SELECT * FROM famous_people WHERE last_name = $1 OR first_name = $1;", [args], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

    cb(result);
    function cb (result){
    let id = result.rows[0].id;
    let first = result.rows[0].first_name;
    let last = result.rows[0].last_name;
    let birthyear = result.rows[0].birthdate.getUTCFullYear();
    let birthmonth = result.rows[0].birthdate.getUTCMonth() + 1;
    let birthday = result.rows[0].birthdate.getUTCDate();
    let resultLength = result.rowCount;
    console.log(`Found ${resultLength} person(s) by the name '${args}':\n${id}: ${first} ${last} born ${birthyear}-${birthmonth}-${birthday}`);
    }
    client.end();
  })
})