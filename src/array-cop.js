;
(function(_) {
    var array_ = {
        isValid: function(arr) {
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
        }
    }
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = array_;
    } else {
        _.array_ = array_;
    }
}(this));
