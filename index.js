/*!
 * randomatic <https://github.com/jonschlinkert/randomatic>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var isNumber = require('is-number');
var typeOf = require('kind-of');

/**
 * Expose `randomatic`
 */

module.exports = randomatic;

/**
 * Available mask characters
 */

var type = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  number: '0123456789',
  special: '~!@#$%^&()_+-={}[];\',.'
};

type.all = type.lower + type.upper + type.number + type.special;

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

function randomatic(pattern, length, options) {
  if (typeof pattern === 'undefined') {
    throw new Error('randomatic expects a string or number.');
  }

  var custom = false;
  if (arguments.length === 1) {
    if (typeof pattern === 'string') {
      length = pattern.length;

    } else if (isNumber(pattern)) {
      options = {}; length = pattern; pattern = '*';
    }
  }

  if (typeOf(length) === 'object' && length.hasOwnProperty('chars')) {
    options = length;
    pattern = options.chars;
    length = pattern.length;
    custom = true;
  }

  var opts = options || {};
  var mask = '';
  var res = '';

  var setupCounter = 0;
  var setup = [];
  // Characters to be used
  if (pattern.indexOf('?') !== -1) {
    setup[setupCounter++] = {
      chars: opts.chars
    };
  }
  if (pattern.indexOf('a') !== -1) {
    setup[setupCounter++] = {
      chars: type.lower
    };
  }
  if (pattern.indexOf('A') !== -1) {
    setup[setupCounter++] = {
      chars: type.upper
    };
  }
  if (pattern.indexOf('0') !== -1) {
    setup[setupCounter++] = {
      chars: type.number
    };
  }
  if (pattern.indexOf('!') !== -1) {
    setup[setupCounter++] = {
      chars: type.special
    };
  }
  if (pattern.indexOf('*') !== -1) {
    setup[setupCounter++] = {
      chars: type.lower
    };
    setup[setupCounter++] = {
      chars: type.upper
    };
    setup[setupCounter++] = {
      chars: type.number
    };
    setup[setupCounter++] = {
      chars: type.special
    };
  }
  if (custom) {
    setup[setupCounter++] = {
      chars: pattern
    };
  };

  setupCounter = 0;
  while (length--) {
    if(!setup[setupCounter]) {
      setupCounter = 0;
    }
    var obj = setup[setupCounter++];
    res += obj.chars.charAt(getRandomInt(0, obj.chars.length - 1));
  }
  return res;
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
