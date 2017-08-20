function isCapitals(s) {
    return typeof s === 'string'
        && s.length > 0
        && s.split('').reduce(function(acc, c) {
            return acc && 'A' <= c && c <= 'Z';
        }, true);
}

function isDigits(s) {
    return typeof s === 'string'
        && s.length > 0
        && s.split('').reduce(function(acc, c) {
            return acc && '0' <= c && c <= '9';
        }, true);
}

module.exports.isCapitals = isCapitals;
module.exports.isDigits = isDigits;
