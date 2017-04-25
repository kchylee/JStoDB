let args = process.argv.slice(2); //Array with CLI input [first_name, last_name, birthdate]
let settings = require('./settings');
let knex = require('knex')({
  client: 'pg',
  connection: {
    database: settings.database,
    host: settings.hostname,
    password: settings.password,
    user: settings.user
  }
})

// console.log(args[0], args[1], args[2]);

knex('famous_people').insert({first_name: args[0],
                              last_name: args[1],
                              birthdate: args[2]})
                            .then(
                              console.log(knex.select()
                              .from("famous_people")
                              .then(knex('famous_people'))
                              )
                            );