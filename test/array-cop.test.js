var chai = require('chai');
var arrayCop = require('../src/array-cop');
var assert = chai.assert;
var expect = chai.expect;

var arr = [1, 3, [3, [5, ]], 7, 8, 'pete', {}];
var srcArray = [1, 3, 3, 'Some string', 'Some string', 5, 7, 8, 'pete', {}];

// FLATTEN
describe('flatten() - Flattens an array', function() {

    it('should return a flattened array', function() {

        assert.deepEqual(arrayCop.flatten(arr), [1, 3, 3, 5, 7, 8, 'pete', {}]);
        assert.deepEqual(arrayCop.flatten(["alice"]), ["alice"]);
        assert.deepEqual(arrayCop.flatten(), undefined);
    });

    it('should return an object back', function() {

        assert.deepEqual(arrayCop.flatten("not an array"), "not an array");
    });

});

// DEDUP
describe('dedup() - Removes duplicates', function() {

    it('should removes duplicates from an array', function() {
        assert.deepEqual(arrayCop.dedup(srcArray), [1, 3, 'Some string', 5, 7, 8, 'pete', {}]);
    });

})

// RAND
describe('rand() - Returns a random item', function() {

    it('should return 2nd element', function() {
        assert.deepEqual(arrayCop.rand(srcArray, 1, 2), 3);
    });
});

// SUM
describe('sum() - Returns a sum of all the Number items', function() {

    it('should return sum of all element with type number', function() {
        assert.deepEqual(arrayCop.sum(srcArray), 27);
        assert.deepEqual(arrayCop.sum([2, 3, [5, 7, undefined], 'String']), 17);
    });

    it('should return 0 for empty array', function() {
        assert.deepEqual(arrayCop.sum([]), 0);
    });

    it('should return 0 for array without numbers', function() {
        assert.deepEqual(arrayCop.sum(['String', {
            objKey: 'objVal'
        }, undefined]), 0);
    });
});

// COP
describe('cop() - Removes all the empty items', function() {

    it('should throw an error if argument is not an array', function() {
        expect(function() {
            arrayCop.cop(0)
        }).to.throw('Not an array!');
    });

    it('should get of all the empty items while preserving the structure', function() {
        assert.deepEqual(arrayCop.cop([1, 2, , , , , 3, 4, [5, , , , , ], 6, , , , 8, 3, [
            [
                [], 9
            ]
        ]]), [1, 2, 3, 4, [5], 6, 8, 3, [
            [
                [], 9
            ]
        ]]);
    });

    it('should get of all the empty items while preserving the structure', function() {
        assert.deepEqual(arrayCop.cop([1, 2, , , , , 3, 4, [5, , , , , ], 6, , , , 8, 3, [
            [
                [], 9
            ]
        ]], true), [1, 2, 3, 4, 5, 6, 8, 3, 9]);
    });
});

// MEAN
describe('mean() - Calculates and returns Mean values', function() {

    it('should throw an error if argument is not an array', function() {
        expect(function() {
            arrayCop.mean(new String)
        }).to.throw('Not an array!');
    });

    it('should return 0 for an empty array', function() {
        assert.deepEqual(arrayCop.mean([]), 0);
    });

    it('should return ariphmetic mean of an array by default', function() {
        assert.deepEqual(arrayCop.mean([1, 2, 3]), '2.00');
    });

    it('should return ariphmetic mean of an array', function() {
        assert.deepEqual(arrayCop.mean([1, 2, 3, new String, [1, 2, 3]], 'ari'), '2.00');
    });

    it('should return ariphmetic mean of an array with .000 precision', function() {
        assert.deepEqual(arrayCop.mean([1, 2, 3], 3), '2.000');
    });

    it('should return geometric mean of aflattened array', function() {
        assert.deepEqual(arrayCop.mean([1, 2, 3, new String, new Object, [1, 2, 3]], 'geo'), '1.82');
    });

    it('should return geometric mean of a flattened array with .00000 precision', function() {
        assert.deepEqual(arrayCop.mean([1, 2, 3, new String, new Object, [1, 2, 3]], 'geo', 5), '1.81712');
    });

    it('should return harmonic mean of an array with .000 precision', function() {
        assert.deepEqual(arrayCop.mean([1, 2, 3], 'har', 3), '1.636');
    });

});

// ARRIFY
describe('arrify() - Converts object to an array that consists of values of the given object', function() {

    it('should convert to an array and return it', function() {
        assert.deepEqual(arrayCop.arrify({
            user: 'Jack',
            id: 17633
        }), ['Jack', 17633]);
    });

    it('should throw an error when argument provided is not an object', function(){
        expect(function() {
            arrayCop.arrify(new Function)
        }).to.throw('Not an object!');
    });

    it('should treat Array as an object', function(){
        assert.isArray(arrayCop.arrify(new Array));
    });
});

// MEDIAN
describe('median() - Returns median element of the numeric items in array', function() {

    it('should throw error if argument isn\'t aray', function() {
        expect(function() {
            arrayCop.median(new Object)
        }).to.throw('Not an array!');
    });

    it('should return median with default precision', function() {
        assert.deepEqual(arrayCop.median([[100, -50, 3], new String, 3]), '3.00');
    });

    it('should return median with precision = 0', function() {
        assert.deepEqual(arrayCop.median([[100, -50, 3], new String, 3], 0), 3);
    });

});

//FREQ
describe('freq() - Returns an object array_item: item_frequency', function() {

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

