"use strict";

const createDbConnection = require('../db/database');

const db = createDbConnection();

let sql = `INSERT INTO links (originalURL, shortenedURL)
            VALUES ('https://blog.logrocket.com/how-build-url-shortener-node-js/', '123gdfgdf'),
             ('https://blog.logrocket.com/how-bl-shortenejs/', '1234gdfd')`;

db.run(sql, [], (err) => {
    if (err) {
        return console.error(err);
    }
    
    console.log(`A row has been inserted with rowid ${this.lastID}`);
})