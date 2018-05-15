# shallow-utils

[![npm version](https://badge.fury.io/js/shallow-utils.svg)](http://badge.fury.io/js/shallow-utils)
![Downloads](http://img.shields.io/npm/dm/shallow-utils.svg?style=flat)

Utilities for shallow comparisons, particularly for React optimisation

## Installation

Install the package with npm:

```
npm install shallow-utils
```

## Usage

Use the shallow comparison as an auto-typing wrapper for `shallow-equal`'s `shallowEqualArray`
and `shallowEqualObject`.

```javascript
import { shallowEqual } from 'shallow-utils'

let a = {title: 'The Wizard of Oz',}
let b = {title: 'The Wizard of Oz',}

console.log(shallowEqual(a, b))
// true

let c = [5]
let d = [5]
console.log(shallowEqual(c, d))
// true
```

When you want to compare an object minus a set of attributes, use `shallowEqualExcept`.

Then, for debugging purposes, use `shallowItemsDifferExcept` as a helper to let you know what
changed.

```javascript
import { shallowEqual, shallowEqualExcept, shallowItemsDifferExcept } from 'shallow-utils'

let a = {title: 'The Wizard of Oz', showing: false}
let b = {title: 'The Wizard of Oz', showing: true}

console.log(shallowEqual(a, b))
// false

console.log(shallowEqualExcept(a, b, ['showing',]))
// true

b.title = 'The Matrix'
console.log(shallowItemsDifferExcept(a, b, ['showing',]))
// ['title',]
```

All together in one `shouldComponentUpdate`:

```javascript
import React from 'react'
import { shallowEqual, shallowEqualExcept, shallowItemsDifferExcept } from 'shallow-utils'

class Example extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (!shallowEqual(this.props.arrayOfStuff, nextProps.arrayOfStuff)) {
      // console.log('arrayOfStuff changed')
      return true
    }

    let checkedProps = [
      'arrayOfStuff',
    ]
    if (!shallowEqualExcept(this.props, nextProps, checkedProps)) {
      // console.log('misc props changed', shallowItemsDifferExcept(this.props, nextProps, checkedProps))
      return true
    }
    return false
  }
}
```
