'use strict';

var test = require('tape');
var diskusage = require('../lib/win32');

var output = 'FreeSpace     Name  Size\r\n' +
             '121332543488  C:    136256155648\r\n' +
             '0             D:    59496448\r\n' +
             '16610680832   E:    120101797888\r\n' +
             '16610680832   F:    120101797888\r\n' +
             '16610680832   G:    120101797888\r\n\r\n';

test('(Win32) it parses (I)', function(assert) {
    var parsed = diskusage.parse(output, 'C:');
    assert.equals(parsed.total, 136256155648);
    assert.equals(parsed.used, 14923612160);
    assert.equals(parsed.available, 121332543488);
    assert.end();
});

test('(Win32) it parses (II)', function(assert) {
    var parsed = diskusage.parse(output, 'D:');
    assert.equals(parsed.total, 59496448);
    assert.equals(parsed.used, 59496448);
    assert.equals(parsed.available, 0);
    assert.end();
});

test('(Win32) it fails if diskname is bad', function(assert) {
    try {
        var parsed = diskusage.parse(output, 'foo');
    } catch(e) {
        assert.true(!!e);
    }
    assert.end();
});
