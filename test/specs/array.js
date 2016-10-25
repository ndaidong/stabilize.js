/**
 * Testing
 * @ndaidong
 */

var test = require('tape');
var bella = require('bellajs');

var stabilize = require('../../index');

test('Test how it works with array', (assert) => {

  assert.comment('Create an array using stabilize');
  let v = stabilize([
    {
      name: 'Alice',
      age: 22
    },
    {
      name: 'Nick',
      age: 19
    },
    {
      name: 'Tom',
      age: 25
    },
    {
      name: 'Paul',
      age: 16
    },
    {
      name: 'Tom',
      age: 25
    },
    {
      name: 'Rick',
      age: 26
    },
    {
      name: 'Mary',
      age: 28
    },
    {
      name: 'Kelly',
      age: 21
    }
  ]);

  assert.ok(bella.isArray(v), 'v must be an array');
  assert.ok(v.length === 8, 'v must have 8 elements');

  assert.comment('Check if the methods exist');
  let checkMethods = (m) => {
    assert.ok(bella.isFunction(v[m]), `v must have method "${m}"`);
  };

  [
    'unique',
    'first',
    'last',
    'insert',
    'append',
    'remove',
    'isort',
    'ireverse'
  ].map(checkMethods);

  assert.comment('Check the method ".unique()"');
  let original = stabilize([
    1, 6, 9, 0, 6, 5, 3, 5, 2, 7, 6, 8
  ]);
  let originalUnique = original.unique();
  assert.ok(original.length === 12, 'original.length must be 12 (no change)');
  assert.ok(bella.isArray(originalUnique), 'originalUnique must be an array');
  assert.ok(originalUnique.length === 9, 'originalUnique.length must be 9');

  assert.comment('Check the method ".first()"');
  let vfirst = v.first();
  assert.ok(bella.isObject(vfirst), 'vfirst must be an object');
  assert.ok(vfirst.name === 'Alice', 'vfirst must have name = Alice');
  assert.ok(vfirst.age === 22, 'vfirst must have age = 22');

  assert.comment('Check the method ".last()"');
  let vlast = v.last();
  assert.ok(bella.isObject(vlast), 'vlast must be an object');
  assert.ok(vlast.name === 'Kelly', 'vlast must have name = Kelly');
  assert.ok(vlast.age === 21, 'vlast must have age = 21');

  assert.comment('Check the method ".insert()"');
  let vinsert = v.insert(0, {
    name: 'Susan',
    age: 18
  });
  assert.ok(v.length === 8, 'v.length must be 8 (no change)');
  assert.ok(bella.isArray(vinsert), 'vinsert must be an array');
  assert.ok(vinsert.length === v.length + 1, `vinsert.length must be ${v.length + 1}`);
  let vinsertFirstItem = vinsert.first();
  assert.ok(vinsertFirstItem.name === 'Susan', 'vinsertFirstItem must have name = Susan');
  assert.ok(vinsertFirstItem.age === 18, 'vinsertFirstItem must have age = 18');

  let vinsert2 = vinsert.insert(4, {
    name: 'Simon',
    age: 29
  });
  assert.ok(v.length === 8, 'v.length must be 8 (no change)');
  assert.ok(vinsert.length === 9, 'vinsert.length must be 9 (no change)');
  assert.ok(bella.isArray(vinsert2), 'vinsert2 must be an array');
  assert.ok(vinsert2.length === vinsert.length + 1, `vinsert2.length must be ${vinsert.length + 1}`);
  let vinsert2Item4 = vinsert2[4];
  assert.ok(vinsert2Item4.name === 'Simon', 'vinsert2Item4 must have name = Simon');
  assert.ok(vinsert2Item4.age === 29, 'vinsert2Item4 must have age = 29');

  assert.comment('Check the method ".append()"');
  let vappend = v.append({
    name: 'Yumi',
    age: 21
  }, {
    name: 'Kate',
    age: 24
  }, {
    name: 'Jun',
    age: 31
  }, {
    name: 'Walker',
    age: 15
  });
  assert.ok(v.length === 8, 'v.length must be 8 (no change)');
  assert.ok(bella.isArray(vinsert2), 'vinsert2 must be an array');
  assert.ok(vappend.length === v.length + 4, `vappend.length must be ${v.length + 4}`);
  let vappendLastItem = vappend.last();
  assert.ok(vappendLastItem.name === 'Walker', 'vappendLastItem must have name = Walker');
  assert.ok(vappendLastItem.age === 15, 'vappendLastItem must have age = 15');

  assert.comment('Check the method ".remove()"');

  assert.comment('-- Remove nothing"');
  let vremoveNothing = v.remove();
  assert.ok(v.length === 8, 'v.length must be 8 (no change)');
  assert.ok(bella.isArray(vremoveNothing), 'vremoveNothing must be an array');
  assert.ok(vremoveNothing.length === v.length, `vremoveNothing.length must be ${v.length}`);
  let vremoveNothingFirstItem = vremoveNothing.first();
  assert.ok(vremoveNothingFirstItem.name === 'Alice', 'vremoveNothingFirstItem must have name = Alice');
  assert.ok(vremoveNothingFirstItem.age === 22, 'vremoveNothingFirstItem must have age = 22');

  assert.comment('-- Remove 2 first items"');
  let vremove2first = v.remove(0, 2);
  assert.ok(v.length === 8, 'v.length must be 8 (no change)');
  assert.ok(bella.isArray(vremove2first), 'vremove2first must be an array');
  assert.ok(vremove2first.length === v.length - 2, `vremove2first.length must be ${v.length - 2}`);
  let vremoveFirstItem = vremove2first.first();
  assert.ok(vremoveFirstItem.name === 'Tom', 'vremoveFirstItem must have name = Tom');
  assert.ok(vremoveFirstItem.age === 25, 'vremoveFirstItem must have age = 25');

  assert.comment('-- Remove 2 last items"');
  let vremove2Last = v.remove(v.length - 2, 2);
  assert.ok(v.length === 8, 'v.length must be 8 (no change)');
  assert.ok(bella.isArray(vremove2Last), 'vremove2Last must be an array');
  assert.ok(vremove2Last.length === v.length - 2, `vremove2Last.length must be ${v.length - 2}`);
  let vremoveLastItem = vremove2Last.last();
  assert.ok(vremoveLastItem.name === 'Rick', 'vremoveLastItem must have name = Rick');
  assert.ok(vremoveLastItem.age === 26, 'vremoveLastItem must have age = 26');

  assert.comment('Check the method ".iresort()"');
  let visort = v.isort((a, b) => {
    let ag = a.age;
    let bg = b.age;
    if (ag === bg) {
      return 0;
    }
    return ag < bg ? -1 : 1;
  });
  assert.ok(v.length === 8, 'v.length must be 8 (no change)');
  assert.ok(bella.isArray(visort), 'viresort must be an array');
  assert.ok(visort.length === v.length, `visort.length must be ${v.length}`);
  let viresortFirstItem = visort.first();
  assert.ok(viresortFirstItem.name === 'Paul', 'viresortFirstItem must have name = Paul');
  assert.ok(viresortFirstItem.age === 16, 'viresortFirstItem must have age = 16');
  let viresortLastItem = visort.last();
  assert.ok(viresortLastItem.name === 'Mary', 'viresortLastItem must have name = Mary');
  assert.ok(viresortLastItem.age === 28, 'viresortLastItem must have age = 28');

  assert.comment('Check the method ".ireverse()"');
  let vIsortIreverse = visort.ireverse();
  assert.ok(visort.length === 8, 'visort.length must be 8 (no change)');
  assert.ok(bella.isArray(vIsortIreverse), 'vIsortIreverse must be an array');
  assert.ok(vIsortIreverse.length === visort.length, `vIsortIreverse.length must be ${visort.length}`);
  let vIsortIreverseFirstItem = vIsortIreverse.first();
  assert.ok(vIsortIreverseFirstItem.name === 'Mary', 'vIsortIreverseFirstItem must have name = Mary');
  assert.ok(vIsortIreverseFirstItem.age === 28, 'vIsortIreverseFirstItem must have age = 28');
  let vIsortIreverseLastItem = vIsortIreverse.last();
  assert.ok(vIsortIreverseLastItem.name === 'Paul', 'vIsortIreverseLastItem must have name = Paul');
  assert.ok(vIsortIreverseLastItem.age === 16, 'vIsortIreverseLastItem must have age = 16');

  assert.end();
});
