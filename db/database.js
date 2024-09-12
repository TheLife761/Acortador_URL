var createRequire = require('module');
var fs = require('node:fs');
// const require = createRequire(import.meta.url);

const sqlite3 = require("sqlite3").verbose();

function createDbConnection() {
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

function createTable(db) {
  db.exec(`CREATE TABLE IF NOT EXISTS links(
      originalURL TEXT NOT NULL,
      shortenedURL TEXT NOT NULL UNIQUE
    );`)
}

module.exports = createDbConnection


//https://www.sqlitetutorial.net/sqlite-getting-started/
//https://www.sqlitetutorial.net/sqlite-nodejs/query/
