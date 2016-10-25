/**
 * Testing
 * @ndaidong
 */

var test = require('tape');
var bella = require('bellajs');

var stabilize = require('../../index');

test('Testing basic interface', (assert) => {
  assert.ok(stabilize, 'There must be something exported');
  assert.ok(bella.isFunction(stabilize), 'Exported instance must be a function');

  assert.comment('Call stabilize() with no param');
  let r = stabilize();
  assert.ok(!r, 'r must be null');

  assert.end();
});
