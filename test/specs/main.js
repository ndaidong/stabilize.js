/**
 * Testing
 * @ndaidong
 */

var test = require('tape');

var stabilize = require('../../index');

test('Testing basic interface', (assert) => {
  assert.ok(stabilize, 'Function must be exported');
  assert.end();
});
