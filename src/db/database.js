const createRequire = require('module');
const fs = require('fs');
const sqlite3 = require('sqlite3');

function createTable(db) {
  db.exec(`CREATE TABLE IF NOT EXISTS links(
      originalURL TEXT NOT NULL,
      shortenedURL TEXT NOT NULL UNIQUE
    );`);
}

function createDBConnection() {
  const db = new sqlite3.Database(
    "./db/links.db", (err) => {
      if (err) {
        return console.error(err.message);
      }
      createTable(db);
    })
  console.log("Connected to the disk file SQlite database.");
  return db;
}

module.exports = createDBConnection;

//https://www.sqlitetutorial.net/sqlite-getting-started/
//https://www.sqlitetutorial.net/sqlite-nodejs/query/
