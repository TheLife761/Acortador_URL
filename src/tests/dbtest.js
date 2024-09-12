"use strict";

const createDbConnection = require('../db/database');

const db = createDbConnection();

let sql = `SELECT * FROM links
           ORDER BY originalUrl`;

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row);
  });
});

// close the database connection
db.close();