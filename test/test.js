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

      it('should return an uppercase string, 12 digits long', function (done) {
        var actual = randomize('a', 12);
        expect(/[a-z]{12}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(12);
        done();
      });

      it('should return an uppercase string, 12 digits long', function (done) {
        var actual = randomize('0', 12);
        expect(/[\d]{12}/.test(actual)).to.eql(true);
        expect(/[\d]{13}/.test(actual)).to.eql(false);
        expect(/.{13}/.test(actual)).to.eql(false);
        expect(actual.length).to.deep.equal(12);
        done();
      });

      it('should return an uppercase string, 12 digits long', function (done) {
        var actual = randomize('A0', 12);
        expect(/[\dA-Z]{12}/.test(actual)).to.eql(true);
        expect(/[\dA-Z]{13}/.test(actual)).to.eql(false);
        expect(actual.length).to.deep.equal(12);
        done();
      });

      it('should return an uppercase string, 12 digits long', function (done) {
        var actual = randomize('AAA');
        expect(/[A-Z]{3}/.test(actual)).to.eql(true);
        expect(/[a-z]{3}/.test(actual)).to.eql(false);
        expect(actual.length).to.deep.equal(3);
        done();
      });

      it('should return an uppercase string, 12 digits long', function (done) {
        var actual = randomize('Aa0', 12);
        expect(actual.length).to.deep.equal(12);
        expect(/[\dA-Za-z]{3}/.test(actual)).to.eql(true);
        done();
      });

      it('should return an uppercase string, 12 digits long', function (done) {
        var actual = randomize('Aa0');
        expect(/[\dA-Za-z]{3}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(3);
        done();
      });

      it('should return an uppercase string, 12 digits long', function (done) {
        var actual = randomize('000');
        expect(/\d{3}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(3);
        done();
      });

      it('should return an uppercase string, 12 digits long', function (done) {
        var actual = randomize('?', {chars: 'jonschlinkert'});
        expect(/[jonschlinkert]{13}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(13);
        done();
      });

      it('should return an uppercase string, 12 digits long', function (done) {
        var actual = randomize('AAAAA', 3);
        expect(/[A-Z]{3}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(3);
        done();
      });

      it('should return an uppercase string, 12 digits long', function (done) {
        var actual = randomize('*', 16);
        expect(/.{12}/.test(actual)).to.eql(true);
        expect(actual.length).to.deep.equal(16);
        done();
      });
    });
  });
});