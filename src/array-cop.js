(function(_) {
    var array_ = {
        isValid: function(arr) {
            /**
             *    Checks if an argument provided is a proper array.
             *    If not then it returns an argument back and logs the type
             *    of an argument.
             */

            return (Array.isArray(arr)) ? true : console.log(typeof(arr) + " is not an Array");
        },

        flatten: function(arr) {
            /**
             *    Flattens all the layers of an array, no matter how deeply nested they are.
             */

            var __ = this;
            return this.isValid(arr) ? arr.reduce(function(f, i) {
                return f.concat(Array.isArray(i) ? __.flatten(i) : i);
            }, []) : arr;
        },

        dedup: function(arr, force) {
            /**
             *    Removes duplicates from an array. Note: items in nested arrays are not
             *    considered to be duplicates. If you want to remove duplicates from
             *    the sub-arrays as well then pass true as a second argument.
             */

            if (this.isValid(arr)) {
                if (force) arr = this.flatten(arr)
                return arr.filter(function(item, i) {
                    return arr.lastIndexOf(item) === i;
                });
            }
            return arr;
        },

        rand: function(arr, min, max) {
            /**
             *    Picks a random item from an array in a range of min, max.
             *    If no range is provided then array.length is taken
             *    into a consideraton.
             */

            return this.isValid(arr) ? arr[Math.floor(Math.random() * ((max || arr.length) - (min || 0))) + (min || 0)] : arr;
        },

        sum: function(arr) {
            /**
             *    Returns the sum of all Number items in an array. If an array contains
             *    NaN items they will be skipped. sum() grabs all Number items from
             *    nested items as well.
             */

            if (this.isValid(arr)) {
                return this.flatten(arr).reduce(function(a, b) {
                    return typeof(b) === 'number' ? a += b : a;
                }, 0);
            }
            return arr;
        },
        mean: function(arr, type, precision) {
            /**
             *    Returns a mathematic mean of Number items in an array. Method evaluates
             *    all Number items, including nested ones.
             *    Syntax: array_.avg(arr,type, precision) where
             *    [type] - choose between 'ari'themetic, 'geo'metric or 'har'monic means
             *    Optional, falls back to 'ari'
             *    [precision] - number of digits after a deciaml point. Optional,
             *    falls back to 2 if no argument is provided.
             */

            if (this.isValid(arr)) {
                arr = this.flatten(arr);
                precision = precision || 2;

                /*** Arguments fallback */
                typeof(type) === 'string' ? type = type || 'ari': precision = type || 2;

                var sum = 0,
                    num = 0,
                    mul = 1;
                switch (type) {
                    case 'ari':
                    default:
                        for (var i in arr) {
                            if (typeof(arr[i]) === 'number') {
                                sum += arr[i];
                                num++;
                            }
                        }
                        return (sum / num).toFixed(precision);

                    case 'geo':
                        for (var i in arr) {
                            if (typeof(arr[i]) === 'number') {
                                mul *= arr[i];
                                num++;
                            }
                        }
                        return Math.pow(mul, 1 / num).toFixed(precision);
                }
            }
            return arr;
        },
        median: function(arr, precision) {
            /*
             *    Returns a median of an array. Flattens an array, gets rid of
             *    NaNs. Returns 0 if no Numbers items, value of an array if there
             *    is only one Number item or returns an object back if it is not
             *    an array.
             *    [precision] is optional. Falls back to 2 if no parameter provided.
             */

            if (this.isValid(arr)) {
                precision = precision || 2;
                arr = this.flatten(arr);
                var newArr = [];
                for (var i in arr) {
                    if (typeof(arr[i]) === 'number') {
                        newArr.push(arr[i]);
                    }
                }
                if (!newArr) {
                    return 0;
                } else if (newArr.length === 1) {
                    return newArr[0];
                }
                newArr.sort(function(a, b) {
                    return a - b;
                });
                var h = Math.floor(newArr.length / 2);
                if (newArr.length % 2) {
                    return newArr[h]
                } else return ((newArr[h - 1] + newArr[h]) / 2).toFixed(precision);
            }
            return arr;
        },
        freq: function(arr) {
            /**
             *    Returns an object `item: frequency`, where `item` is the value
             *    of an each array item and `frequency` is the number of times
             *    that item appears in an array. Flattens an array before evaluation.
             */

            if (this.isValid(arr)) {
                arr = this.flatten(arr);
                var frequencyMap = arr.reduce(function(obj, item) {
                    if (obj[item]) {
                        obj[item]++;
                    } else {
                        obj[item] = 1;
                    }
                    return obj
                }, {});
                return frequencyMap;
            }
            return arr;
        },
        breakdown: function(arr, obj) {
            /*
             *    Service method. Result is an array console pretty print.
             *    if `obj` argument is set to `true` then method returns an object
             *    with items sorted by their type.
             */

            if (this.isValid(arr)) {
                arr = this.flatten(arr);
                var total = {
                    number_: [],
                    string_: [],
                    function_: [],
                    object_: [],
                    undefined_: [],
                    boolean_: []
                };
                arr.forEach(function(value, index, arr) {
                    switch (typeof(arr[index])) {
                        case 'number':
                            total.number_.push(arr[index]);
                            break;
                        case 'string':
                            total.string_.push(arr[index]);
                            break;
                        case 'function':
                            total.function_.push(arr[index]);
                            break;
                        case 'object':
                            total.object_.push(arr[index]);
                            break;
                        case 'undefined':
                            total.undefined_.push(arr[index]);
                            break;
                        case 'boolean':
                            total.boolean_.push(arr[index]);
                            break;
                    }
                });

            };
            return obj ?
                total :
                console.log(
                    "Numbers: " + total.number_.length + "\n" +
                    "Strings: " + total.string_.length + "\n" +
                    "Functions: " + total.function_.length + "\n" +
                    "Objects: " + total.object_.length + "\n" +
                    "Undefined: " + total.undefined_.length + "\n" +
                    "Booleans: " + total.boolean_.length + "\n" +
                    "Total items: " + arr.length+"\n");
        }
    }

    /**
     *    npm / <script> compatibility
     */

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = array_;
    } else {
        _.array_ = array_;
    }
}(this));
