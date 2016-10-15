/**
 * @module array-cop
 */

/**
 * @function
 * @name Anonymous self-invoked function
 * @description Call main module
 * @param {Object} this Window for the browser
 */

(function(_) {

    var array_ = {
        /**
         * @function
         * @name check
         * @description Method for checking type of the source data.
         * @param {Array} arr  - Source data.
         * @returns {Boolean} Returns true if Array.isArray, otherwise throw error.
         * @throws Will throw an error "Not an array" if the argument isn't array.
         */
        check: function(arr) {
            return Array.isArray(arr) || (function() {
                throw new Error("Not an array!");
            }());
        },

        /**
         * @function
         * @name flatten
         * @description Flattens an array to a single-dimensional one
         * @param {Array} arr - Source data
         * @returns {Array} Returns flattened array
         * @throws Will throw an error "Not an array" if the argument isn't array.
         */
        flatten: function(arr) {
            var __ = this;
            return this.check(arr) ?
                arr.reduce(function(f, i) {
                    return f.concat(Array.isArray(i) ?
                        __.flatten(i) :
                        i);
                }, []) :
                null;
        },

        /**
         * @function
         * @name dedup
         * @description Removes duplicates from an array. Items in nested arrays are not treated as duplicates
         * @param {Array} arr - Source data
         * @param {Boolean} [force = false]  - If set to True - flatten array
         * @returns {Array} Returns flattened array
         * @throws Will throw an error "Not an array" if the argument isn't array.
         */
        dedup: function(arr, force) {
            this.check(arr);
            arr = force ? this.flatten(arr) : arr;
            return arr.filter(function(item, i) {
                return arr.lastIndexOf(item) === i;
            });
        },

        /**
         * @function
         * @name rand
         * @description Randomly picks and returns one item from an array or from a given range
         * @param {Array} arr - Source data
         * @param {Number} min - minimum index for random range
         * @param {Number} max - maximum index for random range
         * @returns {Number|String|Object} Random element from the Source data
         * @throws Will throw an error "Not an array" if the argument isn't array.
         */
        rand: function(arr, min, max) {
            this.check(arr);
            min < 0 ? min = 0 : min = min;
            max < 0 || max < min ? max = min : max = max;
            return arr[Math.floor(Math.random() * (max - min)) + min];
        },

        /**
         * @function
         * @name sum
         * @description Returns a sum of all the items, flattens an array and takes only numeric values
         * @param {Array} arr - Source data
         * @returns {Number} Sum of the all numeric items
         * @throws Will throw an error "Not an array" if the argument isn't array.
         */
        sum: function(arr) {
            return this.check(arr) ?
                this.flatten(arr).reduce(function(a, b) {
                    return typeof b === "number" ? a += b : a;
                }, 0) :
                null;
        },


        /**
         * @function
         * @name mean
         * @description Returns mean of an array. Flattens an array and takes only numeric
         * values into a consideration.
         * @param {Array} arr - Source data
         * @param {String} [type = 'ari'] - type of the mean. 'ari': arithmetic, 'geo':  geometric, 'har': harmonic
         * @param {Number} [precision = 2] - precision of the calculations
         * @returns {Number} Mean of an array
         * @throws Will throw an error "Not an array" if the argument isn't array.
         */
        mean: function(arr, type, precision) {
            this.check(arr);
            isNaN(precision) && (precision = 2);
            arr = this.flatten(arr);
            var mean = 0,
                sum = 0,
                num = 0,
                mul = 1;

            if (!arr.length) {
                return mean;
            }

            typeof type === "string" ? type = type : precision = Math.abs(type) || precision;

            // Main arithmetic logic
            switch (type) {
                case "ari":
                default:
                    arr.forEach(function(v) {
                        if (typeof v === "number") {
                            sum += v;
                            num++;
                        }
                    });
                    mean = (sum / num);
                    break;

                case "geo":
                    arr.forEach(function(v) {
                        if (typeof v === "number") {
                            mul *= v;
                            num++;
                        }
                    });
                    mean = Math.pow(mul, 1 / num);
                    break;

                case "har":
                    var harArray = [];
                    arr.forEach(function(v) {
                        typeof v === "number" && harArray.push(v);
                    });

                    var harDenominator = harArray.map(function(number) {
                        return 1 / number;
                    }).reduce(function(a, b) {
                        return a + b;
                    });
                    mean = (harArray.length / harDenominator);
            }
            return precision > 0 ? mean.toFixed(precision) : mean;
        },

        /**
         * @function
         * @name median
         * @description Returns median for numeric values. Flattens an array before calculations.
         * @param {Array} arr - Source data
         * @param {Number} [precision = 2] - precision of the calculations
         * @returns {Number} Median for numeric values
         * @throws Will throw an error "Not an array" if the argument isn't array.
         */
        median: function(arr, precision) {
            this.check(arr);
            isNaN(precision) && (precision = 2);
            arr = this.flatten(arr);
            var newArr = [];

            // Push Number values into temp array
            arr.forEach(function(v) {
                typeof v === "number" && newArr.push(v);
            });

            // Return 0 for empty array, or 1st element for array with 1 item
            if (!newArr || !newArr.length) {
                return 0;
            } else if (newArr.length === 1) {
                return newArr[0];
            }

            newArr.sort(function(a, b) {
                return a - b;
            });

            var medianItem = Math.floor(newArr.length / 2);

            return newArr.length % 2 ?
                newArr[medianItem] :
                precision ?
                ((newArr[medianItem - 1] + newArr[medianItem]) / 2).toFixed(Math.abs(precision)) :
                (newArr[medianItem - 1] + newArr[medianItem]) / 2;
        },

        /**
         * @function
         * @name freq
         * @description Returns median for numeric values. Flattens an array before calculations.
         * @param {Array} arr - Source data
         * @returns {Object}  Frequency, where item is the value of an each array item
         * and frequency is the number of times that item appears in an array.
         * @throws Will throw an error "Not an array" if the argument isn't array.
         */
        freq: function(arr) {
            this.check(arr);
            arr = this.flatten(arr);
            return arr.reduce(function(obj, item) {
                obj[item] ? obj[item]++ : obj[item] = 1;
                return obj;
            }, {});
        },

        /**
         * @function
         * @name breakdown
         * @description Service method. Returns median for numeric values. Flattens an array before calculations.
         * @param {Array} arr - Source data
         * @param {Boolean} [toObject = False] - Convert data to console output or to the Object
         * @returns {Object|Console}  Frequency, where item is the value of an each array item
         * and frequency is the number of times that item appears in an array.
         * @throws Will throw an error "Not an array" if the argument isn't array.
         */
        breakdown: function(arr, toObject) {
            this.check(arr);
            arr = this.flatten(arr);

            var total = {
                number_: [],
                string_: [],
                function_: [],
                object_: [],
                undefined_: [],
                boolean_: []
            };

            arr.forEach(function(v) {
                total[typeof v + "_"].push(v);
            });

            return toObject ?
                total :
                console.log(
                    "Numbers: " + total.number_.length + "\n" +
                    "Strings: " + total.string_.length + "\n" +
                    "Functions: " + total.function_.length + "\n" +
                    "Objects: " + total.object_.length + "\n" +
                    "Undefined: " + total.undefined_.length + "\n" +
                    "Booleans: " + total.boolean_.length + "\n" +
                    "Total items: " + arr.length + "\n");

        },

        /**
         * @function
         * @name cop
         * @description Removes all the empty items (`undefined`, `null`) from an array preserving the structure.
         * @param {Array} arr - Source data
         * @param {Boolean} [toFlatten = False] - Flatten array before proceed
         * @returns {Array}  Array without empty items
         * @throws Will throw an error "Not an array" if the argument isn't array.
         */
        cop: function(arr, toFlatten) {
            var __ = this;
            __.check(arr);
            arr = toFlatten ? this.flatten(arr) : arr;

            var result = [];

            arr.forEach(function(item) {
                if (Array.isArray(item) && item.length) {
                    result.push(__.cop(item));
                } else if (typeof item !== "undefined") {
                    result.push(item);
                }
            });
            return result;
        },

        /**
         * @function
         * @name keep
         * @description Filter an array by item type or remove some types
         * @param {Array} arr - Source data
         * @param {String} [type = 'string'] - Set the type of an object to work with:
         *                'number', 'function', 'object', 'boolean', 'null', 'undefined'
         * @param {String} [logic = 'all'] - Keep all array items of `type`, remove the rest
         *                'but': keep all array items, but `type`
         * @returns {Array}  Filtered array
         * @throws Will throw an error "Not an array" if the argument isn't array.
         */
        keep: function(arr, type, logic) {
            this.check(arr);
            arr = this.flatten(arr);
            type = type || "string";
            logic = logic || "all";

            // Going switch() because of may be new logic later on
            switch (logic) {

                case "all":
                default:
                    return arr.filter(function(i) {
                        return typeof i === type.toLowerCase();
                    });

                case "but":
                    return arr.filter(function(i) {
                        return typeof i !== type.toLowerCase();
                    });
            }
        },

        /**
         * @function
         * @name alpha
         * @description Remove non alphanumerics from the String items in Source data
         * @param {Array} arr - Source data
         * @returns {Array}  Array with 'string' items without alphanumeric symbols
         * @throws Will throw an error "Not an array" if the argument isn't array.
         */
        alpha: function(arr) {
            return this.check(arr) && this.regExpFilter(arr, /[^a-z]/gi);
        },

        /**
         * @function
         * @name alphaNum
         * @description Service method. Returns array with filtered items according to expression
         * @param {Array} arr - Source data
         * @returns {Array}  Array with 'string' items without alphanumeric symbols but saving digits as well
         * @throws Will throw an error "Not an array" if the argument isn't array.
         */
        alphaNum: function(arr) {
            return this.check(arr) && this.regExpFilter(arr, /[^a-z0-9]/gi);
        },

        /**
         * @function
         * @name regExpFilter
         * @description Service method. Returns array with filtered items according to expression
         * @param {Array} arr - Source data
         * @param {RegExp} expression - RegExp odject for filtering source data
         * @returns {Array}  Array with filtered items, or empty array if none.
         * @throws Will throw an error "Not an array" if the argument isn't array.
         */
        regExpFilter: function(arr, expression) {
            var __ = this;
            var result = [];

            __.check(arr);

            arr.forEach(function(item) {
                if (Array.isArray(item) && item.length !== 0) {
                    result.push(__.regExpFilter(item, expression));
                } else if (typeof item === "string") {
                    item = item.replace(expression, "");
                    result.push(item);
                } else {
                    result.push(item);
                }
            });
            return result;
        },

        /**
         * @function
         * @name arrify
         * @description Converts an Object into an array that consists of values of the given object
         * @param {Object} obj - Source data
         * @returns {Array}  Array of items, that consists of values from the source data object
         * @throws Will throw an error "Not an object" if the argument isn't Object.
         */
        arrify: function(obj) {
            return typeof obj === "object" ?
                Object.keys(obj).map(function(key) {
                    return obj[key];
                }) :
                (function() {
                    throw new Error("Not an object!");
                }());
        },

        /**
         * @function
         * @name index
         * @description Returns an 'Array' of index values of the found element.
         * @param {Array} arr - Source data
         * @param {Number|String|Object} element - Element to find
         * @param {Boolean} [preserveStructure = True] - Preserving array structure
         * @returns {Array}  Returns an Array of index values of the found element.
         * @throws Will throw an error "Not an array" if the argument isn't array.
         * @throws Will throw an error "Element not passed as argument" if the argument isn't array.
         */
        index: function(arr, element, preserveStructure) {
            this.check(arr);

            !element && (function() {
                throw new Error("Element not provided as argument");
            }());

            arr = preserveStructure ? arr : this.flatten(arr);
            var result = [];

            arr.forEach(function(v, i) {
                element === v && result.push(i);
            });
            return result.length ? result : -1;
        }
    };

    /**
     * npm / <script> compatibility
     */

    if (typeof module !== "undefined" && module.exports) {
        module.exports = array_;
    } else {
        _.array_ = array_;
    }
}(this));