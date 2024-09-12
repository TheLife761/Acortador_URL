var assert = require('assert');

describe('IsValidURL', function () {
    it('should return false when url is invalid', function () {
      assert.equal(isValidURL("abbabababba"), false);
      assert.equal(isValidURL("http://www.example.com/file[/].html"), false);
      assert.equal(isValidURL("google.com"), true);
      assert.equal(isValidURL("https://www.google.com"), true);
      assert.equal(isValidURL("https://google.com"), true);
      assert.equal(isValidURL("mailto://mail@example.com"), false);
      assert.equal(isValidURL(".com"), false);
    });
});