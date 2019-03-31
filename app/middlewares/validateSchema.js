const Ajv = require('ajv');
const config = require('../config');
const {getRoute} = require('../helpers');

/**
 * @type {Types~middleware}
 * @func validateSchema
 * @desc A route specific middleware. This middleware can be added on each Route that requires Schema
 * validation. This middleware uses schemas in the /app/schemas, validateSchema depends on the
 * 
 * 
 */
module.exports = validateSchema = (req,res,next)=>{
  let route = getRoute(config.routes,req);
  let Schema = require(`../schemas/${route.schema}.json`);
  let ajv = new Ajv();
  let validate = ajv.compile(Schema);
  let valid = validate(req.body);
  if(!valid){
   console.log(validate.errors);
  }
  next();
}