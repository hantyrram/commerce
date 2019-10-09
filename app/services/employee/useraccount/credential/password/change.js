/**
 * Creates an employee credential.
 */

const ObjectId = require('mongodb').ObjectId;

module.exports = employee_credential_password_change = async(req,res,next)=>{
   res.json({
      error: {
         type: 'SERVICE_NOT_AVAILABLE',
         text: 'Contact Administrator!'
      }
   })

}