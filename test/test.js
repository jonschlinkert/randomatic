/**
 * randomatic <https://github.com/jonschlinkert/randomatic>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

const expect = require('chai').expect;
const randomize = require('../');


describe('randomize()', function () {
  describe('when a letter is passed as the first parameter:', function () {
    describe('and a number is passed as a second parameter', function () {
      it('should return a string with a length equal to the number passed as a second parameter', function (done) {
        var actual = randomize('A', 12);
        expect(actual.length).to.deep.equal(12);
        expect(/[A-Z]{12}/.test(actual)).to.eql(true);
        done();
      });

      it('should return a 12-character string, lowercase', function (done) {
        var actual = randomize('a', 12);
        expect(/[a-z]{12}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(12);
        done();
      });

      it('should return 12-characters of ordered numbers', function (done) {
        var actual = randomize('0', 12);
        expect(/[\d]{12}/.test(actual)).to.eql(true);
        expect(/[\d]{13}/.test(actual)).to.eql(false);
        expect(/.{13}/.test(actual)).to.eql(false);
        expect(actual.length).to.deep.equal(12);
        done();
      });

      it('should return a randomized 12-character string, uppercase and numbers', function (done) {
        var actual = randomize('A0', 12);
        expect(/[\dA-Z]{12}/.test(actual)).to.eql(true);
        expect(/[\dA-Z]{13}/.test(actual)).to.eql(false);
        expect(actual.length).to.deep.equal(12);
        done();
      });

      it('should return an 3-character string, all uppercase letters', function (done) {
        var actual = randomize('AAA');
        expect(/[A-Z]{3}/.test(actual)).to.eql(true);
        expect(/[a-z]{3}/.test(actual)).to.eql(false);
        expect(actual.length).to.deep.equal(3);
        done();
      });

      it('should return an 3-character string, all uppercase letters', function (done) {
        var actual = randomize('AAAAA', 3);
        expect(/[A-Z]{3}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(3);
        done();
      });

      it('should return an 12-character string of random uppercase and lowercase letters, and numbers', function (done) {
        var actual = randomize('Aa0', 12);
        expect(actual.length).to.deep.equal(12);
        expect(/[\dA-Za-z]{3}/.test(actual)).to.eql(true);
        done();
      });

      it('should return an 3-character, random alpha-numeric string', function (done) {
        var actual = randomize('Aa0');
        expect(/[\dA-Za-z]{3}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(3);
        done();
      });

      it('should return 3-characters of numbers in order', function (done) {
        var actual = randomize('000');
        expect(/\d{3}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(3);
        done();
      });

      it('should return a radomized 12-character string composed of the letters passed in the `chars` option', function (done) {
        var actual = randomize('?', {chars: 'jonschlinkert'});
        expect(/[jonschlinkert]{13}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(13);
        done();
      });

      it('should return a radomized 16-character string', function (done) {
        var actual = randomize('*', 16);
        expect(/.{12}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(16);
        done();
      });


      it('alphabetical, 10 digit:', function (done) {
        var actual = randomize('A', 10);
        expect(/.{10}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(10);
        done();
      });
      it('alphabetical, 5 digits:', function (done) {
        var actual = randomize('A', 5);
        expect(/[A-Z]{5}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(5);
        done();
      });
      it('alphabetical, 10 digits:', function (done) {
        var actual = randomize('AA', 10);
        expect(/[A-Z]{10}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(10);
        done();
      });
      it('alphabetical, 12 digits:', function (done) {
        var actual = randomize('Aa', 12);
        expect(/.{12}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(12);
        done();
      });
      it('alphabetical, 3 digits:', function (done) {
        var actual = randomize('A', 3);
        expect(/[A-Z]{3}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(3);
        done();
      });
      it('alphabetical, 3 digits:', function (done) {
        var actual = randomize('AAa');
        expect(/[A-Za-z]{3}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(3);
        done();
      });
      it('alphabetical, 3 digits:', function (done) {
        var actual = randomize('AA', 3);
        expect(/[A-Z]{3}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(3);
        done();
      });
      it('alphabetical, 3 digits:', function (done) {
        var actual = randomize('AA');
        expect(/[A-Z]{2}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(2);
        done();
      });
      it('alpha-numeric, 5 digits:', function (done) {
        var actual = randomize('A0', 5);
        expect(/[A-Z\d]{5}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(5);
        done();
      });
      it('alpha-numeric, 5 digits:', function (done) {
        var actual = randomize('AA00', 5);
        expect(/[A-Z\d]{5}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(5);
        done();
      });
      it('alpha-numeric, 5 digits:', function (done) {
        var actual = randomize('A0A0', 5);
        expect(/[A-Z\d]{5}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(5);
        done();
      });
      it('alpha-numeric, 5 digits:', function (done) {
        var actual = randomize('A0A0A0A0A0A', 5);
        expect(/[A-Z\d]{5}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(5);
        done();
      });
      it('alpha-numeric, 8 digits:', function (done) {
        var actual = randomize('AaAa0000');
        expect(/[A-Za-z\d]{8}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(8);
        done();
      });
      it('numeric, 1 digit:\t', function (done) {
        var actual = randomize('0', 1);
        expect(/\d{1}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(1);
        done();
      });
      it('numeric, 8 digits:\t', function (done) {
        var actual = randomize('0', 8);
        expect(/^\d{8}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(8);
        done();
      });
      it('numeric, 8 digits:\t', function (done) {
        var actual = randomize('00000000');
        expect(/^\d{8}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(8);
        done();
      });
      it('special chars, 7 digits:', function (done) {
        var actual = randomize('A0!', 7);
        expect(/[\s\S]{7}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(7);
        done();
      });
      it('special chars, 7 digits:', function (done) {
        var actual = randomize('A0!a0A0');
        expect(/[\s\S]{7}/.test(actual)).to.eql(true);
        expect(/[\s\S]{8}/.test(actual)).to.eql(false);
        expect(actual.length).to.deep.equal(7);
        done();
      });
      it('alphabetical, 1 digit:', function (done) {
        var actual = randomize('Aa0');
        expect(/.{3}/.test(actual)).to.eql(true);
        expect(/.{4}/.test(actual)).to.eql(false);
        expect(actual.length).to.deep.equal(3);
        done();
      });
      it('all characters, 16 digits:', function (done) {
        var actual = randomize('*', 16);
        expect(/.{16}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(16);
        done();
      });
      it('custom chars, 16 digit', function (done) {
        var actual = randomize('?', 16, 'jonathan');
        expect(/.{16}/.test(actual)).to.eql(true);
        expect(/[jonathan]/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(16);
        done();
      });
    });
  });
});


