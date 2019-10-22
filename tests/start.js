const fs = require('fs');
const path = require('path');

/**
 * Import specs
 */

const files = [
  'main',
  'object',
  'array',
  'builtTest',
];

const where = './tests/specs';
if (fs.existsSync(where)) {
  files.forEach((file) => {
    require(path.join('.' + where, file));
  });
}
