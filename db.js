const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'DPSnt23@', 
  database: 'acm_club'
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

module.exports = connection;
