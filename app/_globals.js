


Object.defineProperty(global,'APP_ROOT',{ value: __dirname,writable:false,configurable:false});
Object.defineProperty(global,'config',{ value: require('./config'),writable:false,configurable:false});
Object.defineProperty(global,'ERRORS',{ value: require('./config/ERRORS.js'),writable:false,configurable:false});
Object.defineProperty(global,'Artifact',{ value: require('./Artifact.js'),writable:false,configurable:false});

const helpers = require('./helpers');

for(let helper of Object.getOwnPropertyNames(helpers)){
   // global[helper] = helpers[helper];
   Object.defineProperty(global,helper,{ value: helpers[helper],writable:false,configurable:false});
}

// global.Artifact = require('./Artifact');