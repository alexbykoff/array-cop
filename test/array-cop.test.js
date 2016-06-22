var chai = require('chai');
var arrayCop = require('../src/array-cop');
var assert = chai.assert;
var expect = chai.expect;
require('mocha-sinon');

// CHECK
describe('#check - help method. Return Boolean for Array and throw error if not.', function() {

  var testCases = [
  {
      description: 'it should return True for empty Array',
      input: [],
      expected: true
  }, {
      description: 'it should return True for Array',
      input: ["StringValue", 2, 3, 7, , ],
      expected: true
  }];

  it('should throw error if argument isn\'t aray', function() {
      expect(function() {
          arrayCop.check(new Object)
      }).to.throw('Not an array!');
  });

  testCases.forEach(function(tst) {
      it(tst.description, function() {
          var actual = arrayCop.check(tst.input);
          assert.deepEqual(actual, tst.expected);
      });
  });

});

// FLATTEN
describe('#flatten() - Flattens an array', function() {

    it('should return a flattened array', function() {

        var testCases = [{
            input: [1, 3, [3, [5, ]], 7, 8, 'pete', {}],
            expected: [1, 3, 3, 5, 7, 8, 'pete', {}]
        }, {
            input: ["john", [new Object, 1, 2, ["array", undefined]], "string"],
            expected: ["john", {}, 1, 2, "array", undefined, "string"]
        }, {
            input: [],
            expected: []
        }];

        it('should throw error if argument isn\'t aray', function() {
            expect(function() {
                arrayCop.flatten(new Object)
            }).to.throw('Not an array!');
        });

        testCases.forEach(function(tst) {
            var actual = arrayCop.flatten(tst.input);
            assert.deepEqual(actual, tst.expected);
        });

    });

});

// DEDUP
describe('#dedup() - Removes duplicates', function() {

    it('should throw error if argument isn\'t aray', function() {
        expect(function() {
            arrayCop.flatten(new Object)
        }).to.throw('Not an array!');
    });

    it('should remove duplicates from an array', function() {

        var testCases = [{
            input: [1, 3, [3, [5, ], 7], 7, 8, 'pete', {}],
            expected: [1, 3, [3, [5, ], 7], 7, 8, 'pete', {}]
        }, {
            input: [34, 40, "john", [new Object, 1, 2, ["array", undefined]], "string", 40, "string"],
            expected: [34, "john", [new Object, 1, 2, ["array", undefined]], 40, "string"]
        }, {
            input: [],
            expected: []
        }];

        it('should throw error if argument isn\'t aray', function() {
            expect(function() {
                arrayCop.dedup(new Object)
            }).to.throw('Not an array!');
        });

    });

    it('should remove duplicates from an array including all the nested arrays', function() {

        var testCases = [{
            input: [1, 3, [3, [5, ], 7], 7, 8, 'pete', {}],
            flag: true,
            expected: [1, 3, 5, 7, 8, 'pete', {}]
        }, {
            input: [34, 40, "john", [new Object, 34, 2, ["array", undefined]], "string", 40, "string"],
            flag: true,
            expected: ["john", new Object, 34, 2, "array", undefined, 40, "string"]
        }];

        testCases.forEach(function(tst) {
            var actual = arrayCop.dedup(tst.input, tst.flag);
            assert.deepEqual(actual, tst.expected);
        });

    });

})

// RAND
describe('#rand() - Returns a random item from an Array', function() {

    it('should return a random element according to parameters provided', function() {
        var testCases = [{
            inputArray: [1, 2, 3],
            inputMin: 2,
            inputMax: 3,
            expected: 3
        }, {
            inputArray: [1, 2, 3],
            inputMin: 0,
            inputMax: 0,
            expected: 1
        }, {
            inputArray: ["element-1", "El2", 3],
            inputMin: 0,
            inputMax: 0,
            expected: "element-1"
        }];

        testCases.forEach(function(tst) {
            var actual = arrayCop.rand(tst.inputArray, tst.inputMin, tst.inputMax);
            assert.deepEqual(actual, tst.expected);
        });

    });

    it('should throw an error if argument is not an Array', function() {
        expect(function() {
            arrayCop.rand(1)
        }).to.throw('Not an array!');
    });

});

// SUM
describe('#sum() - Returns a sum of all the Number items', function() {

    it('should return a sum of all the elements with type: Number', function() {
        var testCases = [{
            input: [2, 3, [5, 7, undefined], 'String'],
            expected: 17
        }, {
            input: [],
            expected: 0
        }, {
            input: [new String, new Object, undefined, null],
            expected: 0
        }];

        testCases.forEach(function(tst) {
            var actual = arrayCop.sum(tst.input);
            assert.deepEqual(actual, tst.expected);
        });
    });
});

