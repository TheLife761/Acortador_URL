var assert = require('assert');
var isValidURL = require('../utils/utils');

describe('IsValidURL', function () {
    it('should return false when url is invalid', function () {
      assert.equal(isValidURL("abbabababba"), false);
      assert.equal(isValidURL(".com"), false);
    });
});