'use strict';

var bold = require('ansi-bold');
var path = require('path');
var glob = require('glob');

/**
 * Sanity check. Run to ensure that all fns return the same result.
 */

var fixtures = glob.sync(__dirname + '/fixtures/*.js');

glob.sync(__dirname + '/code/*.js').forEach(function (fp) {
  if (/\.js/.test(fp)) {
    var fn = require(path.resolve(__dirname, 'code', fp));
    var name = path.basename(fp, path.extname(fp));
    if (/.*/.test(name)) {

      fixtures.forEach(function (fixture) {
        if (/^.*\.js/.test(path.basename(fixture))) {
          console.log(bold(name) + ':', fn.apply(fn, require(fixture)));
        }
      });
    }
  }
});
