function searchOriginalURL(db, originalURL, callback) {
  const sql = "SELECT * FROM links WHERE originalURL = ? ";

  db.get(sql, [originalURL], (err, row) => {
    if (err) {
      return callback(Error(err), null);
    }
    return callback(null, row == undefined ? null : row.shortenedURL);
  });
}

function searchShortenedURL(db, shortenedURL) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM links WHERE shortenedURL = ?";

    db.get(sql, [shortenedURL], (err, row) => {
      if (err) {
        reject(err);
      }
      resolve(row.originalURL);
    });
  });
}

function insertURL(db, originalURL, shortenedURL, callback) {
  db.run(
    "INSERT INTO links (originalURL, shortenedURL) VALUES (?, ?)",
    [originalURL, shortenedURL],
    function (err) {
      if (err) {
        return callback(err);
      }
    }
  );
}

module.exports = {
  searchOriginalURL,
  searchShortenedURL,
  insertURL
};