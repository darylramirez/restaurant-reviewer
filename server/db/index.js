const { Pool } = require('pg')
//necessary info like database, user, password are saved as environment variables in the env file which
//the pg dependency automatically knows to look for, no need for process.env then the variable
const pool = new Pool();
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}