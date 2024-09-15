"use strict";

var { nanoid } = require("nanoid");
const { shortenedURLExists } = require("./db-queries");

async function idGenerator(db) {
  let shortenedID = nanoid(8);
  
  let shortenedURL = await shortenedURLExists(db, shortenedID);

  while (shortenedURL === shortenedID) {
    shortenedID = nanoid(8);
    shortenedURL = await shortenedURLExists(db, shortenedID);
  }

  return shortenedID;
}

module.exports = idGenerator;