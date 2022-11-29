'use strict';

var execFile = require('child_process').execFile;
var isDigits = require('./utils').isDigits;

function diskusage(path, cb) {
    execFile('df', ['-P', '-k', path], function(err, stdout) {
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
    var matches = lines[1].match(/^.+\s+(\d+)\s+(\d+)\s+(\d+)\s+\d+%\s+.+$/);
    if (!matches || matches.length !== 4) {
        throw new Error('Unexpected df output: [' + dusage + ']');
    }
    var total = matches[1];
    var used = matches[2];
    var available = matches[3];

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
