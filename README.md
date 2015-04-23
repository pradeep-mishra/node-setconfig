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
* Support commenting in configuration json file
* Many helper functions to handle configs



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
var config = new setConfig;

/*
SetConfig support Environment variable to set application's enviroment and configuration directory path

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

// get config
config.get('rateLimit');

// get internal configs with period
config.get('rateLimit.limit');

// set config
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
