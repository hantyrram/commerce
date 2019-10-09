/**
 * Creates an employee credential.
 */

const ObjectId = require('mongodb').ObjectId;

module.exports = employee_useraccount_read = async(req,res,next)=>{

   let employee = req.preLoadedResource['Employee'];
  
   res.json({
      ok:1,
      resource: {_owner: employee.employeeId, ...employee.userAccount},
      resourceType: 'UserAccount'
   })

}