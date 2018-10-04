/**
 * randomatic <https://github.com/jonschlinkert/randomatic>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

require('mocha');
var assert = require('assert');
var randomize = require('./');

function test(re, str) {
  return re.test(str);
}

describe('randomatic', function() {
  it('should export an isCrypto boolean property', function() {
    assert.equal(typeof randomize.isCrypto, 'boolean');
  });

  it('should throw an error when no arguments are passed:', function() {
    assert.throws(function() {
      randomize();
    }, /randomatic expects a string or number\./);
  });

  it('should generate a randomized string of the given length:', function() {
    assert.equal(randomize(12).length, 12);
    assert.equal(typeof randomize(5), 'string');
  });

  it('should generate a string with a length equal to the number passed as a second parameter', function() {
    var actual = randomize('A', 12);
    assert.equal(actual.length, 12);
    assert(test(/[A-Z]{12}/, actual));
  });

  it('should generate a 12-character string, lowercase', function() {
    var actual = randomize('a', 12);
    assert(test(/[a-z]{12}/, actual));
    assert.equal(actual.length, 12);
  });

  it('should generate 12-characters of ordered numbers', function() {
    var actual = randomize('0', 12);
    assert(test(/[\d]{12}/, actual));
    assert(!test(/[\d]{13}/, actual));
    assert.equal(actual.length, 12);
  });

  it('should generate a randomized 12-character string, uppercase and numbers', function() {
    var actual = randomize('A0', 12);
    assert(test(/[\dA-Z]{12}/, actual));
    assert(!test(/[\dA-Z]{13}/, actual));
    assert.equal(actual.length, 12);
  });

  it('should generate a 3-character string, all uppercase letters', function() {
    assert(test(/[A-Z]{3}/, randomize('AAA')));
    assert(!test(/[a-z]{3}/, randomize('AAA')));
    assert.equal(randomize('AAA').length, 3);

    assert(test(/[A-Z]{3}/, randomize('AAAAA', 3)));
    assert(!test(/[a-z]{3}/, randomize('AAAAA', 3)));
    assert.equal(randomize('AAAAA', 3).length, 3);
  });

  it('should generate an 12-character string of random uppercase and lowercase letters, and numbers', function() {
    var actual = randomize('Aa0', 12);
    assert.equal(actual.length, 12);
    assert(test(/[\dA-Za-z]{3}/, actual));
  });

  it('should generate an 3-character, random alpha-numeric string', function() {
    var actual = randomize('Aa0');
    assert(test(/[\dA-Za-z]{3}/, actual));
    assert.equal(actual.length, 3);
  });

  it('should generate 3-characters of numbers in order', function() {
    var actual = randomize('000');
    assert(test(/\d{3}/, actual));
    assert.equal(actual.length, 3);
  });

  it('should randomize a string from the characters on the `chars` option', function() {
    var actual = randomize('?', {chars: 'jonschlinkert'});
    assert(test(/[jonschlinkert]{13}/, actual));
    assert.equal(actual.length, 13);
  });

  it('should generate a random string excluding characters on the `exclude` option', function() {
    var actual = randomize('?', 16, {chars: 'jonschlinkert', exclude: '0Oo'});
    assert(test(/[^oO0]{16}/, actual));
    assert.equal(actual.length, 16);
  });

  it('should generate a random string excluding array of characters on the `exclude` option', function() {
    var actual = randomize('?', 16, {chars: 'jonschlinkert', exclude: ['0','O','o']});
    assert(test(/[^oO0]{16}/, actual));
    assert.equal(actual.length, 16);
  });

  it('should generate a random string excluding right square bracket on the `exclude` option', function() {
    var actual = randomize('*', 16, {exclude: ']'});
    assert(test(/[^\]]{16}/, actual));
    assert.equal(actual.length, 16);
  });

  it('should generate a random string excluding array with one element(right square bracket) on the `exclude` option', function() {
    var actual = randomize('*', 16, {exclude: [']']});
    assert(test(/[^\]]{16}/, actual));
    assert.equal(actual.length, 16);
  });

  it('should generate a radomized 16-character string', function() {
    assert.equal(randomize('*', 16).length, 16);
  });

  it('should generate Alpha (Upper/Lower), Numeric, Special Char 16-character string', function() {
    var actual = randomize('*');
    assert(test(/^[-~!@#$%^&()_+={}[\];\',.a-zA-Z0-9]$/, actual));
  });

  it('alphabetical, 10 digit:', function() {
    assert.equal(randomize('A', 10).length, 10);
  });

  it('alphabetical, 5 digits:', function() {
    var actual = randomize('A', 5);
    assert(test(/[A-Z]{5}/, actual));
    assert.equal(actual.length, 5);
  });

  it('alphabetical, 10 digits:', function() {
    var actual = randomize('AA', 10);
    assert(test(/[A-Z]{10}/, actual));
    assert.equal(actual.length, 10);
  });

  it('alphabetical, 12 digits:', function() {
    var actual = randomize('Aa', 12);
    assert.equal(actual.length, 12);
  });

  it('alphabetical, 3 digits:', function() {
    var actual = randomize('A', 3);
    assert(test(/[A-Z]{3}/, actual));
    assert.equal(actual.length, 3);
  });

  it('alphabetical, 3 digits:', function() {
    var actual = randomize('AAa');
    assert(test(/[A-Za-z]{3}/, actual));
    assert.equal(actual.length, 3);
  });

  it('alphabetical, 3 digits:', function() {
    var actual = randomize('AA', 3);
    assert(test(/[A-Z]{3}/, actual));
    assert.equal(actual.length, 3);
  });

  it('alphabetical, 3 digits:', function() {
    var actual = randomize('AA');
    assert(test(/[A-Z]{2}/, actual));
    assert.equal(actual.length, 2);
  });

  it('alpha-numeric, 5 digits:', function() {
    var actual = randomize('A0', 5);
    assert(test(/[A-Z\d]{5}/, actual));
    assert.equal(actual.length, 5);
  });

  it('alpha-numeric, 5 digits:', function() {
    var actual = randomize('AA00', 5);
    assert(test(/[A-Z\d]{5}/, actual));
    assert.equal(actual.length, 5);
  });

  it('alpha-numeric, 5 digits:', function() {
    var actual = randomize('A0A0', 5);
    assert(test(/[A-Z\d]{5}/, actual));
    assert.equal(actual.length, 5);
  });

  it('alpha-numeric, 5 digits:', function() {
    var actual = randomize('A0A0A0A0A0A', 5);
    assert(test(/[A-Z\d]{5}/, actual));
    assert.equal(actual.length, 5);
  });

  it('alpha-numeric, 8 digits:', function() {
    var actual = randomize('AaAa0000');
    assert(test(/[A-Za-z0-9]{8}/, actual));
    assert.equal(actual.length, 8);
  });

  it('numeric, 1 digit:\t', function() {
    var actual = randomize('0', 1);
    assert(test(/\d{1}/, actual));
    assert.equal(actual.length, 1);
  });

  it('numeric, 8 digits:\t', function() {
    var actual = randomize('0', 8);
    assert(test(/^\d{8}/, actual));
    assert.equal(actual.length, 8);
  });

  it('numeric, 8 digits:\t', function() {
    var actual = randomize('00000000');
    assert(test(/^\d{8}/, actual));
    assert.equal(actual.length, 8);
  });

  it('special chars, 7 digits:', function() {
    var actual = randomize('A0!', 7);
    assert(test(/[\s\S]{7}/, actual));
    assert.equal(actual.length, 7);
  });

  it('special chars, 7 digits:', function() {
    var actual = randomize('A0!a0A0');
    assert(test(/[\s\S]{7}/, actual));
    assert(!test(/[\s\S]{8}/, actual));
    assert.equal(actual.length, 7);
  });

  it('alphabetical, 1 digit:', function() {
    var actual = randomize('Aa0');
    assert(test(/[A-Za-z0-9]{3}/, actual));
    assert.equal(actual.length, 3);
  });

  it('all characters, 16 digits:', function() {
    assert.equal(randomize('*', 16).length, 16);
  });

  it('custom chars, 16 digit', function() {
    var actual = randomize('?', 16, {chars: 'jonathan'});
    assert(test(/[jonathan]/, actual));
    assert.equal(actual.length, 16);
  });
});
