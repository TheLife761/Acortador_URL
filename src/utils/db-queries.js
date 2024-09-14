var { nanoid } = require("nanoid");

const pageUrl = "http://cyalp.com/";

function searchOriginalURL(db, originalURL, res) {
  const sql = "SELECT * FROM links WHERE originalURL = ? ";

  db.get(sql, [originalURL], (err, row) => {
    if (err) {
      errorDatabase(db, res);
    }
    if (row) {
      // db.close();
      return jsonReturn(
        "URL already exists",
        row.originalURL,
        row.shortenedURL,
        res
      );
    } else {
      var values = insertIntoDB(db, originalURL);
      console.log(values)
      return jsonReturn(
        values.message,
        values.originalURL,
        values.shortenedURL,
        res
      );
    }
  });
}

// function searchShortenedURL(db, shortenedURL) {
//   const sql = "SELECT * FROM links WHERE shortenedURL = ?";

//   db.get(sql, [shortenedURL], (err, row) => {
//     if (err) {
//       errorDatabase(db, res);
//     }
//     console.log(row);
//     if (row) {
//       // db.close();
//       console.log("hola")
//       console.log({
//         "message": "Shortened URL found",
//         "originalURL": row.originalURL,
//         "shortenedURL": row.shortenedURL
//       } );
//       return {
//         "message": "Shortened URL found",
//         "originalURL": row.originalURL,
//         "shortenedURL": row.shortenedURL
//       } 
//     }
//     console.log("bye")
//     return {
//       "message": "Shortened URL not found",
//         "originalURL": "",
//         "shortenedURL": ""
//     };
//   });
// }

function searchShortenedURL(db, shortenedURL) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM links WHERE shortenedURL = ?";

    db.get(sql, [shortenedURL], (err, row) => {
      if (err) {
        reject(err);
      }
      if (row) {
        resolve({
          message: "Shortened URL found",
          originalURL: row.originalURL,
          shortenedURL: row.shortenedURL
        });
      } else {
        resolve({
          message: "Shortened URL not found",
          originalURL: "",
          shortenedURL: ""
        });
      }
    });
  });
}


function insertIntoDB(db, originalURL) {
  var shortenedURL = nanoid(8);//idGenerator(db);
  db.run(
    "INSERT INTO links (originalURL, shortenedURL) VALUES (?, ?)",
    [originalURL, shortenedURL],
    function (err) {
      if (err) {
        errorDatabase(db);
      }
      // db.close();
    }
  );
  return {
    "message": "URL shortened",
    "originalURL": originalURL,
    "shortenedURL": shortenedURL
  } 
}

function idGenerator(db) {  
  db.serialize(() => {
    const shortenedID = nanoid(8);
    var value = searchShortenedURL(db, shortenedID);
    console.log(value);
    while (value.shortenedURL === shortenedID) {
      shortenedID = nanoid(8);
      value = searchShortenedURL(db, shortenedID)
    }
  })
  return shortenedID;
}

function shortenedWithDomain(shortenedURL) {
  return pageUrl + shortenedURL;
}

function jsonReturn(message, url, shortened, res) {
  return res.json({
    "message": message,
    "originalUrl": url,
    "shortenedURL": shortenedWithDomain(shortened)
  });
}

function errorDatabase(db, res) {
  db.close();
  return res.status(500).json({ error: "Database error" });
}

module.exports = { searchOriginalURL, searchShortenedURL };