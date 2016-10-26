# stabilize.js
This may be the simplest way to work with immutable data.

[![NPM](https://badge.fury.io/js/stabilize.js.svg)](https://badge.fury.io/js/stabilize.js)
[![Build Status](https://travis-ci.org/ndaidong/stabilize.js.svg?branch=master)](https://travis-ci.org/ndaidong/stabilize.js)
[![Coverage Status](https://coveralls.io/repos/github/ndaidong/stabilize.js/badge.svg?branch=master)](https://coveralls.io/github/ndaidong/stabilize.js?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/ndaidong/stabilize.js.svg)](https://gemnasium.com/github.com/ndaidong/stabilize.js)
[![Known Vulnerabilities](https://snyk.io/test/npm/stabilize.js/badge.svg)](https://snyk.io/test/npm/stabilize.js)


# Contents

* [Setup](#setup)
* [Usage](#usage)
  * [Stabilize an object](#stabilize-an-object)
  * [Stabilize an array](#stabilize-an-array)
* [Test](#test)


## Setup

- Node.js

  ```
  npm install stabilize.js --save
  ```

- CDN

  [stabilize.min.js](https://rawgit.com/ndaidong/stabilize.js/master/dist/stabilize.min.js)

  ```
  <script type="text/javascript" src="https://rawgit.com/ndaidong/stabilize.js/master/dist/stabilize.min.js"></script>
  ```

- This library also supports ES6 Module, AMD and UMD style.


# Usage

This library provides just one function named "stabilize" that you can pass through it an object or array to get back immutable version.


```
var x = stabilize(Array | Object y);
```

x is a copy of y, and immutable.

Here is an example with Node.js:
```
var stabilize = require('stabilize.js');

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


### Stabilize an object

```
stabilize(Object o);
```

Return an immutable object that has 2 methods "set()" and "get()".

Because the returned object is standard object, so you can still use the built-in methods in [Object.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype) as normal.

#### .get(key)

Return value of specified property.

#### .set(key, value)

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


### Stabilize an array

```
stabilize(Array a);
```

Return an immutable array that has the new methods: *unique*, *first*, *last*, *insert*, *append*, *remove*, *isort* and *ireverse*. All these methods return the immutable data.

Because the returned array is standard array, so you can still use the built-in methods in [Array.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) as normal.


#### .unique(key)

Return a new array with no duplicate elements.

```
let a = stabilize([1, 2, 2, 3, 2, 4]);
let b = a.unique();

console.log(b); // => [ 1, 2, 3, 4 ]
```

#### .first()

Return the first element from array.

```
let a = stabilize([1, 2, 2, 3, 2, 4]);
let b = a.first();

console.log(b); // => 1
```

#### .last()

Return the last element from array.

```
let a = stabilize([1, 2, 2, 3, 2, 4]);
let b = a.last();

console.log(b); // => 4
```

#### .insert(at, element1, element2, ...elementN)

Return a new array with new elements inserted at the position specified by first parameter.

```
let a = stabilize([1, 2, 3, 4]);
let b = a.insert(2, 'a');

console.log(b); // => [ 1, 2, 'a', 3, 4 ]
```

#### .append(element1, element2, ...elementN)

Return a new array with new elements added at the end.

```
let a = stabilize([1, 2, 3, 4]);
let b = a.append(5, 6, 7);

console.log(b); // => [ 1, 2, 3, 4, 5, 6, 7 ]
```

#### .remove(start, count)

Return a new array with *count* elements deleted beginning at *start*:

```
let a = stabilize([1, 2, 3, 4, 5, 6]);
let b = a.remove(3, 2); // remove 2 items from index 3, means 4 and 5

console.log(b); // => [ 1, 2, 3, 6 ]
```

#### .isort(compareFunction)

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


#### .ireverse()

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


# Test

```
git clone https://github.com/ndaidong/stabilize.js.git
cd stabilize.js
npm install
npm test
```


# License

The MIT License (MIT)
