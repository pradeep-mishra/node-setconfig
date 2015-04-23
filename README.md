[![NPM](https://nodei.co/npm/setconfig.svg?downloads=true&downloadRank=true)](https://nodei.co/npm/setconfig/)&nbsp;&nbsp;
[![Build Status](https://travis-ci.org/pradeep-mishra/node-setconfig.svg)](https://travis-ci.org/pradeep-mishra/node-setconfig)



setConfig
=========
A Configuration Loader for Node.js
=======


(C) Pradeep Mishra <pradeep23oct@gmail.com>

Load configuration for node.js application on enviroment basis.

**setConfig** follows some convention to simplify config loading and handling.

Features
--------

* Simple to use
* Supports commenting in configuration json file
* Helper functions to handle configuration



Example usage
-------------
**setConfig** use **default.json** for loading default configuration and **{enviroment}.json** for loading environment specifc configuration.

/myApp/configs/default.json

```javascript
{
  // default  config
  "db": {
      "host": "localhost",
      "port": 1234,
      "name": "users"
    },
    "rateLimit": {
      "limit": 100
      // comment is also supported in config json files
    },
    "flag" : false
}

```

/myApp/configs/development.json

```javascript
{
  // dev  config
    "rateLimit": {
      "limit": 1000
      // comment is also supported in config json files
    }
}

```

```javascript
var setConfig = require('setconfig');

// instantiate setConfig
var config = new setConfig();

/*
SetConfig support environment variable to set application's enviroment 
and configuration directory path.

NODE_ENV=development
NODE_CONFIG_DIR=/myApp/configs/

OR
You can set it programatically

*/
var configDir = __dirname + '/config';
config.setpath(configDir);
config.setEnv('development');

// call load method to load all configurations

config.load();

// now setConfig is ready to use

// get property
config.get('rateLimit');

// get internal config properties with period
config.get('rateLimit.limit');

// set property
config.set('flag', true);

// remove property
config.remove('rateLimit');

// check property exist
config.has('rateLimit.limit');

// get current environment
config.getEnv();

// returns JSON representation of current configuration
config.toJSON();
```



```bash
npm install setconfig --save
```
