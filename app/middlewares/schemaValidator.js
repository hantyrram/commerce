

const Ajv = require('ajv');
const path = require('path');
/**
 * Provides a user-friendly message, for pattern schema violation.
 * @hidden
 */
const PATTERNS = {
 "^[^\\s]+$" : 'Must Not Contain Space!'
}

const definitions = require(path.resolve(SCHEMAS_PATH,'definitions.json'));
const Permission = require(path.resolve(SCHEMAS_PATH,'Permission.json'));
const Role = require(path.resolve(SCHEMAS_PATH,'Role.json'));
const Employee = require(path.resolve(SCHEMAS_PATH,'Employee.json'));
const Credential = require(path.resolve(SCHEMAS_PATH,'Credential.json'));
const Permissions = require(path.resolve(SCHEMAS_PATH,'Permissions.json'));

const schemas = [];//so that we can easily reference which schema to compile based on the schema defined on the api.
schemas['definitions'] = definitions;
schemas['Permission'] = Permission;
schemas['Permissions'] = Permissions;
schemas['Role'] = Role;
schemas['Employee'] = Employee;
schemas['Credential'] = Credential;

/**
 * @memberof middlewares
 * @type {typedefs~middleware}
 * @function validateSchema
 * @desc A route specific middleware. This middleware can be added on each Route that requires Schema
 * validation. This middleware uses schemas in the /app/schemas.
 * 
 * 
 */
module.exports = schemaValidator = (req,res,next)=>{
   if(req.currentApi.schemaValidator && req.currentApi.schemaValidator.schema){
      // const schema = require(path.resolve(SCHEMAS_PATH,req.currentApi.schemaValidator.schema))
      const ajv = new Ajv(
         {
            schemas: [
               definitions,Permission,Permissions,Role,Credential,Employee,
            ]
         }
      );
      // let validate = ajv.addSchema(definitions).compile(schema);
      let validate = ajv.compile(schemas[req.currentApi.schemaValidator.schema]);
      let entity = req.body;
      if(req.currentApi.schemaValidator.op && !(req.body instanceof Array)){
         //add _op, from api definition
         entity = { _op: req.currentApi.schemaValidator.op, ...req.body }
      }
      let valid = validate(entity);
      if(!valid){        
         res.json({ error: { type: 'VALIDATION_ERROR', text: JSON.stringify(validate.errors) }});
         return;
      }
   }
   next();
}

/**
 * @typedef {Object} MiddlewareOptions~validateSchemaOptions
 * @property {String} schema The name of the schema
 * @property {Array} [skip] The names of the schema field to skip validation. Example if you want to skip validation of
 * the employeeId field and differ it's validation to the service provider.
 * @property {Boolean} [requireId] Requires the _id property of the schema,useful during update operations.
 */