// COP
describe('#cop() - Removes all the empty items', function() {

    it('should throw an error if argument is not an Array', function() {
        expect(function() {
            arrayCop.cop(0)
        }).to.throw('Not an array!');
    });

    it('should get of all the empty items while preserving the structure of an array', function() {
        var testCases = [{
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
        }, {
            input: [1, 2, , , , , 3, 4, [5, , , , , ], 6, , , , 8, 3, [
                [
                    [], 9
                ]
            ]],
            inputFlag: true,
            expected: [1, 2, 3, 4, 5, 6, 8, 3, 9]
        }];

        testCases.forEach(function(tst) {
            var actual = arrayCop.cop(tst.input, tst.inputFlag);
            assert.deepEqual(actual, tst.expected);
        });

    });

});

// MEAN
describe('#mean() - Calculates and returns Mean values', function() {

    var testCases = [{
        description: "should return 0 for an empty array",
        input: [],
        expected: 0
    }, {
        description: "should return an ariphmetic mean of an array by default",
        input: [1, 2, 3],
        expected: '2.00'
    }, {
        description: "should return an ariphmetic mean of an array",
        input: [1, 2, 3, new String, [1, 2, 3]],
        inputType: "ari",
        expected: '2.00'
    }, {
        description: "should return an ariphmetic mean of an array with custom precision",
        input: [1, 2, 3, new String, [1, 2, 3]],
        inputType: "ari",
        inputPrecision: 3,
        expected: '2.000'
    }, {
        description: 'should return a geometric mean of an array',
        input: [1, 2, 3, new String, new Object, [1, 2, 3]],
        inputType: "geo",
        expected: "1.82"
    }, {
        description: 'should return a geomteric mean of an array with .00000 precision',
        input: [1, 2, 3, new String, new Object, [1, 2, 3]],
        inputType: "geo",
        inputPrecision: 5,
        expected: '1.81712'
    }, {
        description: 'should return a harmonic mean of an array with .000 precision',
        input: [1, 2, 3],
        inputType: "har",
        inputPrecision: 3,
        expected: '1.636'
    }];

    it('should throw an error if argument is not an Array', function() {
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
describe('#arrify() - Converts an Object into an array that consists of values of the given object', function() {

    var testCases = [{
        description: 'should convert to an array and return it',
        input: {
            user: 'Jack',
            id: 17633
        },
        expected: ['Jack', 17633]
    }, {
        description: 'should treat Array as an object',
        input: new Array,
        expected: []
    }, {
        description: 'should return empty array for the new Object',
        input: new Object,
        expected: []
    }];

    it('should throw an error when argument provided is not an Object', function() {
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
describe('#median() - Returns a median of the numeric items in array', function() {
    var testCases = [{
        description: 'should return 0 for empty array',
        input: [],
        expected: 0
    }, {
        description: 'should return one element for array with 1 element',
        input: [235],
        expected: 235
    }, {
        description: 'should return a median with a default precision',
        input: [
            [100, -50, 3], new String, 3
        ],
        expected: '3.00'
    }, {
        description: 'should return a median with precision = 0',
        input: [
            [100, -50, 3], new String, 3
        ],
        inputPrecision: 0,
        expected: 3
    }, {
        description: 'should return a median with a negative precision',
        input: [
            [100, -50, 3], new String, 3
        ],
        inputPrecision: -3,
        expected: '3.000'
    }];

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

    var testCases = [{
            description: 'should return an empty object for the empty src array',
            input: [],
            expected: {}
        },

        {
            description: 'should return a frequency matrix object with 2 empty string elements',
            input: [new String, [new String]],
            expected: {
                "": 2
            }
        },

        {
            description: 'should return frequency matrix object with 2 object element',
            input: [{
                obj1Key: "value"
            }, {
                obj2Key: "value"
            }],
            expected: {
                '[object Object]': 2
            }
        },

        {
            description: 'should return frequency matrix object for the array',
            input: [0, [1, 2, 'Sample string'],
                [2, 'Sample string'], 1
            ],
            expected: {
                '1': 2,
                '2': 2,
                'Sample string': 2,
                '0': 1
            }
        }
    ];

    it('should throw error if argument isn\'t an Array', function() {
        expect(function() {
            arrayCop.freq(new Object)
        }).to.throw('Not an array!');
    });

    testCases.forEach(function(tst) {
        it(tst.description, function() {
            var actual = arrayCop.freq(tst.input);
            assert.deepEqual(actual, tst.expected);
        });
    });

});

// BREAKDOWN
describe('#breakdown() - array console pretty print, or object with items sorted by type', function() {

    var testCasesReturn = [{
        description: 'should return object with items sorted by type',
        input: [null, undefined, "String", new Object, false],
        inputFlag: true,
        expected: {
            number_: [],
            string_: ["String"],
            function_: [],
            object_: [null, {}],
            undefined_: [undefined],
            boolean_: [false]
        }
    }, {
        description: 'should return object with items sorted by type',
        input: [null, undefined, "String", new Object, false, 23, 23.35, '45.61', 45.61],
        inputFlag: true,
        expected: {
            number_: [23, 23.35, 45.61],
            string_: ["String", "45.61"],
            function_: [],
            object_: [null, {}],
            undefined_: [undefined],
            boolean_: [false]
        }
    }];

    it('should throw an error if argument isn\'t an Array', function() {
        expect(function() {
            arrayCop.breakdown(new Object, true)
        }).to.throw('Not an array!');
    });

    // Testing return values
    testCasesReturn.forEach(function(tst) {
        var actual = arrayCop.breakdown(tst.input, tst.inputFlag);
        it(tst.description, function() {
            assert.deepEqual(actual, tst.expected);
        });
    });

    // TODO
    // Refactoring
    // Testing console output with helper function & mocha-sinon
    beforeEach(function() {
        this.sinon.stub(console, 'log');
    });

    it('should console.log() output', function() {
        arrayCop.breakdown([null, undefined, "String", new Object, false, 23, 23.35, '45.61', 45.61], false);
        expect(console.log.calledOnce).to.be.true;
        expect(console.log.calledWith(
            "Numbers: 3\n" +
            "Strings: 2\n" +
            "Functions: 0\n" +
            "Objects: 2\n" +
            "Undefined: 1\n" +
            "Booleans: 1\n" +
            "Total items: 9\n")).to.be.true;
    });

});

// COP
describe('#cop() - removes all the empty items aka `undefined` and `null` from an array preserving the structure', function() {
    var testCases = [{
        description: 'should flatten & remove all the "empty" elements',
        input: [1, , , , , 2, "String", "", [2, 3]],
        inputFlag: true,
        expected: [1, 2, "String", "", 2, 3]
    }, {
        description: 'should remove all the "empty" elements while preserving structure',
        input: [1, , , , , 2, "String", "", [2, 3]],
        inputFlag: false,
        expected: [1, 2, "String", "", [2, 3]]
    }];

    it('should throw an error if argument isn\'t an Array', function() {
        expect(function() {
            arrayCop.cop(new String);
        }).to.throw('Not an array!');
    });

    testCases.forEach(function(tst) {
        var actual = arrayCop.cop(tst.input, tst.inputFlag);
        it(tst.description, function() {
            assert.deepEqual(actual, tst.expected);
        });
    });

});

// INDEX
describe('#index() - Returns an `array` of index values. ', function() {
    var testCases = [{
        description: 'should return indexes: [4, 8] with preserved structure',
        inputArray: [1, "String", , , 2, "String", "", ["Str", 2], 2],
        inputElement: 2,
        preserveFlag: true,
        expected: [4, 8]
    }, {
        description: 'should return indexes: [1, 3, 6] for flattened array',
        inputArray: [1, "String", , , 2, "String", "", [345, "String", 2], 2],
        inputElement: "String",
        expected: [1, 3, 6]
    }, {
        description: 'should return indexes: [2, 6] for the flattened array',
        inputArray: [1, , "String", , , 2, "String", "", ["Str", 2]],
        inputElement: 2,
        expected: [2, 6]
    }, {
        description: 'should return -1 if index passed is not a Number',
        inputArray: [1, , "String", , , 2, "String", "", ["Str", 2]],
        inputElement: true,
        expected: -1
    }, {
        description: 'should return -1 string if index is out of range',
        inputArray: [1, , "String", , , 2, "String", "", ["Str", 2]],
        inputElement: 25,
        expected: -1
    }];

    it('should throw an error if argument `index` is not provided', function() {
        expect(function() {
            arrayCop.index([1, , "String", , , 2, "String", '', ["Str", 2]]);
        }).to.throw('Element not passed as argument');
    });

    it('should throw an error if argument isn\'t an Array', function() {
        expect(function() {
            arrayCop.index(new String, 2);
        }).to.throw('Not an array!');
    });

    testCases.forEach(function(tst) {
        var actual = arrayCop.index(tst.inputArray, tst.inputElement, tst.preserveFlag);
        it(tst.description, function() {
            assert.deepEqual(actual, tst.expected);
        });
    });

});

// KEEP
describe('#keep() - filter an array by item type or remove some types', function() {

  var testCases = [
  {
      description: 'it should return Array with Strings',
      inputArray: [1, 2, 3, "Str1", "Str2"],
      // inputType: "string",
      inputLogic: "all",
      expected: ["Str1", "Str2"]
  }, {
      description: 'it should remove Number elements from Array',
      inputArray: [1, 2, 3, "Str1", "Str2"],
      inputType: "number",
      inputLogic: "but",
      expected: ["Str1", "Str2"]
  }];

  it('should throw error if argument isn\'t aray', function() {
      expect(function() {
          arrayCop.keep(new Object)
      }).to.throw('Not an array!');
  });

  testCases.forEach(function(tst) {
      it(tst.description, function() {
          var actual = arrayCop.keep(tst.inputArray, tst.inputType, tst.inputLogic);
          assert.deepEqual(actual, tst.expected);
      });
  });

});

// ALPHA
describe('#alpha() - remove non alphanumerics from the String items.', function() {

  var testCases = [
  {
      description: 'it should remove all non alphanumeric symbols from String items',
      input: [1, 2, 3, "Str1StrN3-w", "JackD4ani1el's"],
      expected: [1, 2, 3,"StrStrNw", "JackDaniels"]
  }, {
      description: 'it should remove all non alphanumeric symbols from String items',
      input: [1, 2, 3, "123", "#010", [5, 6, "S0meL0ngStr1ng"]],
      expected: [1, 2, 3, "", "", [5, 6,"SmeLngStrng"]]
  }];

  it('should throw error if argument isn\'t aray', function() {
      expect(function() {
          arrayCop.alpha(new Object)
      }).to.throw('Not an array!');
  });

  testCases.forEach(function(tst) {
      it(tst.description, function() {
          var actual = arrayCop.alpha(tst.input);
          assert.deepEqual(actual, tst.expected);
      });
  });

});

// ALPHANUM
describe('#alphaNum() - Remove non alphanumerics from the String items but saving digits as well.', function() {

  var testCases = [
  {
      description: 'it should remove all non alphanumeric symbols from String items with saving digits',
      input: [1, 2, 3, "Str1StrN3-w", "JackD4ani1el's"],
      expected: [1, 2, 3,"Str1StrN3w", "JackD4ani1els"]
  },{
      description: 'it should remove all non alphanumeric symbols from String items with saving digits',
      input: [1, 2, 3, "123", "#010", [5, 6, "S0meL0ngStr1ng!#0&^"]],
      expected: [1, 2, 3, "123", "010", [5, 6,"S0meL0ngStr1ng0"]]
  }];

  it('should throw error if argument isn\'t aray', function() {
      expect(function() {
          arrayCop.alphaNum(new Object)
      }).to.throw('Not an array!');
  });

  testCases.forEach(function(tst) {
      it(tst.description, function() {
          var actual = arrayCop.alphaNum(tst.input);
          assert.deepEqual(actual, tst.expected);
      });
  });

});

// ALPHANUM
describe('#regExpFilter() - Remove non alphanumerics from the String items but saving digits as well.', function() {

  var testCases = [
    {
      description: 'it should remove all non alphanumeric symbols from String items with saving digits',
      inputArray: [1, 2, 3, "Str1StrN3-w", "JackD4ani1el's"],
      inputRegExp: /[^a-z0-9]/gi,
      expected: [1, 2, 3,"Str1StrN3w", "JackD4ani1els"]
    }, {
      description: 'it should remove all non alphanumeric symbols from String items with saving digits',
      inputArray: [1, 2, 3, "123", "#010", [5, 6, "S0meL0ngStr1ng!#0&^"]],
      inputRegExp: /[^a-z0-9]/gi,
      expected: [1, 2, 3, "123", "010", [5, 6,"S0meL0ngStr1ng0"]]
    }, {
      description: 'inputRegExp - not expression',
      inputArray: [1, 2, 3, "123", "#010", [5, 6, "S0meL0ngStr1ng!#0&^"]],
      inputRegExp: "regexp",
      expected: [1, 2, 3, "123", "#010", [5, 6, "S0meL0ngStr1ng!#0&^"]]
    },
  ];

  it('should throw error if argument isn\'t aray', function() {
      expect(function() {
          arrayCop.regExpFilter(new Object)
      }).to.throw('Not an array!');
  });

  testCases.forEach(function(tst) {
      it(tst.description, function() {
        console.log("Expression: ", tst.inputRegExp);
          var actual = arrayCop.regExpFilter(tst.inputArray, tst.inputRegExp);
          assert.deepEqual(actual, tst.expected);
      });
  });

});
