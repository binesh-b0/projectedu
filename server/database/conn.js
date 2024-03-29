const mysql = require('mysql');

let config = {
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
}

if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
  config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
}

let connection = mysql.createConnection(config);


// let connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASS
// });

connection.connect(function (err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as thread id: ' + connection.threadId);
});

module.exports = connection;