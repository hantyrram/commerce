


global.APP_ROOT = __dirname;



global.config = require('./config');

const helpers = require('./helpers');
for(let helper of Object.getOwnPropertyNames(helpers)){
   global[helper] = helpers[helper];
}

global.Artifact = require('./Artifact');