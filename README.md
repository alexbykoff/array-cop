#Array Cop#
[![Code Climate](https://codeclimate.com/github/tomkallen/array-cop/badges/gpa.svg)](https://codeclimate.com/github/tomkallen/array-cop) [![GitHub version](https://badge.fury.io/gh/tomkallen%2Farray-cop.svg)](https://badge.fury.io/gh/tomkallen%2Farray-cop)

:cop:  
Arraycop is a zero-dependant vanilla JS nano-library / npm module that deals with arrays.
It is just an utility tool that makes life easier.

##Current features:  
:police_car:  
- Flatten any nested arrays  
- Remove all the duplicates  
- Pick any random item in any range  
- Calculate the sum of all Number items    
- Calculate Arithmetic mean  
- Calculate Geometric mean  
- Convert to frequency matrix object  

----------

##Usage##
###Browser###
`<script src = "array-cop.min.js">`
###npm (not published yet)###
`npm install --save array-cop`

`var array_ = require('array-cop');`  


----------

##API##
```
var arr = [8, 1000,["Jack", 8, 'Bob', 'Alice', 5], 1, function x() {return 1 / x}, function a() {}, 2, [2, 3, 4, [5, 4, 6]], 7, 11, 7, [2], {
    x: 1,
    y: "test"
}];
```

###**---Flatten an array:**
**`array_.flatten(arr);`**  
Flattens an array to a dingle-dimensional one. Goes as deep into subarrays as needed.  
`console.log(array_.flatten(arr));`  
> [ 8, 1000,  'Jack',  8,  'Bob',  'Alice',  5,  1, [Function: x],  [Function: a],  2,  2,  3,  4,  5,  4,  6,  7,  11,  7,  2,  { x: 1, y: 'test' } ]

###**---Remove duplicates:**  
**`array_.dedup(arr);`**  
Removes duplicates from an array. Items in nested arrays are not treated as duplicates to avoid mess. If you want to remove duplicates from the sub-arrays as well then `flatten()` first.  
`console.log(array_.dedup(arr));`  
> [ 8,   1000,  [ 'Jack', 8, 'Bob', 'Alice', 5 ],   1,  [Function: x],  [Function: a],  2,  [ 2, 3, 4, [ 5, 4, 6 ] ],  7,  11,  [ 2 ],  { x: 1, y: 'test' } ]  

###**---Return a random array item**
**`array_.rand(arr,[min],[max])`**  
**min, max** — optional parameters, set the range of items to choose from.  
Randomly picks and returns one item from an array.  
**`console.log(array_.rand(arr,3,8));`**
> [Function: x]

###**---Sum of all items**
**`array_.sum(arr);`**  
Flattens an array and takes only numeric values into a consideration.  
`console.log(array_.sum(arr);`
> 1075

###**---Arithmetic mean**
**`array_.meanAri(arr, [precision])`**  
**precision** — optional value, sets the number of digits after a decimal point. If omitted then falls back to 2
Flattens an array and takes only numeric values into a consideration.  
`console.log(array_.meanAri(arr, 3);`
> 67.188

###**---Geometric mean**
**`array_.meanGeo(arr, [precision])`**  
**precision** — optional value, sets the number of digits after a decimal point. If omitted then falls back to 2
Flattens an array and takes only numeric values into a consideration.  
`console.log(array_.meanGeo(arr, 2);`
> 5.87

###**---Frequency matrix**  
**`array_.freq(arr)`**  
Returns an object `item: frequency`, where `item` is the value of an each array item and `frequency` is the number of times that item appears in an array. Flattens an array before evaluation.  
`console.log(array_.freq(arr);`
> { '1': 1,
  '2': 3,
  '3': 1,
  '4': 2,
  '5': 2,
  '6': 1,
  '7': 2,
  '8': 2,
  '11': 1,
  '1000': 1,
  Jack: 1,
  Bob: 1,
  Alice: 1,
  'function x() {return 1 / x}': 1,
  'function a() {}': 1,
  '[object Object]': 1 }
