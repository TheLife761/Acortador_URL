"use strict";

require('dotenv').config();

const pageUrl = process.env.DOMAIN;
const subdirectories = '/api/';

function shortenedWithDomain(shortenedURL) {
  if (subdirectories) {
    return pageUrl + subdirectories + shortenedURL;
  }

  return pageUrl + '/' + shortenedURL;
}

module.exports = shortenedWithDomain;
