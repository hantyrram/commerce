const pathToRegexp = require('path-to-regexp');
/**
 * Checks if there is a route definition that could handle the current req.method and req.path. This is 
 * useful on middlewares defined before the route handlers.
 * @param {Array} routes - Array of routes.
 * @param {object} req - The request object.
 * @param {Types~route} - The found route or null.
 */
module.exports.getRoute = (routes,req) => {
 let regexp;
 let route = routes.find(route=>{
  regexp = pathToRegexp(route.path);
  return route.method.toLowerCase() === req.method.toLowerCase() && regexp.exec(req.path) !== null;
 });
 return route;
}