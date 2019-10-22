# stabilize.js


[![NPM](https://badge.fury.io/js/stabilize.js.svg)](https://badge.fury.io/js/stabilize.js)
[![Build Status](https://travis-ci.org/ndaidong/stabilize.js.svg?branch=master)](https://travis-ci.org/ndaidong/stabilize.js)
[![Coverage Status](https://coveralls.io/repos/github/ndaidong/stabilize.js/badge.svg?branch=master)](https://coveralls.io/github/ndaidong/stabilize.js?branch=master)


### Setup

- Node

  ```
  npm i stabilize.js
  ```

- CDN
  - [stabilize.js](https://cdn.rawgit.com/ndaidong/stabilize.js/master/dist/stabilize.js)
  - [stabilize.min.js](https://cdn.rawgit.com/ndaidong/stabilize.js/master/dist/stabilize.min.js)


- This library also supports ES6 Module, AMD and UMD style.


### Usage

```js
const {stabilize} = require('stabilize.js');

const user = {
  name: 'Bob',
  age: 17,
};

const immutableUser = stabilize(user);

immutableUser.name = 'Alice';
console.log(immutableUser.name); // => 'Bob'

```

After stabilizing an object or array, it will become an immutable variable with several useful methods for easy manipulation as bellow.


## APIs


This library provides an only function named "stabilize" that you can pass through it an object or array to get back immutable version.

- stabilize(Array | Object val): return immutable version of val

Returned result, depending on which type it's (Array or Object), will have some particular methods as described in the next parts.

For instance:

```js
const {stabilize} = require('stabilize.js');

const user = stabilize({
  name: 'Bob',
  age: 17,
});

// user now is immutable
console.log(user);

// access the properties with get() or dot
const name = user.get('name'); // similar to user.name
console.log(name);

// you can change properties' value with set() method
// it will return a copy of user with new property

let guest = user.set('name', 'Tom');
console.log(guest.name); // => Tom

// the value of user.name can not be changed
console.log(user.name); // => Bob

// because it's immutable
user.name = 'Jerry';
console.log(user.name); // => Bob
```



#### Stabilize an object

```js
stabilize(Object o);
```

Return an immutable object that has 2 methods:

- [.get](#get)
- [.set](#set)

Because the returned object is standard object, so you can still use the built-in methods in [Object.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype) as normal.

##### .get(key)

Return value of the specified property.

```js
const car = stabilize({
  name: 'Tesla',
  speed: 1000,
  color: 'black',
});

const name = car.get('name');

// or:
// const name = car.name

console.log(name); // => Tesla
```


##### .set(key, value)

Return an new immutable object with new property.

Setter also accepts an object to allow to define many properties at the same time:

```js
const car = stabilize({
  name: '',
  speed: 1000,
  color: 'black',
});

const tesla = car.set({
  name: 'Tesla',
  price: 40000,
});

console.log(tesla);
```

*tesla* now is a new object with the following properties:

```js
{
  name: 'Tesla',
  speed: 1000,
  color: 'black',
  price: 40000
}
```


#### Stabilize an array

```js
stabilize(Array a);
```

Return an immutable array that has the following methods:

- [.unique](#unique)
- [.min](#min)
- [.max](#max)
- [.first](#first)
- [.last](#last)
- [.pick](#pickcount)
- [.insert](#insertat-element1-element2-elementn)
- [.append](#appendelement1-element2-elementn)
- [.remove](#removestart-count)
- [.isort](#isortcomparefunction)
- [.msort](#msortnumber--string--object-opt)
- [.ireverse](#ireverse)
- [.shuffle](#shuffle)

Because the returned array is standard array, so you can still use the built-in methods in [Array.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) as normal.


##### .unique()

Return a new array with no duplicate elements.

```js
const a = stabilize([1, 2, 2, 3, 2, 4]);
const b = a.unique();

console.log(b); // => [ 1, 2, 3, 4 ]
```

##### .min()

Return the smallest value from an array of numbers.

```js
const a = stabilize([1, 2, 2, 3, 8, 5, 2, 4]);
const b = a.min();

console.log(b); // => 1
```

##### .max()

Return the biggest value from an array of numbers.

```js
const a = stabilize([1, 2, 2, 3, 8, 5, 2, 4]);
const b = a.max();

console.log(b); // => 8
```

##### .first()

Return the first element from array.

```js
const a = stabilize([1, 2, 5, 2, 3, 2, 4]);
const b = a.first();

console.log(b); // => 1
```

##### .last()

Return the last element from array.

```js
const a = stabilize([1, 2, 5, 2, 3, 2, 4]);
const b = a.last();

console.log(b); // => 4
```

##### .pick([count])

Extract *count* elements from array in randomly order.

```js
let a = stabilize([1, 2, 2, 3, 2, 4]);
let b = a.pick(3);
console.log(b); // output an array of 3 random elements
```

Without *count*, this method returns an only random element.


##### .insert(at, element1, element2, ...elementN)

Return a new array with new elements inserted at the position specified by first parameter.

```js
const a = stabilize([1, 2, 3, 4]);
const b = a.insert(2, 'a');

console.log(b); // => [ 1, 2, 'a', 3, 4 ]
```

##### .append(element1, element2, ...elementN)

Return a new array with new elements added at the end.

```js
const a = stabilize([1, 2, 3, 4]);
const b = a.append(5, 6, 7);

console.log(b); // => [ 1, 2, 3, 4, 5, 6, 7 ]
```

##### .remove(start, count)

Return a new array with *count* elements deleted beginning at *start*:

```js
const a = stabilize([1, 2, 3, 4, 5, 6]);
const b = a.remove(3, 2); // remove 2 items from index 3, means 4 and 5

console.log(b); // => [ 1, 2, 3, 6 ]
```

##### .isort(compareFunction)

Return a new array sorted by *compareFunction*.

This method does the same thing as [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), but immutable.

```js
const users = stabilize([
  {
    name: "Bob",
    age: 28,
  },
  {
    name: "Anne",
    age: 21,
  },
  {
    name: "Jim",
    age: 33,
  },
    {
    name: "Kate",
    age: 17,
  },
]);
const sortedUsers = users.isort((a, b) => {
  const ag = a.age;
  const bg = b.age;
  if (ag === bg) {
    return 0;
  }
  return ag < bg ? -1 : 1;
});

console.log(sortedUsers);
```

Output:

```js
[ { name: 'Kate', age: 17 },
  { name: 'Anne', age: 21 },
  { name: 'Bob', age: 28 },
  { name: 'Jim', age: 33 } ]
```

##### .msort([Number | String | Object opt])

Advanced version of .isort() that allows to sort an array by some flexible ways.

```js
const points = stabilize([1, 5, 19, 6, 4, 11, 7, 22, 40, 3, 8]);
console.log('Array points, original:');
console.log(points);

console.log('Array points, lowest to highest:');
const a1 = points.msort(); // without parameter
console.log(a1);

console.log('Array points, descendant:');
const a2 = points.msort(-1);
console.log(a2);

const players = stabilize([
  {
    name: 'Jerome Nash',
    age: 24,
  },
  {
    name: 'Jackson Valdez',
    age: 21,
  },
  {
    name: 'Benjamin Cole',
    age: 23,
  },
  {
    name: 'Manuel Delgado',
    age: 33,
  },
  {
    name: 'Caleb McKinney',
    age: 28,
  },
]);

console.log('\nList of players as it is:');
players.forEach((item) => {
  console.log([item.name, item.age].join(' | '));
});

console.log('\nSort by age from youngest to oldest:');
const players1 = players.msort('age');
players1.forEach((item) => {
  console.log([item.name, item.age].join(' | '));
});

console.log('\nSort by age from oldest to youngest:');
const players2 = players.msort({age: -1});
players2.forEach((item) => {
  console.log([item.name, item.age].join(' | '));
});
```

Results:

```
Array points, original:
[ 1, 5, 19, 6, 4, 11, 7, 22, 40, 3, 8 ]
Array points, lowest to highest:
[ 1, 3, 4, 5, 6, 7, 8, 11, 19, 22, 40 ]
Array points, descendant:
[ 40, 22, 19, 11, 8, 7, 6, 5, 4, 3, 1 ]

List of players as it is:
Jerome Nash | 24
Jackson Valdez | 21
Benjamin Cole | 23
Manuel Delgado | 33
Caleb McKinney | 28

Sort by age from youngest to oldest:
Jackson Valdez | 21
Benjamin Cole | 23
Jerome Nash | 24
Caleb McKinney | 28
Manuel Delgado | 33

Sort by age from oldest to youngest:
Manuel Delgado | 33
Caleb McKinney | 28
Jerome Nash | 24
Benjamin Cole | 23
Jackson Valdez | 21
```


##### .ireverse()

This method does the same thing as [Array.reverse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse), but immutable.

For example now you can reverse the above *sortedUsers* array:

```
const reversedUsers = sortedUsers.ireverse();
console.log(reversedUsers);
```

Output:

```js
[ { name: 'Jim', age: 33 },
  { name: 'Bob', age: 28 },
  { name: 'Anne', age: 21 },
  { name: 'Kate', age: 17 } ]
```

##### .shuffle()

Return a clone of given array with shuffled elements.

```js
const shuffledUsers = sortedUsers.shuffle();
console.log(shuffledUsers);
```


# Test

```bash
git clone https://gitlab.com/ndaidong/stabilize-js.git
cd stabilize.js
npm install
npm test

```


# License

The MIT License (MIT)
