# diskusage-ng - get disk usage info in pure JavaScript and without any dependencies

[![Build Status](https://travis-ci.org/iximiuz/node-diskusage-ng.svg?branch=master)](https://travis-ci.org/iximiuz/node-diskusage-ng)

Supported operating systems:
 - Windows (via WMIC)
 - OSX/Linux/Posix (via df)

## Usage
```
var diskusage = require('diskusage-ng');

diskusage('/home/me', function(err, usage) {
	if (err) return console.log(err);

	console.log(usage.total);
	console.log(usage.used);
	console.log(usage.available);
});

```

## Commands
```
npm run test
```
