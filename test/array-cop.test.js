var chai = require('chai');
var arrayCop = require('../src/array-cop');
var assert = chai.assert;
var expect = chai.expect;

var arr = [1, 3, [3, [5, ]], 7, 8, 'pete', {}];
var srcArray = [1, 3, 3, 'Some string', 'Some string', 5, 7, 8, 'pete', {}];

// FLATTEN
describe('#flatten() - Flattens an array', function() {

  it('should return a flattened array', function() {

    var testCases = [
      {
        input: [1, 3, [3, [5, ]], 7, 8, 'pete', {}],
        expected: [1, 3, 3, 5, 7, 8, 'pete', {}]
      },
      {
        input: ["john", [new Object, 1, 2,["array", undefined] ], "string"],
        expected: ["john", {}, 1, 2, "array", undefined, "string"]
      },
      {
        input: [],
        expected: []
      },
      {
        expected: undefined
      },
      {
        input: "not an Array, just string",
        // TODO
        // ? throw error if !Array.isArray(arr)
        expected: "not an Array, just string"
      }
    ];

    testCases.forEach(function(tst) {
      var actual = arrayCop.flatten(tst.input);
      assert.deepEqual(actual, tst.expected);
    });

  });

});

// DEDUP
describe('#dedup() - Removes duplicates', function() {

  it('should removes duplicates from an array', function() {

    var testCases = [
      {
        input: [1, 3, [3, [5, ], 7], 7, 8, 'pete', {}],
        expected: [1, 3, [3, [5, ], 7], 7, 8, 'pete', {}]
      },
      {
        input: [34, 40, "john", [new Object, 1, 2,["array", undefined] ], "string", 40, "string"],
        expected: [34, "john", [new Object, 1, 2,["array", undefined] ], 40, "string"]
      },
      {
        input: [],
        expected: []
      },
      {
        expected: undefined
      },
      {
        input: "not an Array, just string",
        // TODO
        // ? throw error if !Array.isArray(arr)
        expected: "not an Array, just string"
      }
    ];

    testCases.forEach(function(tst) {
      var actual = arrayCop.dedup(tst.input);
      assert.deepEqual(actual, tst.expected);
    });

  });

  it('should removes duplicates from an array including nested arrays', function() {

    var testCases = [
      {
        input: [1, 3, [3, [5, ], 7], 7, 8, 'pete', {}],
        flag: true,
        expected: [1, 3, 5, 7, 8, 'pete', {}]
      },
      {
        input: [34, 40, "john", [new Object, 34, 2,["array", undefined] ], "string", 40, "string"],
        flag: true,
        expected: ["john", new Object, 34, 2, "array", undefined, 40, "string"]
      }
    ];

    testCases.forEach(function(tst) {
      var actual = arrayCop.dedup(tst.input, tst.flag);
      assert.deepEqual(actual, tst.expected);
    });

  });

})

// RAND
describe('#rand() - Returns a random item', function() {

  it('should return random element according to parameters', function() {
    var testCases = [
      {
        inputArray: [1, 2, 3],
        inputMin: 2,
        inputMax: 3,
        expected: 3
      },
      {
        inputArray: 1,
        // TODO
        // ? throw error if !Array.isArray(arr)
        expected: 1
      }
    ]

    testCases.forEach(function(tst) {
      var actual = arrayCop.rand(tst.inputArray, tst.inputMin, tst.inputMax);
      assert.deepEqual(actual, tst.expected);
    });

  });

});

// SUM
describe('#sum() - Returns a sum of all the Number items', function() {

    it('should return sum of all element with type number', function() {
      var testCases = [
        {
          input: [2, 3, [5, 7, undefined], 'String'],
          expected: 17
        },
        {
          input: [],
          expected: 0
        },
        {
          input: [new String, new Object, undefined, null],
          expected: 0
        }
      ];

      testCases.forEach(function(tst) {
        var actual = arrayCop.sum(tst.input);
        assert.deepEqual(actual, tst.expected);
      });

    });

});

// COP
describe('#cop() - Removes all the empty items', function() {

    it('should throw an error if argument is not an array', function() {
        expect(function() {
            arrayCop.cop(0)
        }).to.throw('Not an array!');
    });

    it('should get of all the empty items while preserving the structure', function() {
      var testCases = [
        {
          input: [1, 2, , , , , 3, 4, [5, , , , , ], 6, , , , 8, 3, [
              [
                  [], 9
              ]
          ]],
          expected: [1, 2, 3, 4, [5], 6, 8, 3, [
              [
                  [], 9
              ]
          ]]
        },
        {
          input:  [1, 2, , , , , 3, 4, [5, , , , , ], 6, , , , 8, 3, [
              [
                  [], 9
              ]
          ]],
          inputFlag: true,
          expected: [1, 2, 3, 4, 5, 6, 8, 3, 9]
        }
      ];

      testCases.forEach(function(tst) {
        var actual = arrayCop.cop(tst.input, tst.inputFlag);
        assert.deepEqual(actual, tst.expected);
      });

    });

});

