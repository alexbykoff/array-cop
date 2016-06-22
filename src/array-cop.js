(function(_) {
    var array_ = {

        check: function(arr) {
            return Array.isArray(arr) || (function() {
                throw new Error("Not an array!");
            }());
        },

        /**
         * Flattens an array to a single-dimensional one
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
         * Removes duplicates from an array. Items in nested arrays are not
         * treated as duplicates(if `force` is not set to `true`) to avoid mess.
         */
        dedup: function(arr, force) {
            arr = force ?
                this.flatten(arr) :
                arr;
            return this.check(arr) ?
                arr.filter(function(item, i) {
                    return arr.lastIndexOf(item) === i;
                }) :
                null;
        },

        /**
         * Randomly picks and returns one item from an array or from a given range
         */
        rand: function(arr, min, max) {
            min < 0 ? min = 0 : min = min;
            max < 0 || max < min ? max = min : max = max;
            return this.check(arr) ?
                arr[Math.floor(Math.random() * (max - min)) + min] :
                null;
        },

        /** Returns a sum of all the items. Flattens an array and takes
         * only numeric values into a consideration
         */
        sum: function(arr) {
            return this.check(arr) ?
                this.flatten(arr).reduce(function(a, b) {
                    return typeof(b) === "number" ? a += b : a;
                }, 0) :
                null;
        },

        /**
         * Returns Mean of an array(arr). Flattens an array and takes only numeric
         * values into a consideration.
         *
         * type: type of mean -  'ari': arithmetic, 'geo':  geometric, 'har': harmonic.
         * If omitted then calculates an arithmetic mean.
         *
         * precision: Number — Optional argument, sets the number of digits after a decimal
         * point. If omitted then falls back to 2.
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

            typeof(type) === "string" ? type = type || "ari": precision = Math.abs(type) || precision;

            // Main arithmetic logic
            switch (type) {
                case "ari":
                default:
                    arr.forEach(function(v) {
                        if (typeof v === "number") {
                            sum += v;
                            num++;
                        };
                    });
                    mean = (sum / num);
                    break;

                case "geo":
                    arr.forEach(function(v) {
                        if (typeof v === "number") {
                            mul *= v;
                            num++;
                        };
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
         * Returns median for numeric values. Flattens an array before calculations.
         *
         * precision: Number — optional argument, sets the number of digits after a decimal
         * point. If omitted then falls back to 2
         */
        median: function(arr, precision) {
            this.check(arr);
            isNaN(precision) && (precision = 2);
            arr = this.flatten(arr);
            var newArr = [];

            // Push Number values into temp array
            for (var i in arr) {
                if (typeof(arr[i]) === "number") {
                    newArr.push(arr[i]);
                }
            }

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
         * Returns an Object: frequency, where item is the value of an each array item
         * and frequency is the number of times that item appears in an array.
         * Flattens an array before evaluation.
         */
        freq: function(arr) {
            this.check(arr);
            arr = this.flatten(arr);
            var frequencyMap = arr.reduce(function(obj, item) {
                if (obj[item]) {
                    obj[item]++;
                } else {
                    obj[item] = 1;
                }
                return obj;
            }, {});
            return frequencyMap;
        },

        /* Service method.
         * Result: array console pretty print, or object with items sorted by type
         *
         * **toObject: Boolean** — Optional argument, if set to true then method
         * will return an object with items sorted by their type.
         * Service method. Result is an array console pretty print.
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

            arr.forEach(function(value, index, arr) {
                var key_ = typeof arr[index] + "_";
                total[key_].push(arr[index]);
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

        /* Goes on patrol and removes all the empty items aka
         * `undefined` and `null` from an array preserving the structure.
         */
        cop: function(arr, toFlatten) {
            this.check(arr);
            arr = toFlatten ? this.flatten(arr) : arr;
            var __ = this;
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

        /* Filter an array by item type or remove some types
         * type: — sets the type of an object to work with.
         *  Values are:
         * 'string' [default], 'number', 'function', 'object', 'boolean', 'null', 'undefined'`
         *
         * logic: sets the logic for the method.
         * Values are:
         * all: [default] keep all array items of `type`, remove the rest
         * but: keep all array items, but `type`
         *
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
                        return typeof(i) === type.toLowerCase();
                    });

                case "but":
                    return arr.filter(function(i) {
                        return typeof(i) !== type.toLowerCase();
                    });
            }
        },

        /* Remove non alphanumerics from the String items */
        alpha: function(arr) {
            return this.check(arr) ? this.regExpFilter(arr, /[^a-z]/gi) : null;
        },

        /* Remove non alphanumerics from the String items but saving digits as well */
        alphaNum: function(arr) {
            return this.check(arr) ? this.regExpFilter(arr, /[^a-z0-9]/gi) : null;
        },

        regExpFilter: function(arr, expression) {
            var __ = this;
            var result = [];

            this.check(arr);

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

        arrify: function(obj) {
            return typeof obj === "object" ?
                Object.keys(obj).map(function(key) {
                    return obj[key];
                }) :
                (function() {
                    throw new Error("Not an object!");
                }());
        },

        index: function(arr, element, preserveStructure) {
            this.check(arr);

            if (!element) {
                throw new Error("Element not passed as argument");
            }
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
