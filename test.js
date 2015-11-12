/**
 * randomatic <https://github.com/jonschlinkert/randomatic>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

require('mocha');
require('should');
var randomize = require('./');

function test(re, str) {
  return re.test(str);
}

describe('randomatic', function () {
  it('should throw an error when no arguments are passed:', function () {
    (function() {
      randomize()
    }).should.throw('randomatic expects a string or number.');
  });

  it('should generate a randomized string of the given length:', function () {
    randomize(12).length.should.equal(12);
    randomize(5).should.be.a.string;
  });

  it('should generate a string with a length equal to the number passed as a second parameter', function () {
    var actual = randomize('A', 12);
    actual.length.should.equal(12);
    test(/[A-Z]{12}/, actual).should.be.true;
  });

  it('should generate a 12-character string, lowercase', function () {
    var actual = randomize('a', 12);
    test(/[a-z]{12}/, actual).should.be.true;
    actual.length.should.equal(12);
  });

  it('should generate 12-characters of ordered numbers', function () {
    var actual = randomize('0', 12);
    test(/[\d]{12}/, actual).should.be.true;
    test(/[\d]{13}/, actual).should.be.false;
    actual.length.should.equal(12);
  });

  it('should generate a randomized 12-character string, uppercase and numbers', function () {
    var actual = randomize('A0', 12);
    test(/[\dA-Z]{12}/, actual).should.be.true;
    test(/[\dA-Z]{13}/, actual).should.be.false;
    actual.length.should.equal(12);
  });

  it('should generate an 3-character string, all uppercase letters', function () {
    var actual = randomize('AAA');
    test(/[A-Z]{3}/, actual).should.be.true;
    test(/[a-z]{3}/, actual).should.be.false;
    actual.length.should.equal(3);
  });

  it('should generate an 3-character string, all uppercase letters', function () {
    var actual = randomize('AAAAA', 3);
    test(/[A-Z]{3}/, actual).should.be.true;
    actual.length.should.equal(3);
  });

  it('should generate an 12-character string of random uppercase and lowercase letters, and numbers', function () {
    var actual = randomize('Aa0', 12);
    actual.length.should.equal(12);
    test(/[\dA-Za-z]{3}/, actual).should.be.true;
  });

  it('should generate an 3-character, random alpha-numeric string', function () {
    var actual = randomize('Aa0');
    test(/[\dA-Za-z]{3}/, actual).should.be.true;
    actual.length.should.equal(3);
  });

  it('should generate 3-characters of numbers in order', function () {
    var actual = randomize('000');
    test(/\d{3}/, actual).should.be.true;
    actual.length.should.equal(3);
  });

  it('should randomize a string from the characters on the `chars` option', function () {
    var actual = randomize('?', {chars: 'jonschlinkert'});
    test(/[jonschlinkert]{13}/, actual).should.be.true;
    actual.length.should.equal(13);
  });

  it('should generate a radomized 16-character string', function () {
    randomize('*', 16).length.should.equal(16);
  });

  it('alphabetical, 10 digit:', function () {
    randomize('A', 10).length.should.equal(10);
  });

  it('alphabetical, 5 digits:', function () {
    var actual = randomize('A', 5);
    test(/[A-Z]{5}/, actual).should.be.true;
    actual.length.should.equal(5);
  });

  it('alphabetical, 10 digits:', function () {
    var actual = randomize('AA', 10);
    test(/[A-Z]{10}/, actual).should.be.true;
    actual.length.should.equal(10);
  });

  it('alphabetical, 12 digits:', function () {
    var actual = randomize('Aa', 12);
    actual.length.should.equal(12);
  });

  it('alphabetical, 3 digits:', function () {
    var actual = randomize('A', 3);
    test(/[A-Z]{3}/, actual).should.be.true;
    actual.length.should.equal(3);
  });

  it('alphabetical, 3 digits:', function () {
    var actual = randomize('AAa');
    test(/[A-Za-z]{3}/, actual).should.be.true;
    actual.length.should.equal(3);
  });

  it('alphabetical, 3 digits:', function () {
    var actual = randomize('AA', 3);
    test(/[A-Z]{3}/, actual).should.be.true;
    actual.length.should.equal(3);
  });

  it('alphabetical, 3 digits:', function () {
    var actual = randomize('AA');
    test(/[A-Z]{2}/, actual).should.be.true;
    actual.length.should.equal(2);
  });

  it('alpha-numeric, 5 digits:', function () {
    var actual = randomize('A0', 5);
    test(/[A-Z\d]{5}/, actual).should.be.true;
    actual.length.should.equal(5);
  });

  it('alpha-numeric, 5 digits:', function () {
    var actual = randomize('AA00', 5);
    test(/[A-Z\d]{5}/, actual).should.be.true;
    actual.length.should.equal(5);
  });

  it('alpha-numeric, 5 digits:', function () {
    var actual = randomize('A0A0', 5);
    test(/[A-Z\d]{5}/, actual).should.be.true;
    actual.length.should.equal(5);
  });

  it('alpha-numeric, 5 digits:', function () {
    var actual = randomize('A0A0A0A0A0A', 5);
    test(/[A-Z\d]{5}/, actual).should.be.true;
    actual.length.should.equal(5);
  });

  it('alpha-numeric, 8 digits:', function () {
    var actual = randomize('AaAa0000');
    test(/[A-Za-z0-9]{8}/, actual).should.be.true;
    actual.length.should.equal(8);
  });

  it('numeric, 1 digit:\t', function () {
    var actual = randomize('0', 1);
    test(/\d{1}/, actual).should.be.true;
    actual.length.should.equal(1);
  });

  it('numeric, 8 digits:\t', function () {
    var actual = randomize('0', 8);
    test(/^\d{8}/, actual).should.be.true;
    actual.length.should.equal(8);
  });

  it('numeric, 8 digits:\t', function () {
    var actual = randomize('00000000');
    test(/^\d{8}/, actual).should.be.true;
    actual.length.should.equal(8);
  });

  it('special chars, 7 digits:', function () {
    var actual = randomize('A0!', 7);
    test(/[\s\S]{7}/, actual).should.be.true;
    actual.length.should.equal(7);
  });

  it('special chars, 7 digits:', function () {
    var actual = randomize('A0!a0A0');
    test(/[\s\S]{7}/, actual).should.be.true;
    test(/[\s\S]{8}/, actual).should.be.false;
    actual.length.should.equal(7);
  });

  it('alphabetical, 1 digit:', function () {
    var actual = randomize('Aa0');
    test(/[A-Za-z0-9]{3}/, actual).should.be.true;
    actual.length.should.equal(3);
  });

  it('all characters, 16 digits:', function () {
    randomize('*', 16).length.should.equal(16);
  });

  it('custom chars, 16 digit', function () {
    var actual = randomize('?', 16, {chars: 'jonathan'});
    test(/[jonathan]/, actual).should.be.true;
    actual.length.should.equal(16);
  });
});
