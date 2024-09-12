import express from 'express';
import { isValidUrl } from './utils/utils.js';
import { nanoid } from 'nanoid';
import { createDbConnection } from './db/database.js';

const router = express.Router();

router.post('/short', async (req, res) => {
  const { origUrl } = req.body;

  if (!isValidUrl(origUrl)) {
    return res.status(400).json({ error: 'invalid url' });
  }

  const db = createDbConnection();

  try {
    const url = db.get(
      'SELECT * FROM links WHERE originalURL = ?', [ url ], (err, row) => {
        if(err){
          return console.log(err);
        } 
        return  row != undefined ? [ original, shortened ] : null;
    });

    if(url){
      return url.shortened;
    }

    db.run(
      'INSERT INTO link (originalURL, shortenedURL) VALUES (?, ?)',
      [ url, nanoid(6) ], (err) => {
        if(err) {
          return console.log(err);
        } else {
          return console.log("Sucess");
        }
      });
  } catch(e) {
    console.log(e);
  }
});

export default router;

//https://www.freecodecamp.org/news/how-to-validate-urls-in-javascript/
//https://blog.logrocket.com/how-build-url-shortener-node-js/