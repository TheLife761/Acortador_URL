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
    
    searchOriginalURL(db, url, (err, queryData) => {
      if(err) {
        return res.status(500).json({err});
      }
      
      if (queryData){
        return res.json(shortenedWithDomain(queryData));
      } else {
        let shortenedID = idGenerator(db);
        insertURL(db, url, shortenedID, (err) => {
          if(err){
            return res.status(500).json({err});
          }
        });
        return res.json(shortenedWithDomain(shortenedID));
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json("Server Error");
  }
});

router.get("/:urlId", async (req, res) => {
  const shortenedURL = req.params.urlId;

  try {
    const db = createDbConnection();
    const value = await searchShortenedURL(db, shortenedURL);

    if (value === undefined) {
      return res.status(404).json({ message: "URL not found" });
    } else {
      res.redirect(value);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json("Server Error");
  }
});


module.exports = router;