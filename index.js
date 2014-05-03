/**
 * randomatic
 * Inspired by http://stackoverflow.com/a/10727155/1267639
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

var type = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numeric: '0123456789',
  special: '~!@#$%^&()_+-={}[];\',.'
};

module.exports = function (chars, length, opts) {
  opts = opts || {};
  opts.chars = opts.chars || '';

  if(typeof length === 'object') {
    opts = length;
    length = opts.chars.length;
  }
  if(typeof length === 'undefined') {
    length = chars.length;
  }

  type.custom = opts.chars;
  type.all = Object.keys(type).map(function (key) {
    return type[key];
  }).join('');

  var mask = '';
  var result = [];

  // Allow a custom string to be randomized (opts.chars)
  if (chars.indexOf('?') > -1) {mask += type.custom;}
  if (chars.indexOf('a') > -1) {mask += type.lower; }
  if (chars.indexOf('A') > -1) {mask += type.upper; }
  if (chars.indexOf('0') > -1) {mask += type.numeric; }
  if (chars.indexOf('!') > -1) {mask += type.special; }
  if (chars.indexOf('*') > -1) {mask += type.all; }

  for (var i = length; i > 0; --i) {
    result.push(mask[Math.round(Math.random() * (mask.length - 1))]);
  }
  return result.join('');
};