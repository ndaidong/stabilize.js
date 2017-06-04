/**
 * Testing
 * @ndaidong
 */

var test = require('tape');
var bella = require('bellajs');

var {
  variants
} = require('../config');

var checkBasicInterface = (stabilize) => {
  test('Testing basic interface', (assert) => {
    assert.ok(stabilize, 'There must be something exported');
    assert.ok(bella.isFunction(stabilize), 'Exported instance must be a function');

    assert.comment('Call stabilize() with no param');
    let r = stabilize();
    assert.ok(!r, 'r must be null');

    assert.end();
  });
};

variants.map(checkBasicInterface);
