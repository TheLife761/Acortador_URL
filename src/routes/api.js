"use strict";

const express = require("express");
const createDbConnection = require("../db/database.js");
const isValidUrl = require("../utils/url-validator.js");
const {
  searchOriginalURL,
  searchShortenedURL,
  insertURL
} = require("../utils/db-queries.js");
const idGenerator = require("../utils/id-generator.js");
const shortenedWithDomain = require("../utils/shortened-with-domain.js")

const router = express.Router();

router.post("/shortener", async (req, res) => {
  const { url } = req.body;

  if (!isValidUrl(url)) {
    return res.status(400).json({ error: "Not valid url" });
  }

  try {
    const db = createDbConnection();

    let shortenedId = await searchOriginalURL(db, url);

    if (!shortenedId) {
      shortenedId = await idGenerator(db);

      await insertURL(db, url, shortenedId);
    }

    return res.status(200).json({ "Shortened": shortenedWithDomain(shortenedId) });

  } catch (e) {
    console.error(e);
    res.status(500).json("Internal Server Error");
  }
});

router.get("/:urlId", async (req, res) => {
  const shortenedURL = req.params.urlId;

  try {
    const db = createDbConnection();
    const originalURL = await searchShortenedURL(db, shortenedURL);

    if (!originalURL) {
      return res.status(404).json({ message: "URL not found" });
    }

    return res.redirect(originalURL);

  } catch (e) {
    console.log(e);
    res.status(500).json("Internal Server Error");
  }
});


module.exports = router;