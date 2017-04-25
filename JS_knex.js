// var knex = require('knex');
var settings = require('./settings');
var knex = require('knex')({
  client: 'pg',
  connection: {
    database: settings.database,
    host: settings.hostname,
    password: settings.password,
    user: settings.user
  }
});

let args = process.argv[2];

  knex
  .table('famous_people')
  .where({first_name: args})
  .orWhere({last_name: args})
  .then(function (result) {
    if (result.length >= 1){
      let id = result[0].id;
      let first = result[0].first_name;
      let last = result[0].last_name;
      let birthyear = result[0].birthdate.getUTCFullYear();
      let birthmonth = result[0].birthdate.getUTCMonth() + 1;
      let birthday = result[0].birthdate.getUTCDate();
      let resultLength = result.rowCount;
      console.log(`Found ${result.length} person(s) by the name '${args}':\n${id}: ${first} ${last} born ${birthyear}-${birthmonth}-${birthday}`);
    }else{
      console.log("Error");
    }
  });
