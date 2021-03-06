/**
 * Testing
 * @ndaidong
 */

const test = require('tap').test;
const bella = require('bellajs');

const {
  variants,
} = require('../config');

const checkStabilizeArray = (stabilize) => {
  test('Test how it works with array', (assert) => {
    assert.comment('Create an array using stabilize');
    const v = stabilize([
      {
        name: 'Alice',
        age: 22,
      },
      {
        name: 'Nick',
        age: 19,
      },
      {
        name: 'Tom',
        age: 25,
      },
      {
        name: 'Paul',
        age: 16,
      },
      {
        name: 'Tom',
        age: 25,
      },
      {
        name: 'Rick',
        age: 26,
      },
      {
        name: 'Mary',
        age: 28,
      },
      {
        name: 'Kelly',
        age: 21,
      },
    ]);

    assert.ok(bella.isArray(v), 'v must be an array');
    assert.ok(v.length === 8, 'v must have 8 elements');

    assert.comment('Check if the methods exist');
    const checkMethods = (m) => {
      assert.ok(bella.isFunction(v[m]), `v must have method "${m}"`);
    };

    [
      'min',
      'max',
      'unique',
      'first',
      'last',
      'pick',
      'insert',
      'append',
      'remove',
      'isort',
      'msort',
      'ireverse',
      'shuffle',
    ].map(checkMethods);

    assert.comment('Check the method ".min()"');
    const original1 = stabilize([
      1, 6, 9, 0, 6, 5, 3, 5, 2, 7, 6, 8,
    ]);
    const original1Min = original1.min();
    assert.ok(original1Min === 0, 'original1Min must be 0');

    assert.comment('Check the method ".max()"');
    const original2 = stabilize([
      1, 6, 9, 0, 6, 5, 3, 5, 2, 7, 6, 8,
    ]);
    const original2Max = original2.max();
    assert.ok(original2Max === 9, 'original2Max must be 9');

    assert.comment('Check the method ".unique()"');
    const original = stabilize([
      1, 6, 9, 0, 6, 5, 3, 5, 2, 7, 6, 8,
    ]);
    const originalUnique = original.unique();
    assert.ok(original.length === 12, 'original.length must be 12 (no change)');
    assert.ok(bella.isArray(originalUnique), 'originalUnique must be an array');
    assert.ok(originalUnique.length === 9, 'originalUnique.length must be 9');

    assert.comment('Check the method ".first()"');
    const vfirst = v.first();
    assert.ok(bella.isObject(vfirst), 'vfirst must be an object');
    assert.ok(vfirst.name === 'Alice', 'vfirst must have name = Alice');
    assert.ok(vfirst.age === 22, 'vfirst must have age = 22');

    assert.comment('Check the method ".last()"');
    const vlast = v.last();
    assert.ok(bella.isObject(vlast), 'vlast must be an object');
    assert.ok(vlast.name === 'Kelly', 'vlast must have name = Kelly');
    assert.ok(vlast.age === 21, 'vlast must have age = 21');

    assert.comment('Check the method ".insert()"');
    const vinsert = v.insert(0, {
      name: 'Susan',
      age: 18,
    });
    assert.ok(v.length === 8, 'v.length must be 8 (no change)');
    assert.ok(bella.isArray(vinsert), 'vinsert must be an array');
    assert.ok(vinsert.length === v.length + 1, `vinsert.length must be ${v.length + 1}`);
    const vinsertFirstItem = vinsert.first();
    assert.ok(vinsertFirstItem.name === 'Susan', 'vinsertFirstItem must have name = Susan');
    assert.ok(vinsertFirstItem.age === 18, 'vinsertFirstItem must have age = 18');

    const vinsert2 = vinsert.insert(4, {
      name: 'Simon',
      age: 29,
    });

    assert.ok(v.length === 8, 'v.length must be 8 (no change)');
    assert.ok(vinsert.length === 9, 'vinsert.length must be 9 (no change)');
    assert.ok(bella.isArray(vinsert2), 'vinsert2 must be an array');
    assert.ok(vinsert2.length === vinsert.length + 1, `vinsert2.length must be ${vinsert.length + 1}`);
    const vinsert2Item4 = vinsert2[4];
    assert.ok(vinsert2Item4.name === 'Simon', 'vinsert2Item4 must have name = Simon');
    assert.ok(vinsert2Item4.age === 29, 'vinsert2Item4 must have age = 29');

    assert.comment('Check the method ".append()"');
    const vappend = v.append({
      name: 'Yumi',
      age: 21,
    }, {
      name: 'Kate',
      age: 24,
    }, {
      name: 'Jun',
      age: 31,
    }, {
      name: 'Walker',
      age: 15,
    });
    assert.ok(v.length === 8, 'v.length must be 8 (no change)');
    assert.ok(bella.isArray(vinsert2), 'vinsert2 must be an array');
    assert.ok(vappend.length === v.length + 4, `vappend.length must be ${v.length + 4}`);
    const vappendLastItem = vappend.last();
    assert.ok(vappendLastItem.name === 'Walker', 'vappendLastItem must have name = Walker');
    assert.ok(vappendLastItem.age === 15, 'vappendLastItem must have age = 15');

    assert.comment('Check the method ".remove()"');

    assert.comment('-- Remove nothing"');
    const vremoveNothing = v.remove();
    assert.ok(v.length === 8, 'v.length must be 8 (no change)');
    assert.ok(bella.isArray(vremoveNothing), 'vremoveNothing must be an array');
    assert.ok(vremoveNothing.length === v.length, `vremoveNothing.length must be ${v.length}`);
    const vremoveNothingFirstItem = vremoveNothing.first();
    assert.ok(vremoveNothingFirstItem.name === 'Alice', 'vremoveNothingFirstItem must have name = Alice');
    assert.ok(vremoveNothingFirstItem.age === 22, 'vremoveNothingFirstItem must have age = 22');

    assert.comment('-- Remove 2 first items"');
    const vremove2first = v.remove(0, 2);
    assert.ok(v.length === 8, 'v.length must be 8 (no change)');
    assert.ok(bella.isArray(vremove2first), 'vremove2first must be an array');
    assert.ok(vremove2first.length === v.length - 2, `vremove2first.length must be ${v.length - 2}`);
    const vremoveFirstItem = vremove2first.first();
    assert.ok(vremoveFirstItem.name === 'Tom', 'vremoveFirstItem must have name = Tom');
    assert.ok(vremoveFirstItem.age === 25, 'vremoveFirstItem must have age = 25');

    assert.comment('-- Remove 2 last items"');
    const vremove2Last = v.remove(v.length - 2, 2);
    assert.ok(v.length === 8, 'v.length must be 8 (no change)');
    assert.ok(bella.isArray(vremove2Last), 'vremove2Last must be an array');
    assert.ok(vremove2Last.length === v.length - 2, `vremove2Last.length must be ${v.length - 2}`);
    const vremoveLastItem = vremove2Last.last();
    assert.ok(vremoveLastItem.name === 'Rick', 'vremoveLastItem must have name = Rick');
    assert.ok(vremoveLastItem.age === 26, 'vremoveLastItem must have age = 26');

    assert.comment('Check the method ".isort()"');
    const visort = v.isort((a, b) => {
      const ag = a.age;
      const bg = b.age;
      if (ag === bg) {
        return 0;
      }
      return ag < bg ? -1 : 1;
    });
    assert.ok(v.length === 8, 'v.length must be 8 (no change)');
    assert.ok(bella.isArray(visort), 'viresort must be an array');
    assert.ok(visort.length === v.length, `visort.length must be ${v.length}`);
    const viresortFirstItem = visort.first();
    assert.ok(viresortFirstItem.name === 'Paul', 'viresortFirstItem must have name = Paul');
    assert.ok(viresortFirstItem.age === 16, 'viresortFirstItem must have age = 16');
    const viresortLastItem = visort.last();
    assert.ok(viresortLastItem.name === 'Mary', 'viresortLastItem must have name = Mary');
    assert.ok(viresortLastItem.age === 28, 'viresortLastItem must have age = 28');


    assert.comment('Check the method ".msort()"');
    const o2y = v.msort({age: -1});
    assert.ok(v.length === o2y.length, `o2y.length must be ${v.length} (no change)`);
    const y2o = v.msort('age');
    assert.ok(v.length === y2o.length, `y2o.length must be ${v.length} (no change)`);
    assert.ok(o2y.first().age === y2o.last().age, `o2y.first().age must be equal to y2o.last().age`);
    const nums = [5, 12, 61, 123, 98, 11, 44, 55];
    const sortedNums = stabilize(nums).msort();
    assert.ok(sortedNums.length === nums.length, `sortedNums.length must be ${nums.length} (no change)`);
    assert.ok(sortedNums.first(), 5, 'First number must be 5');
    assert.ok(sortedNums.last(), 123, 'Last number must be 123');

    assert.comment('Check the method ".ireverse()"');
    const vIsortIreverse = visort.ireverse();
    assert.ok(visort.length === 8, 'visort.length must be 8 (no change)');
    assert.ok(bella.isArray(vIsortIreverse), 'vIsortIreverse must be an array');
    assert.ok(vIsortIreverse.length === visort.length, `vIsortIreverse.length must be ${visort.length}`);
    const vIsortIreverseFirstItem = vIsortIreverse.first();
    assert.ok(vIsortIreverseFirstItem.name === 'Mary', 'vIsortIreverseFirstItem must have name = Mary');
    assert.ok(vIsortIreverseFirstItem.age === 28, 'vIsortIreverseFirstItem must have age = 28');
    const vIsortIreverseLastItem = vIsortIreverse.last();
    assert.ok(vIsortIreverseLastItem.name === 'Paul', 'vIsortIreverseLastItem must have name = Paul');
    assert.ok(vIsortIreverseLastItem.age === 16, 'vIsortIreverseLastItem must have age = 16');

    assert.comment('Check the method ".shuffle()"');
    const arr2Shuffle = stabilize([
      1, 4, 9, 18, 55, 64, 2, 7, 33, 8, 11, 44, 99, 15, 35, 64, 12, 27, 13, 28,
    ]);

    const r1 = arr2Shuffle.shuffle();
    assert.deepEquals(r1.length, arr2Shuffle.length, 'Returned array has same length');
    assert.notDeepEqual(r1, arr2Shuffle, 'Returned array is not same as original');
    const r2 = arr2Shuffle.shuffle();
    assert.deepEquals(r2.length, arr2Shuffle.length, 'Returned array has same length');
    assert.notDeepEqual(r2, arr2Shuffle, 'Returned array is not same as original');

    assert.deepEquals(r2.length, r1.length, 'r2.length must be equal to r1.length');
    assert.notDeepEqual(r2, r1, 'r2 is not same as r1');

    assert.comment('Check the method ".pick()"');
    const arr2Pick = stabilize(arr2Shuffle);

    const k1 = arr2Pick.pick();
    assert.ok(bella.isNumber(k1), 'arr2Pick.pick() must return a number');

    const k2 = arr2Pick.pick(3);
    const size2 = Math.min(3, arr2Pick.length);
    assert.deepEquals(k2.length, size2, `arr2Pick.pick(3) must return array with ${size2} items`);

    const k3 = arr2Pick.pick(5);
    const size3 = Math.min(5, arr2Pick.length);
    assert.deepEquals(k3.length, size3, `arr2Pick.pick(5) must return array with ${size3} items`);

    const k4 = arr2Pick.pick(50);
    assert.deepEquals(k4.length, arr2Pick.length, 'arr2Pick.pick(50) must return shuffled original array');

    const k5 = arr2Pick.pick(-2);
    assert.ok(bella.isNumber(k5), 'arr2Pick.pick(-1) must return a number');

    assert.end();
  });
};

variants.map(checkStabilizeArray);

