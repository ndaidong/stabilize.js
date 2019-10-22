/**
 * Testing
 * @ndaidong
 */

const test = require('tap').test;
const bella = require('bellajs');

const {
  variants,
} = require('../config');

const checkBasicInterface = (stabilize) => {
  test('Testing basic interface', (assert) => {
    assert.ok(stabilize, 'There must be something exported');
    assert.ok(bella.isFunction(stabilize), 'Exported instance must be a function');

    assert.comment('Call stabilize() with no param');
    const r = stabilize();
    assert.ok(!r, 'r must be null');

    assert.end();
  });
};

variants.map(checkBasicInterface);
