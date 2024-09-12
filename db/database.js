import { createRequire } from "module";
import * as fs from 'node:fs';
const require = createRequire(import.meta.url);

const sqlite3 = require("sqlite3").verbose();

export function createDbConnection() {

  if (fs.existsSync('/links.db')) {
    return new sqlite3.Database('/links.db');
  } else {
    const db = new sqlite3.Database(
      "./db/links.db", (err) => {
        if (err) {
          return console.error(err.message);
        }
        createTable(db)
      })
    console.log("Connected to the disk file SQlite database.");
    return db;
  }
}

function createTable(db) {
  db.exec(`CREATE TABLE links(
      originalURL TEXT NOT NULL,
      shortenedUR TEXT NOT NULL UNIQUE
    );`);
}

// export function createDbConnection() {
//   const db = new sqlite3.Database('links.db', (error) => {
//     if (error) {
//       return console.error(error.message);
//     }
//   });
//   console.log("Connection with SQLite has been established");
//   return db;
// }


//https://www.sqlitetutorial.net/sqlite-getting-started/
//https://www.sqlitetutorial.net/sqlite-nodejs/query/
