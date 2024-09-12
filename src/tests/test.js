"use strict";

const assert = require('assert');
const isValidUrl = require('../utils/url-validator');

describe('IsValidURL', function () {
    it('should return false when url is invalid', function () {
      assert.equal(isValidUrl("abbabababba"), false);
      assert.equal(isValidUrl("google.com"), false);
      assert.equal(isValidUrl(".com"), false);
    });

    it('should accept valid http urls', function () {
      assert.equal(isValidUrl('http://MVSXX.COMPANY.COM'), true);
      assert.equal(isValidUrl('http://www.grose.us'), true);
      assert.equal(isValidUrl('http://www.southcn.com/'), true);
      assert.equal(isValidUrl('http://shippingchina.com/'), true);
      assert.equal(isValidUrl('http://icio.us/'), true);
    });

    it('should accept valid https urls', function () {
      assert.equal(isValidUrl('https://www.google.com'), true);
      assert.equal(isValidUrl('https://amazon.com'), true);
      assert.equal(isValidUrl('https://facebook.com'), true);
    });
});