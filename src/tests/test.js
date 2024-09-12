"use strict";

const assert = require('assert');
const isValidUrl = require('../utils/url-validator');

describe('IsValidURL', function () {
    it('should return false when url is invalid', function () {
      assert.equal(isValidUrl("abbabababba"), false);
      assert.equal(isValidUrl("google.com"), false);
      assert.equal(isValidUrl(".com"), false);
    });
});