// MEAN
describe('#mean() - Calculates and returns Mean values', function() {

  var testCases = [
    {
      description: "should return 0 for an empty array",
      input: [],
      expected: 0
    },
    {
      description:"should return ariphmetic mean of an array by default",
      input: [1, 2, 3],
      expected: '2.00'
    },
    {
      description: "should return ariphmetic mean of an array",
      input: [1, 2, 3, new String, [1, 2, 3]],
      inputType: "ari",
      expected: '2.00'
    },
    {
      description: "should return ariphmetic mean of an array with custom precision",
      input: [1, 2, 3, new String, [1, 2, 3]],
      inputType: "ari",
      inputPrecision: 3,
      expected: '2.000'
    },
    {
      description: 'should return geometric mean of aflattened array',
      input: [1, 2, 3, new String, new Object, [1, 2, 3]],
      inputType: "geo",
      expected: "1.82"
    },
    {
      description: 'should return geomteric mean of an array with .00000 precision',
      input: [1, 2, 3, new String, new Object, [1, 2, 3]],
      inputType: "geo",
      inputPrecision: 5,
      expected: '1.81712'
    },
    {
      description: 'should return harmonic mean of an array with .000 precision',
      input: [1, 2, 3],
      inputType: "har",
      inputPrecision: 3,
      expected: '1.636'
    }
  ];

  it('should throw an error if argument is not an array', function() {
      expect(function() {
          arrayCop.mean(new String)
      }).to.throw('Not an array!');
  });

  testCases.forEach(function(tst) {
    it(tst.description, function() {
      var actual = arrayCop.mean(tst.input, tst.inputType, tst.inputPrecision);
      assert.deepEqual(actual, tst.expected);
    });
  });

});

// ARRIFY
describe('#arrify() - Converts object to an array that consists of values of the given object', function() {

  var testCases = [
    {
      description: 'should convert to an array and return it',
      input: {
        user: 'Jack',
        id: 17633
      },
      expected: ['Jack', 17633]
    },
    {
      description: 'should treat Array as an object',
      input: new Array,
      expected: []
    },
    {
      description: 'should return empty array for the new Object',
      input: new Object,
      expected: []
    }
  ];

  it('should throw an error when argument provided is not an object', function(){
      expect(function() {
          arrayCop.arrify(new Function)
      }).to.throw('Not an object!');
  });

  testCases.forEach(function(tst) {
    it(tst.description, function() {
      var actual = arrayCop.arrify(tst.input);
      assert.deepEqual(actual, tst.expected);
    });
  });

});

// MEDIAN
describe('#median() - Returns median element of the numeric items in array', function() {
  var testCases = [
    {
      description: 'should return 0 for empty array',
      input: [],
      expected: 0
    },
    {
      description: 'should return one element for array with 1 element',
      input: [235],
      expected: 235
    },
    {
      description: 'should return median with default precision',
      input: [[100, -50, 3], new String, 3],
      expected: '3.00'
    },
    {
      description: 'should return median with precision = 0',
      input: [[100, -50, 3], new String, 3],
      inputPrecision: 0,
      expected: 3
    },
    {
      description: 'should return median with negative precision',
      input: [[100, -50, 3], new String, 3],
      inputPrecision: -3,
      expected: '3.000'
    }
  ];

  it('should throw error if argument isn\'t aray', function() {
      expect(function() {
          arrayCop.median(new Object)
      }).to.throw('Not an array!');
  });

  testCases.forEach(function(tst) {
    it(tst.description, function() {
      var actual = arrayCop.median(tst.input, tst.inputPrecision);
      assert.deepEqual(actual, tst.expected);
    })
  })

});

// FREQ
describe('#freq() - Returns an object array_item: item_frequency', function() {

    it('should throw error if argument isn\'t aray', function() {
        expect(function() {
            arrayCop.freq(new Object)
        }).to.throw('Not an array!');
    });

    it('should return empty object for the empty src array', function() {
        assert.deepEqual(arrayCop.freq([]), {});
    });

    it('should return frequency matrix object with 2 empty string elements', function() {
        assert.deepEqual(arrayCop.freq([ new String,[new String] ]), {
            "":2
        });
    });

    // testing objects
    var object1 = { key: 'value'},
        object2 = object1;
    // ToDo: Compare objects?
    it('should return frequency matrix object with 2 object element', function() {
        assert.deepEqual(arrayCop.freq([object1, object2]), {
            '[object Object]': 2
        });
    });

    it('should return frequency matrix object for the array', function() {
        assert.deepEqual(arrayCop.freq([0,[1,2,'Sample string'],[2, 'Sample string'], 1]),
        {
            '1': 2,
            '2': 2,
            'Sample string': 2,
            '0': 1
        } );
    });

});
