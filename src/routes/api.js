const express = require('express');
const nanoid = require('nanoid');

const createDbConnection = require('../db/database.js');
const isValidUrl = require('../utils/url-validator.js');

const router = express.Router();

router.post('/shortener', async (req, res) => {
    const origUrl = req.body.url;

    if (!isValidUrl(origUrl)) {
        return res.status(400).json({ error: 'invalid url' });
    }

    const db = createDbConnection();

    try {
        const shortenedURL = nanoid(6)
        const url = db.serialize(function (err) {
            db.get(
                'SELECT * FROM links WHERE originalURL = ? OR shortenedURL = ?', [origUrl, shortenedURL],
                (err, row) => {
                    if (err) {
                        return console.log(err);
                    }
                    return row != undefined ? [origUrl, shortenedURL] : null;
                })
            if (err) {
                console.log(err)
            }
        });

        if (url) {
            return url.shortened;
        }

        db.run(
            'INSERT INTO link (originalURL, shortenedURL) VALUES (?, ?)',
            [url, shortenedURL], (err) => {
                if (err) {
                    return console.log(err);
                } else {
                    return console.log("Sucess");
                }
            });
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;