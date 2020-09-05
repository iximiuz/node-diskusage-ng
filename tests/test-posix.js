'use strict';

var test = require('tape');
var diskusage = require('../lib/posix');

test('(POSIX) it parses Debian output', function(assert) {
    var output = 'Filesystem               1K-blocks      Used Available Use% Mounted on\n' +
                 '/dev/mapper/vg0-vg0_root 468090408 320796928 123515792  73% /\n';
    var parsed = diskusage.parse(output);
    assert.equals(parsed.total, 1024*468090408);
    assert.equals(parsed.used, 1024*320796928);
    assert.equals(parsed.available, 1024*123515792);
    assert.end();
});

test('(POSIX) it parses OSX output', function(assert) {
    var output = 'Filesystem 1024-blocks     Used Available Capacity  iused   ifree %iused  Mounted on\n' +
                 '/dev/disk1   117286912 98815836  18215076    85% 24767957 4553769   84%   /\n';
    var parsed = diskusage.parse(output);
    assert.equals(parsed.total, 1024*117286912);
    assert.equals(parsed.used, 1024*98815836);
    assert.equals(parsed.available, 1024*18215076);
    assert.end();
});

test('(POSIX) it parses non-ascii output', function(assert) {
    var output = 'Файловая система 1K-блоков Использовано Доступно Использовано% Cмонтировано в\n' +
                 '/dev/simfs       228969916    152855096 64477156           71% /\n';
    var parsed = diskusage.parse(output);
    assert.equals(parsed.total, 1024*228969916);
    assert.equals(parsed.used, 1024*152855096);
    assert.equals(parsed.available, 1024*64477156);
    assert.end();
});

test('(POSIX) it not parses if output is mallformed (I)', function(assert) {
    var output = 'Filesystem 1024-blocks     Used Available Capacity  iused   ifree %iused  Mounted on\n';
    try {
        diskusage.parse(output);
    } catch(e) {
        assert.true(!!e);
    }
    assert.end();
});

test('(POSIX) it not parses if output is mallformed (II)', function(assert) {
    var output = 'Filesystem 1024-blocks     Used Available Capacity  iused   ifree %iused  Mounted on\n' +
                 '/dev/disk1   117286A12 98815836';
    try {
        diskusage.parse(output);
    } catch(e) {
        assert.true(!!e);
    }
    assert.end();
});

test('(POSIX) it not parses if output is mallformed (III)', function(assert) {
    var output = 'Filesystem 1024-blocks     Used Available Capacity  iused   ifree %iused  Mounted on\n' +
                 '/dev/disk1   117286A12 98815836  18215076    85% 24767957 4553769   84%   /\n';
    try {
        diskusage.parse(output);
    } catch(e) {
        assert.true(!!e);
    }
    assert.end();
});

test('(POSIX) it does not substitute shell variables', function(assert) {
    diskusage.diskusage('$HOME', function(err) {
        assert.true(err.message.startsWith('Command failed: df -k $HOME'));
        assert.end();
    });
});

test('(POSIX) it does not substitute shell commands', function(assert) {
    diskusage.diskusage('$(echo "foobar")', function(err) {
        assert.true(err.message.startsWith('Command failed: df -k $(echo "foobar")'));
        assert.end();
    });
});

