module.exports = {
    isValid: function(arr) {
        return (Array.isArray(arr)) ? true : console.log(typeof(arr) + " is not an Array");
    },

    flatten: function(arr) {
        // Flattens all the layers of an array.

        var __ = this;
        return this.isValid(arr) ? arr.reduce(function(f, i) {
            return f.concat(Array.isArray(i) ? __.flatten(i) : i);
        }, []) : arr;
    },

    dedup: function(arr) {
        // Removes duplicates from an array. Note: items in nested arrays are not
        // considered to be duplicates. If you want to remove duplicates from
        // the sub-arrays as well then apply flatten() first.

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
        // Picks a random items from an array in a range of min, max.
        // If no range is provided then array.length is taken
        // into a consideraton

        return this.isValid(arr) ? arr[Math.floor(Math.random() * ((max || arr.length) - (min || 0))) + (min || 0)] : arr;
    }
}
