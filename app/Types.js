/**
 * @namespace typedefs
 */


/**
 * @typedef {function} typedefs~service - A service responds to api requests.
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @property {Boolean} [permissionIsRequired=true] - Must be explicitly set to false, for the service to bypass authentication.
 */

 /**
  * An express middleware
 * @see {@link https://expressjs.com/en/guide/using-middleware.html} 
 * @typedef {function} typedefs~middleware
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */

 /**
 * A helper is a unit of work in a form of a globally accessible reusable function. 
 * Helper functions must be exported from helpers/index.
 * @see {@link https://expressjs.com/en/guide/using-middleware.html} 
 * @typedef {function} typedefs~helper
 * @param {*} [args]
 */

/**
 * @namespace middlewares
 * 
 */

/**
 * @namespace schemas
 * 
 */

/**
 * @namespace helpers
 * 
 */ 

/**
 * @namespace policies
 * 
 */

/**
 * @namespace rules
 * 
 */

/**
 * @namespace local_modules 
 */ 

