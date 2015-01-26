'use strict';

var rand = require('./');


// Example replacement patterns.
var replacements = [{
  pattern: /:random\(([^)]*)\)/,
  replacement: function (match, args) {
    if(args.match(/,/)) {
      args = parse(args.split(','));
      // console.log(args)
      return rand.apply(rand, args);
    } else {
      return rand(args);
    }
  }
}];


function randomize(patterns, arr) {
  var keys = Object.keys(patterns);
  return keys.reduce(function(res, str) {
    var desc = patterns[str];

    var result = arr.reduce(function(acc, o) {
      return acc.replace(o.pattern, o.replacement);
    }, str);

    res[desc] = {};
    res[desc].result = result;
    res[desc].length = result.length;
    return res;
  }, {});
}

var patterns = {
  // Pattern           // Should result in...
  ':random(A, 10)'     : 'alpha, (10 digits)',
  ':random(A, 5)'      : 'alpha, (5 digits)',
  ':random(7, {chars: "foo\'s"})' : 'special chars, (7 digits)',
  ':random(AA, 10)'    : 'alpha, (10 digits)',
  ':random(Aa, 12)'    : 'alpha, (12 digits)',
  ':random(A, 3)'      : 'alpha, (3 digits)',
  ':random(AAa)'       : 'alpha, (3 digits)',
  ':random(AA, 3)'     : 'alpha, (3 digits)',
  ':random(A0, 5)'     : 'alpha-numeric, (5 digits)',
  ':random(AA00, 5)'   : 'alpha-numeric, (5 digits)',
  ':random(A0A0, 5)'   : 'alpha-numeric, (5 digits)',
  ':random(AaAa0000)'  : 'alpha-numeric, (8 digits)',
  ':random(0, 1)'      : 'numeric, (1 digit)',
  ':random(0, 8)'      : 'numeric, (8 digits)',
  ':random(00000000)'  : 'numeric, (8 digits)',
  ':random(A0!, 7)'    : 'special chars, (7 digits)',
  ':random(A0!a0A0)'   : 'special chars, (7 digits)',
  ':random(Aa0, 1)'    : 'alpha, (1 digit)',
  ':random(*, 16)'     : 'all characters, (16 digits)',
  ':random(?, 16, jonathan)' : 'custom chars, (16 digit)'
};

console.log(randomize(patterns, replacements));

function parse(args) {
  return args.map(function(arg) {
    if (/\{/.test(arg)) {
      var start = /(['"])/;
      var i = arg.search(start);
      var ch = arg[i];
      var match;
      var chars = '';

      while ((match = arg.charAt(++i)) !== ch) {
        chars += match;
      }
      console.log(chars);

      return {chars: chars};
    }
    return arg;
  });
}

// function parse(args) {
//   return args.map(function(arg) {
//     if (/\{/.test(arg)) {
//       var match = /['"]([^"']+)["']/.exec(arg);
//       if (match) {
//         return {chars: match[1]};
//       }
//     }
//     return arg;
//   });
// }

