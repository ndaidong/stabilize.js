# stabilize.js
Small util for creating and using immutable data

[![NPM](https://badge.fury.io/js/stabilize.js.svg)](https://badge.fury.io/js/stabilize.js)
[![Build Status](https://travis-ci.org/ndaidong/stabilize.js.svg?branch=master)](https://travis-ci.org/ndaidong/stabilize.js)
[![Coverage Status](https://coveralls.io/repos/github/ndaidong/stabilize.js/badge.svg?branch=master)](https://coveralls.io/github/ndaidong/stabilize.js?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/ndaidong/stabilize.js.svg)](https://gemnasium.com/github.com/ndaidong/stabilize.js)
[![Known Vulnerabilities](https://snyk.io/test/npm/stabilize.js/badge.svg)](https://snyk.io/test/npm/stabilize.js)


# Contents

* [Setup](#setup)
* [Usage](#usage)
* [Test](#test)


## Setup

- Node.js

  ```
  npm install stabilize.js --save
  ```

- CDN

  [stabilize.min.js](https://cdn.rawgit.com/ndaidong/stabilize.js/master/dist/stabilize.min.js)

  ```
  <script type="text/javascript" src="https://cdn.rawgit.com/ndaidong/bellajs/master/dist/bella.min.js"></script>
  ```

- This library also supports ES6 Module, AMD and UMD style.


# Usage

This library stabilize.is provides just one function named "stabilize" that you can pass through it an object or array to get an immutable version returns.

An example with Node.js:

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
```

// Todo: Improve documentation


# Test

```
git clone https://github.com/ndaidong/stabilize.js.git
cd stabilize.js
npm install
npm test
```


# License

The MIT License (MIT)
