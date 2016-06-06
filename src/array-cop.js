(function(_) {
    var array_ = {
        isValid: function(arr) {
            /**
             *         Checks if an argument provided is a proper array
             *         If not then it returns an argument back and logs the type
             *         of an argument
             */

            return (Array.isArray(arr)) ? true : console.log(typeof(arr) + " is not an Array");
        },

        flatten: function(arr) {
            /**
             *        Flattens all the layers of an array, no matter how deeply nested they are.
             */

            var __ = this;
            return this.isValid(arr) ? arr.reduce(function(f, i) {
                return f.concat(Array.isArray(i) ? __.flatten(i) : i);
            }, []) : arr;
        },

        dedup: function(arr) {
            /**       Removes duplicates from an array. Note: items in nested arrays are not
             *        considered to be duplicates. If you want to remove duplicates from
             *        the sub-arrays as well then apply flatten() first.
             */

            if (this.isValid(arr)) {
                var newArray = [];
                arr.forEach(function(i) {
                    if (newArray.indexOf(i) === -1) {
                        newArray.push(i)
                    }
                });
                return newArray;
            }
            return arr;
        },

        rand: function(arr, min, max) {
            /**
             *        Picks a random item from an array in a range of min, max.
             *        If no range is provided then array.length is taken
             *        into a consideraton.
             */

            return this.isValid(arr) ? arr[Math.floor(Math.random() * ((max || arr.length) - (min || 0))) + (min || 0)] : arr;
        },

        sum: function(arr) {
            /**
             *        Returns the sum of all Number items in an array. If an array contains
             *        NaN items they will be skipped. sum() grabs all Number items from
             *        nested items as well.
             */

            if (this.isValid(arr)) {
                arr = this.flatten(arr);
                var sum = 0;
                for (var i in arr) {
                    if (typeof(arr[i]) === 'number') {
                        sum += arr[i]
                    }
                }
                return sum;
            }
            return arr;
        },

        avg: function(arr, prec) {
            /**
             *         Returns an average of Number items in an array. Method evaluates
             *         all Number items, including nested ones.
             *         syntax array_.avg(array,[precison]) where [precision]
             *         is the number of digits after a deciaml point. Optional,
             *         falls back to 2 if no argument is provided.
             */

            if (this.isValid(arr)) {
                arr = this.flatten(arr);
                var sum = 0;
                var num = 0;
                for (var i in arr) {
                    if (typeof(arr[i]) === 'number') {
                        sum += arr[i];
                        num++;
                    }
                }
                return (sum / num).toFixed(prec || 2);
            }
            return arr;

        }
    }

    /**
     *        npm / <script> compatibility
     */

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = array_;
    } else {
        _.array_ = array_;
    }
}(this));
