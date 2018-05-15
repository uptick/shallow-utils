import shallowEqualObjects from 'shallow-equal/objects'
import shallowEqualArrays from 'shallow-equal/arrays'

function clonedWithout(item, exceptions) {
  let clone = {...item,}
  exceptions.map(function(exception) {
    if (exception in clone) {
      delete clone[exception]
    }
  })
  return clone
}

function shallowEqual(a, b) {
  let aIsArray = Array.isArray(a)
  let bIsArray = Array.isArray(b)
  if (aIsArray && bIsArray) {
    return shallowEqualArrays(a, b)
  }
  else if (!aIsArray && !bIsArray) {
    return shallowEqualObjects(a, b)
  }
  return false
}

function shallowEqualExcept(a, b, exceptions) {
  let trimmedA = clonedWithout(a, exceptions)
  let trimmedB = clonedWithout(b, exceptions)
  return shallowEqual(trimmedA, trimmedB)
}

function shallowItemsDiffer(a, b) {
  let differing = {}
  for (var aKey in a) {
    if (a[aKey] != b[aKey]) {
      differing[aKey] = true
    }
  }
  for (var bKey in b) {
    if (a[bKey] != b[bKey]) {
      differing[bKey] = true
    }
  }
  return Object.keys(differing)
}

function shallowItemsDifferExcept(a, b, exceptions) {
  let trimmedA = clonedWithout(a, exceptions)
  let trimmedB = clonedWithout(b, exceptions)
  return shallowItemsDiffer(trimmedA, trimmedB)
}

export {
  shallowEqual,
  shallowEqualExcept,
  shallowItemsDiffer,
  shallowItemsDifferExcept,
}
