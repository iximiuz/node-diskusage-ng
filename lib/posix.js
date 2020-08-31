'use strict';

var execFile = require('child_process').execFile;
var isDigits = require('./utils').isDigits;

function diskusage(path, cb) {
    execFile('df', ['-k', path], function(err, stdout) {
        if (err) {
            return cb(err);
        }

        try {
            cb(null, parse(stdout));
        } catch (e) {
            cb(e);
        }
    });
}

function parse(dusage) {
    var lines = dusage.split('\n');
    if (!lines[1]) {
        throw new Error('Unexpected df output: [' + dusage + ']');
    }
    var parts = lines[1]
        .split(' ')
        .filter(function(x) { return x !== ''; });
    var total = parts[1];
    var used = parts[2];
    var available = parts[3];
    if (!(isDigits(total) && isDigits(used) && isDigits(available))) {
        throw new Error('Unexpected df output: [' + dusage + ']');
    }

    return {
        total: total*1024,
        used: used*1024,
        available: available*1024
    };
}

module.exports = {
    diskusage: diskusage,
    parse: parse
};
