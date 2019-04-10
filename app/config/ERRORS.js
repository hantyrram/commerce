const ERRORS = {
 //use when schema validation fails
 VALIDATION_ERROR: 'VALIDATION_ERROR',

 /*Server Errors*/
 //validateSchema middleware was used but no schema was defined on route
 SERVER_ERROR_SCHEMA_NOT_FOUND_ON_ROUTE : 'SERVER_ERROR_SCHEMA_NOT_FOUND_ON_ROUTE'
}

module.exports = ERRORS;