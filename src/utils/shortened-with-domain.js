"use strict";

require('dotenv').config();

const pageUrl = process.env.DOMAIN;

function shortenedWithDomain(shortenedURL) {
  return pageUrl + shortenedURL;
}

module.exports = shortenedWithDomain;
