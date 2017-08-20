'use strict';

if (require('os').platform() === 'win32') {
    module.exports = require('./lib/win32').diskusage;
} else {
    module.exports = require('./lib/posix').diskusage;
}
