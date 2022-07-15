const {Client} = require('pg')
const dotenv = require('dotenv')

dotenv.config({path: './.env'})

async function main() {
  const client = new Client({
    connectionTimeoutMillis: 1000,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    ssl: {
      rejectUnauthorized: false
    }
  });

  let failure = null;

  await client.connect()
    .catch((err) => failure = err);

  if (failure !== null) {
    return {body: failure};
  }

//  const response = await client.query('CREATE TABLE company (user_id serial PRIMARY KEY, username VARCHAR(55) NOT NULL, age INT NOT NULL)')
//    .catch(reason => failure = reason);
//    const response = await client.query("INSERT INTO company (user_id, username, age) VALUES (2, 'john doe', 34)")
//    .catch(reason => failure = reason);
    const response = await client.query("SELECT * FROM company")
    .catch(reason => failure = reason);
  await client.end();

  const body = failure === null ? response.rows : failure.toString();

  return {body};
}

exports.main = main
