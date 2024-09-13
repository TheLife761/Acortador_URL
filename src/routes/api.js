"use strict";

const express = require("express");
var { nanoid } = require("nanoid");

const createDbConnection = require("../db/database.js");
const isValidUrl = require("../utils/url-validator.js");

const router = express.Router();

router.post("/shortener", async (req, res) => {
  const { url } = req.body;

  if (!isValidUrl(url)) {
    return res.status(400).json({ error: "Not valid url" });
  }

  const db = createDbConnection();

  try {
    const shortenedURL = nanoid(6);
    const url = [];
    db.serialize(function (err) {
      const sql =
        "SELECT * FROM links WHERE originalURL = ? OR shortenedURL = ?";

      db.get(sql, [ url, shortenedURL ], (err, row) => {
        if (err) {
          db.close();
          return res.status(500).json({ error: "Database error" });
        }
        if (row) {
          db.close();
          return res.json({
            message: "URL already exists",
            shortenedURL: row.shortenedURL,
          });
        }

        db.run(
          "INSERT INTO links (originalURL, shortenedURL) VALUES (?, ?)",
          [ url, shortenedURL ],
          function (err) {
            if (err) {
              db.close();
              return res
                .status(500)
                .json({ error: "Database insertion error" });
            }
            db.close();
            return res.json({ message: "URL shortened", shortenedURL });
          }
        );
      });
    });
  } catch (e) {
    console.log(e);
  }
});

router.get("/:urlId", async (req, res) => {
  try {
    const db = createDbConnection();

    db.serialize(function (err) {
      const sql = "SELECT * FROM links WHERE shortenedURL = ?";

      db.get(sql, [ req.params.urlId ], (err, row) => {
        if (err) {
          db.close();
          return res.status(500).json({ error: "Database error" });
        }
        if (row) {
          db.close();
          console.log(row.origUrl);
          return res.redirect(row.originalURL);
        }
        return;
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

module.exports = router;