# stabilize.js


[![NPM](https://badge.fury.io/js/stabilize.js.svg)](https://badge.fury.io/js/stabilize.js)
[![Build Status](https://travis-ci.org/ndaidong/stabilize.js.svg?branch=master)](https://travis-ci.org/ndaidong/stabilize.js)
[![codecov](https://codecov.io/gh/ndaidong/stabilize.js/branch/master/graph/badge.svg)](https://codecov.io/gh/ndaidong/stabilize.js)
[![Dependency Status](https://gemnasium.com/badges/github.com/ndaidong/stabilize.js.svg)](https://gemnasium.com/github.com/ndaidong/stabilize.js)
[![NSP Status](https://nodesecurity.io/orgs/techpush/projects/3a9676ad-378b-40f5-b139-263eb709545a/badge)](https://nodesecurity.io/orgs/techpush/projects/3a9676ad-378b-40f5-b139-263eb709545a)


## Setup


- Node.js

  ```
  npm install stabilize.js
  ```

- CDN

  - [stabilize.js](https://cdn.rawgit.com/ndaidong/stabilize.js/master/dist/stabilize.js)
  - [stabilize.min.js](https://cdn.rawgit.com/ndaidong/stabilize.js/master/dist/stabilize.min.js)

- Also supports ES6 Module, AMD and UMD style.


### Usage

```
import {stabilize} from 'stabilize.js';

let user = {
  name: 'Bob',
  age: 17
};

let immutableUser = stabilize(user);

immutableUser.name = 'Alice';
console.log(immutableUser.name); // => 'Bob'

```

After stabilizing an object or array, it will become an immutable variable with several useful methods for easy manipulation as bellow.


## APIs


This library provides an only function named "stabilize" that you can pass through it an object or array to get back immutable version.

- stabilize(Array | Object val): return immutable version of val

Returned result, depending on which type it's (Array or Object), will have some particular methods as described in the next parts.

Now, just take a look on an example in Node.js:


```
import {stabilize} from 'stabilize.js';

let user = stabilize({
  name: 'Bob',
  age: 17
});

// user now is immutable
console.log(user);

// access the properties with get() or dot
let name = user.get('name'); // similar to user.name
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

```
stabilize(Object o);
```

Return an immutable object that has 2 methods:

- [.get](#get)
- [.set](#set)

Because the returned object is standard object, so you can still use the built-in methods in [Object.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype) as normal.

##### .get(key)

Return value of the specified property.

```
let car = stabilize({
  name: 'Tesla',
  speed: 1000,
  color: 'black'
});

let name = car.get('name');

// or:
// let name = car.name

console.log(name); // => Tesla
```


##### .set(key, value)

Return an new immutable object with new property.

Setter also accepts an object to allow to define many properties at the same time:

```
let car = stabilize({
  name: '',
  speed: 1000,
  color: 'black'
});

let tesla = car.set({
  name: 'Tesla',
  price: 40000
});

console.log(tesla);
```

*tesla* now is a new object with the following properties:

```
{
  name: 'Tesla',
  speed: 1000,
  color: 'black',
  price: 40000
}
```


#### Stabilize an array

```
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

```
let a = stabilize([1, 2, 2, 3, 2, 4]);
let b = a.unique();

console.log(b); // => [ 1, 2, 3, 4 ]
```

##### .min()

Return the smallest value from an array of numbers.

```
let a = stabilize([1, 2, 2, 3, 8, 5, 2, 4]);
let b = a.min();

console.log(b); // => 1
```

##### .max()

Return the biggest value from an array of numbers.

```
let a = stabilize([1, 2, 2, 3, 8, 5, 2, 4]);
let b = a.max();

console.log(b); // => 8
```

##### .first()

Return the first element from array.

```
let a = stabilize([1, 2, 5, 2, 3, 2, 4]);
let b = a.first();

console.log(b); // => 1
```

##### .last()

Return the last element from array.

```
let a = stabilize([1, 2, 5, 2, 3, 2, 4]);
let b = a.last();

console.log(b); // => 4
```

##### .pick([count])

Extract *count* elements from array in randomly order.

```
let a = stabilize([1, 2, 2, 3, 2, 4]);
let b = a.pick(3);
console.log(b); // output an array of 3 random elements
```

Without *count*, this method returns an only random element.


##### .insert(at, element1, element2, ...elementN)

Return a new array with new elements inserted at the position specified by first parameter.

```
let a = stabilize([1, 2, 3, 4]);
let b = a.insert(2, 'a');

console.log(b); // => [ 1, 2, 'a', 3, 4 ]
```

##### .append(element1, element2, ...elementN)

Return a new array with new elements added at the end.

```
let a = stabilize([1, 2, 3, 4]);
let b = a.append(5, 6, 7);

console.log(b); // => [ 1, 2, 3, 4, 5, 6, 7 ]
```

##### .remove(start, count)

Return a new array with *count* elements deleted beginning at *start*:

```
let a = stabilize([1, 2, 3, 4, 5, 6]);
let b = a.remove(3, 2); // remove 2 items from index 3, means 4 and 5

console.log(b); // => [ 1, 2, 3, 6 ]
```

##### .isort(compareFunction)

Return a new array sorted by *compareFunction*.

This method does the same thing as [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), but immutable.

```
let users = stabilize([
  {
    name: "Bob",
    age: 28
  },
  {
    name: "Anne",
    age: 21
  },
  {
    name: "Jim",
    age: 33
  },
    {
    name: "Kate",
    age: 17
  }
]);
let sortedUsers = users.isort((a, b) => {
  let ag = a.age;
  let bg = b.age;
  if (ag === bg) {
    return 0;
  }
  return ag < bg ? -1 : 1;
});

console.log(sortedUsers);
```

Output:

```
[ { name: 'Kate', age: 17 },
  { name: 'Anne', age: 21 },
  { name: 'Bob', age: 28 },
  { name: 'Jim', age: 33 } ]
```

##### .msort([Number | String | Object opt])

Advanced version of .isort() that allows to sort an array by some flexible ways.

```
var points = stabilize([1, 5, 19, 6, 4, 11, 7, 22, 40, 3, 8]);
console.log('Array points, original:');
console.log(points);

console.log('Array points, lowest to highest:');
var a1 = points.msort(); // without parameter
console.log(a1);

console.log('Array points, descendant:');
var a2 = points.msort(-1);
console.log(a2);

var players = stabilize([
  {
    name: 'Jerome Nash',
    age: 24
  },
  {
    name: 'Jackson Valdez',
    age: 21
  },
  {
    name: 'Benjamin Cole',
    age: 23
  },
  {
    name: 'Manuel Delgado',
    age: 33
  },
  {
    name: 'Caleb McKinney',
    age: 28
  }
]);

console.log('\nList of players as it is:');
players.forEach((item) => {
  console.log([item.name, item.age].join(' | '));
});

console.log('\nSort by age from youngest to oldest:');
var players1 = players.msort('age');
players1.forEach((item) => {
  console.log([item.name, item.age].join(' | '));
});

console.log('\nSort by age from oldest to youngest:');
var players2 = players.msort({age: -1});
players2.forEach((item) => {
  console.log([item.name, item.age].join(' | '));
});
```

Results:

![Array sorting easily](http://i.imgur.com/5n28Y6p.png)


##### .ireverse()

This method does the same thing as [Array.reverse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse), but immutable.

For example now you can reverse the above *sortedUsers* array:

```
let reversedUsers = sortedUsers.ireverse();
console.log(reversedUsers);
```

Output:

```
[ { name: 'Jim', age: 33 },
  { name: 'Bob', age: 28 },
  { name: 'Anne', age: 21 },
  { name: 'Kate', age: 17 } ]
```

##### .shuffle()

Return a clone of given array with shuffled elements.

```
let shuffledUsers = sortedUsers.shuffle();
console.log(shuffledUsers);
```


# Test

```
git clone https://github.com/ndaidong/stabilize.js.git
cd stabilize.js
npm install
npm test

// test in browser with jasmine
npm run jasmine
```


# License

The MIT License (MIT)
