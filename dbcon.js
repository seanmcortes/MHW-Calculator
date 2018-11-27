var mysql = require('mysql');

var db = mysql.createConnection({
  host: 'mhw-calculator-db.c2rhnqjzo1dk.us-east-2.rds.amazonaws.com',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: '3306',
});

module.exports.db = db;