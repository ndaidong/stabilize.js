var fs = require('fs');
var path = require('path');

/**
 * Import specs
 */

var files = [
  'main', 'object', 'array', 'builtTest'
];

var where = './test/specs';
if (fs.existsSync(where)) {
  files.forEach((file) => {
    require(path.join('.' + where, file));
  });
}
