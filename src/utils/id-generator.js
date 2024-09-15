"use strict";

var { nanoid } = require("nanoid");
const { shortenedUrlExists } = require("./db-queries");

async function idGenerator(db) {
  let shortenedID = nanoid(8);
  
  let shortenedURL = await shortenedUrlExists(db, shortenedID);

  while (shortenedURL === shortenedID) {
    shortenedID = nanoid(8);
    shortenedURL = await shortenedUrlExists(db, shortenedID);
  }

  return shortenedID;
}

module.exports = idGenerator;