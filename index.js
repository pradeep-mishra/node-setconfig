var fs = require('fs'),
	path = require('path'),
	cjson = require('cjson');

function setConfig(){
	var me = this,
		env = process.env.NODE_ENV,
		configPath = process.env.NODE_CONFIG_DIR, 
		attributes = { } ;

	this.setPath = function(path){
		if(path){
			configPath = path;
		}
		return this;	
	}

	this.setEnv = function(environ){
		if(environ){
			env = environ;
		}
		return this;
	} 

	this.load = function(){
		if(!configPath){
			throw Error("Config dir not set, use NODE_CONFIG_DIR or setPath() method");
		}
		if(!env){
			throw Error("Environment not set, use NODE_ENV var or setEnv() method");
		}
		var configFiles = [ ];
		if(fs.existsSync(path.join(configPath, 'default.json'))){
			configFiles.push(path.join(configPath, 'default.json'));	
		}
		if(fs.existsSync(path.join(configPath, (env + '.json')))){
			configFiles.push(path.join(configPath, (env + '.json')));	
		}
		attributes = cjson.load(configFiles, true);
		return this;
	}

	this.get = function(key){
		if(!key){
			return undefined;
		}
		var keySplit = Array.isArray(key) ? key : key.split('.');
		var attr = attributes;
		keySplit.some(function(item){
			if(typeof(attr[item]) !== "undefined"){
				attr = attr[item];
			}else{
				attr = undefined;
				return true;
			}
		});
		return attr;
	}

	this.has = function(key){
		if(!key){
			return false;
		}
		var keySplit = Array.isArray(key) ? key : key.split('.');
		var attr = attributes;
		keySplit.some(function(item){
			if(typeof(attr[item]) !== "undefined"){
				attr = attr[item];
			}else{
				attr = undefined;
				return true;
			}
		});
		
	}

	this.set = function(key, value){
		if(key){
			var keySplit = Array.isArray(key) ? key : key.split('.');
			var index = 1;
			var attr = attributes;
			keySplit.forEach(function(item){
				if(index === keySplit.length){
					return attr[item] = value;
				}
				if(!attr[item] || 
				   typeof(attr[item]) !== "object"){
					attr[item] = { };					
				}
				++index;
				attr = attr[item];
			});
		}
		return this;
	}

	this.remove = function(key){
		if(key && attributes[key]){
			delete attributes[key];
		}
		return this;
	}

	this.toJSON = function(){
		return JSON.parse(JSON.stringify(attributes));
	}

	this.getEnv = function(){
		return env;
	}

}
module.exports = setConfig;





