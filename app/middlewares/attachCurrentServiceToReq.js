/**
 * 
* Attaches the current service being accessed by the request. This middleware should never fail,
* to attach a service. Should be used before authorization. Uses the route definitions
*/

const config = require('../config');
const pathToRegexp = require('path-to-regexp');
/**
 *
 * @type {HT~middleware}
 * @desc Attaches the @see{@link{Artifact}} to the response object. So that can be easily accessed by any service.
 */
module.exports = attachCurrentServiceToReq = (req,res,next)=>{
  let regexp;
  let route = config.routes.find(route=>{
     regexp = pathToRegexp(route.path);
     return route.method.toLowerCase() === req.method.toLowerCase() && regexp.exec(req.path) !== null;
  });
  //attache the service 
  if(!route){
    next({type:'NOT_FOUND',message:'Can\'t find resource'});
    return;
  }
  req.currentAccessedService = getServices().find(s=>{
    return s.name === route.serviceProvider;
  })
  next();
}