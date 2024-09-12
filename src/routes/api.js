import express from 'express';
import isValidUrl from '../utils/url-validator.js';
import { nanoid } from 'nanoid';
import createDbConnection from '../db/database.js';

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

export default router;