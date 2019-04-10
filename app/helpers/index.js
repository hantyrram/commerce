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

/**
 * Generates a string of random characters based on a sample.
 * @param {number} length - The length of the output string.
 * @param {string} sample - The characters in which the output string will be based on.
 * @param {string} - The generated string from sample.
 */
module.exports.randomStrGenerator =(length,SAMPLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@&^$#-+')=>{
 let arr = [];
 for(let i = 0; i < length; i++){
  let index = Math.floor(Math.random() * SAMPLE.length);
  arr.push(SAMPLE[index]);
 }
 return arr.join("");
}
