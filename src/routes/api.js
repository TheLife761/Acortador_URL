"use strict";

const express = require("express");

const createDbConnection = require("../database/database");
const isValidUrl = require("../utils/url-validator");
const idGenerator = require("../utils/id-generator");
const shortenedWithDomain = require("../utils/shortened-with-domain");
const {
  lookupShortenedUrl,
  getOriginalUrl,
  insertUrlRow
} = require("../database/db-queries");

const router = express.Router();

router.post("/shortener", async (req, res) => {
  const { url } = req.body;

  if (!isValidUrl(url)) {
    return res.status(400).render('index', { original: url, invalid_url: true });
  }

  try {
    const DB = await createDbConnection();

    let shortenedId = await lookupShortenedUrl(DB, url);

    if (!shortenedId) {
      shortenedId = await idGenerator(DB);

      await insertUrlRow(DB, url, shortenedId);
    }

    DB.close();

    res.render('index', { original: url, shortened: shortenedWithDomain(shortenedId) });

  } catch (e) {
    console.error(e);
    res.status(500).json("Internal Server Error");
  }
});

router.get("/:urlId", async (req, res) => {
  const shortenedURL = req.params.urlId;

  try {
    const DB = await createDbConnection();
    const originalURL = await getOriginalUrl(DB, shortenedURL);

    if (!originalURL) {
      return res.status(404).json({ message: "URL not found" });
    }

    DB.close();

    return res.redirect(originalURL);

  } catch (e) {
    console.log(e);
    res.status(500).json("Internal Server Error");
  }
});


module.exports = router;