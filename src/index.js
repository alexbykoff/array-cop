module.exports = {
    isValid: function(arr) {
        return (Array.isArray(arr)) ? true : console.log(typeof(arr) + " is not an Array");
    },
    flatten: function(arr) {
        var _ = this;
        return this.isValid(arr) ? arr.reduce(function(flat, i) {
            return flat.concat(Array.isArray(i) ? _.flatten(i) : i);
        }, []) : arr;
    },
    dedup: function(arr) {
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
    }
}
