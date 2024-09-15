async function searchOriginalURL(db, originalURL) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM links WHERE originalURL = ? ";

    db.get(sql, [originalURL], (err, row) => {
      if (err) {
        reject(err);
      }

      if (row) {
        resolve(row.shortenedURL);
      }

      resolve();
    });
  });
}

async function searchShortenedURL(db, shortenedURL) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM links WHERE shortenedURL = ?";

    db.get(sql, [shortenedURL], (err, row) => {
      if (err) {
        reject(err);
      }

      if (row) {
        resolve(row.originalURL);
      }

      resolve();
    });
  });
}

async function insertURL(db, originalURL, shortenedURL) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO links (originalURL, shortenedURL) VALUES (?, ?)",
      [originalURL, shortenedURL],
      function (err) {
        if (err) {
          reject(err);
        }

        resolve();
      }
    );
  });
}

async function shortenedURLExists(db, shortenedURL) {
  const query = "SELECT shortenedURL FROM links WHERE shortenedURL = ?";

  return new Promise((resolve, reject) => {
    db.all(query, [shortenedURL], (err, rows) => {
      if (err) {
        reject(err);
      }

      resolve(rows.length > 0 ? shortenedURL : null);
    });
  });
}

module.exports = {
  searchOriginalURL,
  searchShortenedURL,
  insertURL,
  shortenedURLExists
};