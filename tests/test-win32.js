'use strict';

var test = require('tape');
var diskusage = require('../lib/win32');

var output = 'FreeSpace     Name  Size\r\n' +
             '121332543488  C:    136256155648\r\n' +
             '0             D:    59496448\r\n' +
             '16610680832   E:    120101797888\r\n' +
             '16610680832   F:    120101797888\r\n' +
             '16610680832   G:    120101797888\r\n\r\n';

var output2 = 'FreeSpace    Name  Size          \r\n' +
              '70402592768  C:    119507251200  \r\n' +
              '             D:                  \r\n\r\n';

var output3 = 'FreeSpace     Name  Size          \r\n' +
              '464075616256  C:    998659936256  \r\n' +
              '0             D:    606087168     \r\n' +
              '0             E:    1453686784    \r\n' +
              '              F:                  \r\n' +
              '0             G:    2749777920    \r\n' +
              '0             H:    3676667904    \r\n' +
              '0             I:    739725312     \r\n\r\n';

var output4 = 'FreeSpace     Name  Size          \r\n' +
              '455402688512  C:    998659936256  \r\n' +
              '0             D:    606087168     \r\n' +
              '0             E:    1453686784    \r\n' +
              '              F:                  \r\n' +
              '0             G:    2749777920    \r\n' +
              '0             H:    3676667904    \r\n' +
              '0             I:    739725312     \r\n' +
              '455402688512  S:    998659936256  \r\n\r\n';


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

test('(Win32) it parses (III)', function(assert) {
    var parsed = diskusage.parse(output2, 'C:');
    assert.equals(parsed.total, 119507251200);
    assert.equals(parsed.used, 119507251200 - 70402592768);
    assert.equals(parsed.available, 70402592768);

    parsed = diskusage.parse(output2, 'D:');
    assert.equals(parsed.total, 0);
    assert.equals(parsed.used, 0);
    assert.equals(parsed.available, 0);
    assert.end();
});

test('(Win32) it parses (IV)', function(assert) {
    var parsed = diskusage.parse(output3, 'F:');
    assert.equals(parsed.total, 0);
    assert.equals(parsed.used, 0);
    assert.equals(parsed.available, 0);
    assert.end();
});

test('(Win32) it parses (V)', function(assert) {
    var parsed = diskusage.parse(output4, 'F:');
    assert.equals(parsed.total, 0);
    assert.equals(parsed.used, 0);
    assert.equals(parsed.available, 0);

    parsed = diskusage.parse(output4, 'S:');
    assert.equals(parsed.total, 998659936256);
    assert.equals(parsed.used, 998659936256 - 455402688512);
    assert.equals(parsed.available, 455402688512);

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
