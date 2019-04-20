const Ajv = require('ajv');
const {routes,ERRORS} = require('../config');
const {getRoute} = require('../helpers');

/**
 * Provides a user-friendly message, for pattern schema violation.
 * @hidden
 */
const PATTERNS = {
 "^[^\\s]+$" : 'Must Not Contain Space!'
}



/**
 * @memberof middlewares
 * @type {typedefs~middleware}
 * @function validateSchema
 * @desc A route specific middleware. This middleware can be added on each Route that requires Schema
 * validation. This middleware uses schemas in the /app/schemas.
 * 
 * 
 */
module.exports = validateSchema = (req,res,next)=>{
  let route = getRoute(routes,req);
  //check required properties
  const { validateSchema } = route;
  
  if(!validateSchema || !validateSchema.schema){
   let error = new Artifact.Error(ERRORS.SERVER_ERROR_SCHEMA_NOT_FOUND_ON_ROUTE,'Please contact Administrator!');
   let artifact = new Artifact(Artifact.NOK,'M_validate_schema',error);
   next(artifact);
  }

  const { schema: SCHEMA_NAME, requireId, generateEntity } = validateSchema;

  let jsonSchema = require(`../schemas/${SCHEMA_NAME}.json`);
  
  if(requireId){
   if(!jsonSchema.required){
    jsonSchema.required = [];
   }
   //??? ADD AS APP CONFIG, allow user to decide label of id e.g. _id, ID, userID
   !jsonSchema.required.includes('_id')? jsonSchema.required.push("_id"): null; 
  }

  let ajv = new Ajv();
  let validate = ajv.compile(jsonSchema);
  let valid = validate(req.body);
  if(!valid){
   let error = new Artifact.Error(ERRORS.VALIDATION_ERROR,`Validation Failed! ${SCHEMA_NAME} ${validate.errors[0].message}`);
   if(validate.errors[0].params.pattern){//pattern failure
    let txt = PATTERNS[validate.errors[0].params.pattern] || '';
    error = new Artifact.Error(ERRORS.VALIDATION_ERROR,`Validation Failed! ${SCHEMA_NAME} ${txt}`);
   }
   let artifact = new Artifact(Artifact.NOK,'M_validate_schema',error);
   next(artifact);
   return;
  }

  //???
  //** if generateEntity, generate an entity based on schema attach it to the req as req.validated.user we can't make sure to namespace so we don't pollute the req */
  // if(generateEntity){
  //  let entity = Object.assign({},jsonSchema.properties);
  //  entity = Object.assign(entity,req.body);
  //  console.log(entity);
  // }
 
  //signifies that the req.body has undergone schema validation
  req.schemaValidationDone = true; 
  //the schema used during validation
  req.schemaValidationSchema = jsonSchema;
  next();
}