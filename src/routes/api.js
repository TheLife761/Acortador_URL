"use strict";

const express = require("express");
const createDbConnection = require("../db/database.js");
const isValidUrl = require("../utils/url-validator.js");
const { searchOriginalURL, searchShortenedURL } = require("../utils/db-queries.js")

const router = express.Router();

router.post("/shortener", async (req, res) => {
  const { url } = req.body;

  if (!isValidUrl(url)) {
    return res.status(400).json({ error: "Not valid url" });
  }

  try {
    const db = createDbConnection();
    searchOriginalURL(db, url, res);
  } catch (e) {
    console.log(e);
  }
});

// router.get("/:urlId", async (req, res) => {
//   const shortenedURL = req.params.urlId;

//   try {
//     const db = createDbConnection();
    
//     db.serialize(() => {
//       var values = searchShortenedURL(db, shortenedURL);
//       console.log(values);
//       if(values.originalURL == ""){
//         return
//       } else {
//         res.redirect(values.originalURL);
//       }
//     })

//     // res.redirect(
//     //   shortened.shortenedURL
//     // );
//   } catch (err) {
//     console.log(err);
//     res.status(500).json("Server Error");
//   }
// });

router.get("/:urlId", async (req, res) => {
  const shortenedURL = req.params.urlId;

  try {
    const db = createDbConnection();
    const values = await searchShortenedURL(db, shortenedURL);
    
    console.log(values);
    if (values.originalURL === "") {
      return res.status(404).json({ message: "URL not found" });
    } else {
      res.redirect(values.originalURL);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});


module.exports = router;