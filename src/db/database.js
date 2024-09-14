"use strict";

const sqlite3 = require("sqlite3");

function createTable(db) {
  db.exec(`CREATE TABLE IF NOT EXISTS links(
      shortenedURL TEXT NOT NULL UNIQUE PRIMARY KEY, 
      originalURL TEXT NOT NULL UNIQUE
    );`);
}
//    throw error;
function createDBConnection() {
  const db = new sqlite3.Database("./src/db/links.db", (err) => {
    if (err) {
      return console.error(err.message);
    }
    createTable(db);
  });
  console.log("Connected to the disk file SQlite database.");
  return db;
}

module.exports = createDBConnection;
