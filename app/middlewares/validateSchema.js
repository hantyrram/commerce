const Ajv = require('ajv');
const {routes,ERRORS} = require('../config');
const {getRoute} = require('../helpers');

/**
 * Provides a user-friendly message, for pattern schema violation.
 */
const PATTERNS = {
 "^[^\\s]+$" : 'Must Not Contain Space!'
}

/**
 * @type {Types~middleware}
 * @func validateSchema
 * @desc A route specific middleware. This middleware can be added on each Route that requires Schema
 * validation. This middleware uses schemas in the /app/schemas.
 * 
 * 
 */
module.exports = validateSchema = (req,res,next)=>{
  let route = getRoute(routes,req);
  if(!route.schema){//validateSchema used but no schema defined on route
   let error = new Artifact.Error(ERRORS.SERVER_ERROR_SCHEMA_NOT_FOUND_ON_ROUTE,'Please contact Administrator!');
   let artifact = new Artifact(Artifact.NOK,'M_validate_schema',error);
   next(artifact);
  }
  let schema = require(`../schemas/${route.schema}.json`);
  let ajv = new Ajv();
  let validate = ajv.compile(schema);
  let valid = validate(req.body);
  if(!valid){
   let error = new Artifact.Error(ERRORS.VALIDATION_ERROR,`Validation Failed! ${validate.errors[0].message}`);
   if(validate.errors[0].params.pattern){//pattern failure
    let txt = PATTERNS[validate.errors[0].params.pattern] || '';
    error = new Artifact.Error(ERRORS.VALIDATION_ERROR,`Validation Failed! ${txt}`);
   }
   let artifact = new Artifact(Artifact.NOK,'M_validate_schema',error);
   next(artifact);
   return;
  }

  //signifies that the req.body has undergone schema validation
  req.schemaValidationDone = true; 
  //the schema used during validation
  req.schemaValidationSchema = schema;
  next();
}