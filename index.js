/*!
 * randomatic <https://github.com/jonschlinkert/randomatic>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License (MIT)
 *
 * Originally inspired by <http://stackoverflow.com/a/10727155/1267639>
 */

var isNumber = require('is-number');

/**
 * Available mask characters
 */

var type = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numeric: '0123456789',
  special: '~!@#$%^&()_+-={}[];\',.'
};

/**
 * Generate random character sequences of a specified `length`,
 * based on the given `pattern`.
 *
 * @param {String} `pattern` The pattern to use for generating the random string.
 * @param {String} `length` The length of the string to generate.
 * @param {String} `options`
 * @return {String}
 * @api public
 */

module.exports = function randomatic(pattern, length, options) {
  if (arguments.length === 1 && typeof pattern === 'number') {
    options = length;
    length = pattern;
    pattern = '*';
  }

  var opts = options || {};
  var mask = '';
  var res = '';

  opts.chars = opts.chars || '';

  // if `length` is an object, since `chars` is currently the only
  // option, use the length of the special chars as `length`
  if(typeof length === 'object') {
    opts = length;
    if (isNumber(pattern)) {
      length = pattern;
    } else {
      length = opts.chars.length;
    }
    pattern = opts.chars;
  }

  // if no `length` is defined, use the length of the pattern
  if(typeof length === 'undefined') {
    length = pattern.length;
  }

  // Characters to be used
  if (pattern.indexOf('?') > -1) mask += opts.chars;
  if (pattern.indexOf('a') > -1) mask += type.lower;
  if (pattern.indexOf('A') > -1) mask += type.upper;
  if (pattern.indexOf('0') > -1) mask += type.numeric;
  if (pattern.indexOf('!') > -1) mask += type.special;
  if (pattern.indexOf('*') > -1) mask += type.all;

  if (mask.length === 0 || mask == null) {
    mask += pattern;
  }

  var len = mask.length - 1;
  while (length--) {
    res += mask[parseInt(Math.random() * len)];
  }
  return res;
};
