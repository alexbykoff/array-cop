(function(_) {

    var array_ = {

        flatten: function(arr) {

            var __ = this;

            return Array.isArray(arr) ? arr.reduce(function(f, i) {

                return f.concat(Array.isArray(i) ? __.flatten(i) : i);
            }, []) : arr;
        },

        dedup: function(arr, force) {

            if (Array.isArray(arr)) {

                if (force) arr = this.flatten(arr);

                return arr.filter(function(item, i) {
                    return arr.lastIndexOf(item) === i;
                });
            }
            return arr;
        },

        rand: function(arr, min, max) {

            return Array.isArray(arr) ? arr[Math.floor(Math.random() * ((max || arr.length) - (min || 0))) + (min || 0)] : arr;
        },

        sum: function(arr) {

            if (Array.isArray(arr)) {

                return this.flatten(arr).reduce(function(a, b) {

                    return typeof(b) === 'number' ? a += b : a;
                }, 0);
            }
            return arr;
        },

        mean: function(arr, type, precision) {

            if (Array.isArray(arr)) {

                precision = precision || 2;

                arr = this.flatten(arr);

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
                        break;

                    case 'geo':
                        for (var i in arr) {
                            if (typeof(arr[i]) === 'number') {
                                mul *= arr[i];
                                num++;
                            }
                        }
                        return Math.pow(mul, 1 / num).toFixed(precision);
                        break;

                    case 'har':
                        var harArray = [];
                        for (var i in arr) {
                            if (typeof(arr[i]) === 'number') {
                                harArray.push(arr[i]);
                            }
                        }
                        var harDenominator = harArray.map(function(number) {
                            return 1 / number
                        }).reduce(function(a, b) {
                            return a + b
                        });
                        return (harArray.length / harDenominator).toFixed(precision);

                }
            }
            return arr;
        },

        median: function(arr, precision) {

            if (Array.isArray(arr)) {

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

            if (Array.isArray(arr)) {

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

        breakdown: function(arr, toObject) {

            if (Array.isArray(arr)) {

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
                    switch (typeof arr[index]) {
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

        cop: function(arr, toFlatten) {

            if (Array.isArray(arr)) {

                if (toFlatten) arr = this.flatten(arr);
                var __ = this;
                var result = [];
                arr.forEach(function(item) {
                    if (Array.isArray(item) && item.length != 0) {
                        result.push(__.cop(item));
                    } else if (typeof item !== 'undefined' && typeof item !== 'null') {
                        result.push(item);
                    }
                });
                return result;
            }
            return arr;
        },

        keep: function(arr, type, logic) {

            if (Array.isArray(arr)) {

                arr = this.flatten(arr);

                type = type || "string";
                type = type.toLowerCase();
                logic = logic || 'all'
                logic = logic.toLowerCase();

                // Going switch() because of may be new logic later on
                switch (logic) {
                    case 'all':
                    default:
                        return arr.filter(function(i) {
                            return typeof(i) === type.toLowerCase()
                        });
                        break;
                    case 'but':
                        return arr.filter(function(i) {
                            return typeof(i) !== type.toLowerCase()
                        });
                        break;
                }
            }
            return arr;
        },
        alpha: function(arr) {
            return Array.isArray(arr) ? this.regExpFilter(arr, /[^a-z]/gi) : arr;
        },
        alphaNum: function(arr) {
            return Array.isArray(arr) ? this.regExpFilter(arr, /[^a-z0-9]/gi) : arr;
        },

        regExpFilter: function(arr, expression) {
            var __ = this;
            var result = [];
            arr.forEach(function(item) {
                if (Array.isArray(item) && item.length != 0) {
                    result.push(__.regExpFilter(item, expression));
                } else if (typeof item === 'string') {
                    item = item.replace(expression, '');
                    result.push(item);
                } else {
                    result.push(item)
                }
            });
            return result;
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
