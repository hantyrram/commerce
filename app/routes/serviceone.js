module.exports = {   
   //we can namespace the route for each, user of the framework
   //e.g. --ogag--/tests/serviceone,
   //     --anotherogag--/apiv2/tests/serviceone  if anotherogag defined apiVersion on his written
   path: '/tests/serviceone/:x',
   method: 'get',
   serviceProvider: 'serviceone_read',
   validateSchema: { // validateSchema middleware-specific configurations
      schema : 'Role'
   }
}