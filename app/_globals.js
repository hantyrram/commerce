


function createHref(resourceName,resourceInstance){

}

Object.defineProperty(global,'APP_ROOT',{ value: __dirname,writable:false,configurable:false});
// Object.defineProperty(global,'config',{ value: require('./config'),writable:false,configurable:false});
// Object.defineProperty(global,'ERRORS',{ value: require('./config/ERRORS.js'),writable:false,configurable:false});
// Object.defineProperty(global,'Artifact',{ value: require('./Artifact.js'),writable:false,configurable:false});

// const helpers = require('./helpers');

// for(let helper of Object.getOwnPropertyNames(helpers)){
//    // global[helper] = helpers[helper];
//    Object.defineProperty(global,helper,{ value: helpers[helper],writable:false,configurable:false});
// }

// global.Artifact = require('./Artifact');
global.hantyr = {
   DOMAIN:`http://localhost:${process.env.PORT || 1234}`,
   APP_ROOT: `${__dirname}`,
   dependencyManager: require('./dependencyManager'),
   flatten : require('./functions/flatten'),
   getPermissions: require('./functions/getPermissions'),
   randomStrGenerator: require('./functions/randomStrGenerator'),
   createHref: createHref
}

global.hantyr.paths = [];

global.hantyr.paths['schemas'] = `${__dirname}/schemasv2`;