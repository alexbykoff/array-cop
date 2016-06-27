[![Serve and Array](http://i.imgur.com/Fciup0A.png?1)](http://tomkallen.github.io)  
#Array Cop  
[![npm version](https://badge.fury.io/js/array-cop.svg)](https://badge.fury.io/js/array-cop)[![Build Status](https://travis-ci.org/tomkallen/array-cop.svg?branch=master)](https://travis-ci.org/tomkallen/array-cop) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/19b1eead08a24b8c97756b5f5ac45adc)](https://www.codacy.com/app/spbeat/array-cop?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=tomkallen/array-cop&amp;utm_campaign=Badge_Grade)

Array Cop is a dependency-free vanilla JS nano-library / npm module that deals with arrays.
It is just an utility tool that makes life easier and also does some maths for you.  

##Current features:  

- Flatten nested arrays  
- Remove all the duplicates  
- Pick any random item in any range  
- Calculate the sum of all the Number items    
- Calculate an Arithmetic mean  
- Calculate a Geometric mean  
- Calculate a Harmonic mean  
- Find a median  
- Convert to the frequency matrix object  
- Log an array breakdown  
- Remove all the empty items from the nested arrays  
- Filter items in an array by type  
- Convert an object into an array **(0.5.0)+**  
- Get rid of all non-alphanumeric characters **(0.4.2)+**  
- Get an array of indexes of an element **(0.6.0)+**  

###since version 0.5.0 minified js is not provided anymore. Use normal version in your browser and minify/concat during your usual production routine.  

----------

##Usage
###Browser
`<script src = "array-cop.js">`
###npm
`npm install array-cop`

`var array_ = require('array-cop');`  


----------

##API
```
var arr = [8, 1000,["Jack", 8, 'Bob', 'Alice', 5], 1, function x() {return 1 / x}, function a() {}, 2, [2, 3, 4, [5, 4, 6]], 7, 11, 7, [2], {
    x: 1,
    y: "test"
}];
```
###**I want to...**
###**...flatten an array:**
**`array_.flatten(arr);`**  
Flattens an array to a single-dimensional one. Goes as deep into subarrays as needed.  
`console.log(array_.flatten(arr));`  
> [ 8, 1000,  'Jack',  8,  'Bob',  'Alice',  5,  1, [Function: x],  [Function: a],  2,  2,  3,  4,  5,  4,  6,  7,  11,  7,  2,  { x: 1, y: 'test' } ]

###**...get rid of the duplicates:**  
**`array_.dedup(arr, [force]);`**  
**force: Boolean** - Optional. Assign to `true` if you want to flatten an array and remove duplicates from the sub-arrays as well.  
Removes duplicates from an array. Items in nested arrays are not treated as duplicates to avoid mess.     
`console.log(array_.dedup(arr));`  
> [ 8,   1000,  [ 'Jack', 8, 'Bob', 'Alice', 5 ],   1,  [Function: x],  [Function: a],  2,  [ 2, 3, 4, [ 5, 4, 6 ] ],  7,  11,  [ 2 ],  { x: 1, y: 'test' } ]  

`console.log(array_.dedup(arr, true));`  
> [ 1000, 'Jack', 8, 'Bob', 'Alice', 1, [Function: x], [Function: a], 3, 5, 4, 6, 11, 7, 2, { x: 1, y: 'test' } ]


###**...get a random array item:**
**`array_.rand(arr,[min],[max]);`**  
**min, max: Number** — Optional argument, set the range of items to choose from.  
Randomly picks and returns one item from an array.  
`console.log(array_.rand(arr,3,8));`
> [Function: x]

###**...get a sum of all items:**
**`array_.sum(arr);`**  
Flattens an array and takes only numeric values into a consideration.  
`console.log(array_.sum(arr));`
> 1075

###**...calculate an average:**
**`array_.mean(arr, [type], [precision]);`**  
**type: String** — Optional, sets the type of mean: `'ari'`: arithmetic, `'geo'`: geometric, `'har'`: harmonic. If omitted then calculates an arithmetic mean.  
**precision: Number** — Optional argument, sets the number of digits after a decimal point. If omitted then falls back to 2.  
Flattens an array and takes only numeric values into a consideration.  
`console.log(array_.mean(arr, 'geo', 3));`  
> 67.188  

`console.log(array_.mean(arr, 'ari', 2));`  
> 5.87  

`console.log(array_.mean(a, 4));`  
> 67.1875  

###**...find a median:**
**`array_.median(arr, [precision]);`**  
**precision: Number** — Optional argument, sets the number of digits after a decimal point. If omitted then falls back to 2
Flattens an array and takes only numeric values into a consideration.  
`console.log(array_.median(arr, 1));`  
> 5.0  

###**...get a frequency matrix:**  
**`array_.freq(arr)`**  
Returns an object `item: frequency`, where `item` is the value of an each array item and `frequency` is the number of times that item appears in an array. Flattens an array before evaluation.  
`console.log(array_.freq(arr));`  
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

###**...get an array breakdown:**
**`array_.breakdown(arr, [toObject]);`**  
**toObject: Boolean** — Optional argument, if set to true then method will return an object with items sorted by their type.  
Service method. Result is an array console pretty print.  

`array_.breakdown(arr);`  
>Numbers: 16  
Strings: 3  
Functions: 2  
Objects: 1  
Undefined: 0  
Booleans: 0  
Total items: 22  

*Note that by default you do not need to console.log  `breakdown()` to have it printed out*

`console.log(array_.breakdown(arr, true));`  
> { number_: [ 8, 1000, 8, 5, 1, 2, 2, 3, 4, 5, 4, 6, 7, 11, 7, 2 ],
  string_: [ 'Jack', 'Bob', 'Alice' ],
  function_: [ [Function: x], [Function: a] ],
  object_: [ { x: 1, y: 'test' } ],
  undefined_: [],
  boolean_: [] }  


###**...destroy all the empty items in an array:**
**`array_.cop(arr, [toFlatten]);`**  
**toFlatten: Boolean** — Optional argument. Flattens before all the work.  
Goes on patrol and removes all the `undefined`s from an array preserving the structure.  
`console.log(array_.cop([1,2,,,,,3,4,[5,,,,,],6,,,,8,3,[[[],9]]]));`  
>  [ 1, 2, 3, 4, [ 5 ], 6, 8, 3, [ [ [ ], 9 ] ] ]  

`console.log(array_.cop([1,2,,,,,3,4,[5,,,,,],6,,,,8,3,[[[],9]]], true));`  
> [ 1, 2, 3, 4, 5, 6, 8, 3, 9 ]  

###**...filter an array by item type or remove some types:**
**`array_.keep(arr, [type], [filter]);`**  
**type: String** — sets the type of an object to work with. Values are:  
`'string', 'number', 'function', 'object', 'boolean', 'null', 'undefined'`  
Default value is `'string'`  
**filter: String** — sets the logic for the method.  
`'all'` — keep all array items of `type`, remove the rest  
`'but'` — keep all array items, but `type`  
Default value is `'all'`  
`console.log(array_.keep(arr, 'object', 'all'));`  
> [ { x: 1, y: 'test' } ]  

`console.log(array_.keep(arr));`  
> [ 'Jack', 'Bob', 'Alice' ]  

`console.log(array_.keep(arr, 'number', 'but'));`  
> [ 'Jack',
  'Bob',
  'Alice',
  [Function: x],
  [Function: a],
  { x: 1, y: 'test' } ]  

###**...remove non alphanumerics from the String items:**
**`array_.alpha(arr);`**  
**`array_.alphaNum(arr);`**  
`alpha()` keeps letters only, `alphaNum()` saves digits as well.  
Method ignores all non-String items to keep them safe. Multidimensional structure is preserved.  

`console.log(array_.alpha(["Clinton 2022", ["__jazzy cat.69", "'s t r\ni n g'"],[["catlady+01"], true]]));`  
> [ 'Clinton', [ 'jazzycat', 'string' ], [ [ 'catlady' ], true ] ]  

`console.log(array_.alphaNum(["Clinton 2022", ["__jazzy cat.69", "'s t r\ni n g'"],[["catlady+01"], true]]));`  
>[ 'Clinton2022',
  [ 'jazzycat69', 'string' ],
  [ [ 'catlady01' ], true ] ]

###**...convert an object into an array**
**`array_.arrify(object)`**  
Converts an object (associative array) into an `array` where object keys are array items.  
Argument provided should be an `object`. Will throw an error if not an object type.  
`console.log(array_.arrify({name: 'Jack', id: 12345}));`  
> ['Jack', 12345]  

`console.log(array_.arrify({name: 'Jack', id: 12345, record: [12, 23, 102]}));`  
> ['Jack', 12345, [12, 23, 102]]  

###**...get an array of indexes of a given element:**
**`array_.index(arr, element, [preserveStructure])`**  
Flattens an array and returns an `array` of index values.  
**element** - mandatory. An element to look for in an array. If element does not exist then `-1` is returned.  
**preserveStructure: Boolean** - Optional, if set to `true` will not `flatten` an array and skip nested arrays.  
```
var arr = ['Humpty','Dumpty', 'Sat', 'On', 'A', null, 'Humpty', 'Dumpty'];
var elem = "Humpty";
var indexList = array_.index(arr, elem);
console.log(indexList);
```  
> [ 0, 6 ]  

`console.log(array_.index([1, "String", , , 2, 'String', "", [eval('null;'), 2] ], 2 ));`  
> [ 2, 6 ] - flattening an array erases `undefined` elements!  

`console.log(array_.index([1, "String", , , 2, 'String', "", [eval('null;'), 2] ], 2, true ));`  
> [ 4 ]
