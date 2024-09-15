"use strict";

require('dotenv').config();

const SERVER_ADDRESS = process.env.HOST + ":" + process.env.PORT;
const SUBDIRECTORIES = '/api/';

function shortenedWithDomain(shortenedURL) {
  if (SUBDIRECTORIES) {
    return SERVER_ADDRESS + SUBDIRECTORIES + shortenedURL;
  }

  return SERVER_ADDRESS + '/' + shortenedURL;
}

module.exports = shortenedWithDomain;
