'use strict';

if (process.platform == 'win32') {
    require('./test-win32.js');
} else {
    require('./test-posix.js');
}

