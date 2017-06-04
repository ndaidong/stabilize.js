/**
 * Testing
 * @ndaidong
 */

var test = require('tape');
var bella = require('bellajs');

var {
  variants
} = require('../config');

var checkStabilizeObject = (stabilize) => {

  test('Test how it works with object', (assert) => {
    assert.comment('Create an object using stabilize');
    let v = stabilize({
      name: 'Alice',
      age: 22
    });
    assert.ok(bella.isObject(v), 'v must be an object');
    assert.ok(v.name === 'Alice', 'v must have name = Alice');
    assert.ok(v.age === 22, 'v must have age = 22');

    assert.comment('Use "set" method to change name to "Bob" and age to 30');
    v.set('name', 'Bob');
    v.set('age', 30);
    assert.ok(v.name === 'Alice' && v.age === 22, 'Original object must be not changed');

    assert.comment('Use "set" method with another data set');
    v.set({
      name: 'Bob',
      age: 30
    });
    assert.ok(v.name === 'Alice' && v.age === 22, 'Nothing changes');

    assert.comment('Test new object generated by calling set()');
    let u = v.set('name', 'Bob');
    assert.ok(bella.isObject(u), 'u must be an object');
    assert.ok(u.name === 'Bob', 'u.name must be Bob');
    assert.ok(u.age === v.age, 'u.age must be equal to v.age');

    assert.comment('Test the second object generated by calling set()');
    let w = u.set('nationality', 'USA');
    assert.ok(bella.isObject(w), 'w must be an object');
    assert.ok(w.name === u.name, 'w.name must be equal to u.name');
    assert.ok(w.age === u.age, 'w.age must be equal to u.age');
    assert.ok(w.nationality === 'USA', 'w.nationality must be USA');

    assert.comment('Test "get" method');
    assert.ok(w.get('name') === u.name, 'w.get name must be equal to u.name');
    assert.ok(w.get('age') === u.age, 'w.get age must be equal to u.age');
    assert.ok(w.get('nationality') === 'USA', 'w.get nationality must be USA');

    assert.end();
  });

};

variants.map(checkStabilizeObject);
