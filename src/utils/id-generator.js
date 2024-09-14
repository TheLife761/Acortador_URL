"use strict";

var { nanoid } = require("nanoid");
const {searchShortenedURL} = require("./db-queries");

function idGenerator(db) {
  const shortenedID = nanoid(8);
  db.serialize(async () => {
    let value = await searchShortenedURL(db, shortenedID);
    while (value.shortenedURL === shortenedID) {
      shortenedID = nanoid(8);
      value = searchShortenedURL(db, shortenedID);
    }
  });
  return shortenedID;
}

module.exports = idGenerator;