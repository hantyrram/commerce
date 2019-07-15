Object.defineProperty(module.exports,'API_VERSION',{value: 'apiv1',configurable:false,writable:false});
module.exports.middlewares = require('./middlewares');
delete require.cache[require('./services')]; // delete for hot reload,no need to restart a server 
module.exports.services = require('./services');
module.exports.routes = require('./routes');
module.exports.errorHandlers = require('./errorHandlers');
module.exports.ERRORS = require('./ERRORS');