# disk-usage - get disk usage info in pure JavaScript and without any dependencies

[![Build Status](https://travis-ci.org/Ostrovski/node-disk-usage.svg?branch=master)](https://travis-ci.org/Ostrovski/node-disk-usage)

Supported operating systems:
 - Windows (via WMIC)
 - OSX/Linux/Posix (via df)

## Usage
```
var diskusage = require('disk-usage');

diskusage('/home/me', function(err, usage) {
	if (err) return console.log(err);

	console.log(usage.total);
	console.log(usage.used);
	console.log(usage.available);
});

```

## Posix notes
Filenames with `"` inside will be rejected with an explicit error.
Bash substitution works, so for example `diskusage('$HOME', ...)` will show a diskusage for the user's home dir.
**It means that passing a raw user input to `diskusage()` can lead to arbitrary code execution.**

## Commands
```
npm run test
```
