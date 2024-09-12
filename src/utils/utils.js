function isValidUrl(str) {
  try {
    const newUrl = new URL(str);
    return newUrl;
  } catch (err) {
    return false;
  }
}

module.exports = isValidUrl;