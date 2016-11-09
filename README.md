# stabilize.js

*Important*: This library has been merged into [BellaJS](https://github.com/ndaidong/bellajs#immutable-array--object). Please use [BellaJS](https://github.com/ndaidong/bellajs) instead because this repo will stay here without continuous updating.

[![NPM](https://badge.fury.io/js/stabilize.js.svg)](https://badge.fury.io/js/stabilize.js)
[![Build Status](https://travis-ci.org/ndaidong/stabilize.js.svg?branch=master)](https://travis-ci.org/ndaidong/stabilize.js)
[![Coverage Status](https://coveralls.io/repos/github/ndaidong/stabilize.js/badge.svg?branch=master)](https://coveralls.io/github/ndaidong/stabilize.js?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/ndaidong/stabilize.js.svg)](https://gemnasium.com/github.com/ndaidong/stabilize.js)
[![Known Vulnerabilities](https://snyk.io/test/npm/stabilize.js/badge.svg)](https://snyk.io/test/npm/stabilize.js)


## Usage


Install:

```
npm install stabilize.js --save
```

Then:

```
var stabilize = require('stabilize.js');

// stabilize object
let user = stabilize({
  name: 'Bob',
  age: 17
});

// stabilize array
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
```

See  [BellaJS - Immutable array/object](https://github.com/ndaidong/bellajs#immutable-array--object) for more detail.



# Test

```
git clone https://github.com/ndaidong/stabilize.js.git
cd stabilize.js
npm install
npm test
```


# License

The MIT License (MIT)
