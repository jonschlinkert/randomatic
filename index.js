/**
 * randomatic
 * Inspired by http://stackoverflow.com/a/10727155/1267639
 * Copyright (c) 2014 Jon Schlinkert and Omar Al-Ithawi
 * Licensed under the MIT License (MIT).
 */
 
(function () {
  'use strict';
  var type = {
    lower: 'abcdefghijklmnopqrstuvwxyz',
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numeric: '0123456789',
    special: '~!@#$%^&()_+-={}[];\',.'
  };

  var randomatic = function (chars, length, opts) {
    opts = opts || {};
    opts.chars = opts.chars || '';
    opts.id = opts.id || '';

    if (typeof length === 'object') {
      opts = length;
      length = opts.chars.length;
    }

    if (typeof length === 'undefined') {
      length = chars.length;
    }

    type.custom = opts.chars;
    type.all = Object.keys(type).map(function (key) {
      return type[key];
    }).join('');

    var mask = '';
    var result = [];

    // Allow a custom string to be randomized (opts.chars)
    if (chars.indexOf('?') > -1) {
      mask += type.custom;
    }

    if (chars.indexOf('a') > -1) {
      mask += type.lower;
    }

    if (chars.indexOf('A') > -1) {
      mask += type.upper;
    }

    if (chars.indexOf('0') > -1) {
      mask += type.numeric;
    }

    if (chars.indexOf('!') > -1) {
      mask += type.special;
    }

    if (chars.indexOf('*') > -1) {
      mask += type.all;
    }

    for (var i = length; i > 0; --i) {
      result.push(mask[Math.round(Math.random() * (mask.length - 1))]);
    }

    return result.join('');
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = randomatic;
  } else if (typeof angular !== 'undefined' && angular.module) {
    angular.module('randomatic', []).value('randomatic', randomatic);
  } else {
    window.randomatic = randomatic;
  }

})();
