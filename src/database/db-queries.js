async function lookupShortenedUrl(db, originalURL) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM links WHERE originalURL = ? ";

    db.get(sql, [originalURL], (err, row) => {
      if (err) {
        reject(err);
      }

      if (row) {
        resolve(row.shortenedURL);
      }

      resolve(null);
    });
  });
}

async function getOriginalUrl(db, shortenedURL) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM links WHERE shortenedURL = ?";

    db.get(sql, [shortenedURL], (err, row) => {
      if (err) {
        reject(err);
      }

      if (row) {
        resolve(row.originalURL);
      }

      resolve(null);
    });
  });
}

async function insertUrlRow(db, originalURL, shortenedURL) {
  const sql = "INSERT INTO links (originalURL, shortenedURL) VALUES (?, ?)";

  return new Promise((resolve, reject) => {
    db.run(
      sql,
      [originalURL, shortenedURL],
      function (err) {
        if (err) {
          reject(err);
        }

        resolve(null);
      }
    );
  });
}

async function shortenedUrlExists(db, shortenedURL) {
  const query = "SELECT shortenedURL FROM links WHERE shortenedURL = ?";

  return new Promise((resolve, reject) => {
    db.all(query, [shortenedURL], (err, rows) => {
      if (err) {
        reject(err);
      }

      if (rows) {
        resolve(rows.length > 0 ? shortenedURL : null);
      }

      resolve(null);
    });
  });
}

module.exports = {
  lookupShortenedUrl,
  getOriginalUrl,
  insertUrlRow,
  shortenedUrlExists
};