"use strict";

const sqlite3 = require("sqlite3");

async function createTable(db) {
  await db.exec(`CREATE TABLE IF NOT EXISTS links(
      shortenedURL TEXT NOT NULL UNIQUE PRIMARY KEY, 
      originalURL TEXT NOT NULL UNIQUE
    );`);
}

async function createDBConnection() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database("./src/database/links.db", async (err) => {
      if (err) {
        reject(err);
      }
      await createTable(db);
    });
    console.log("Connected to the disk file SQlite database.");
    resolve(db);
  });
}

module.exports = createDBConnection;
