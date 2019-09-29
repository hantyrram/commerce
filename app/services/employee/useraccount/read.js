/**
 * Creates an employee credential.
 */

const ObjectId = require('mongodb').ObjectId;

module.exports = employee_useraccount_read = async(req,res,next)=>{

   let {db} = hantyr.dependencyManager.dependencies;
   let employee = req.preLoadedResource['Employee'];
   let userAccount = employee.userAccount || null;
   
   res.json({
      ok:1,
      resource: {
         "employee_userAccount": userAccount,
         _type: 'UserAccount'
      }
   })

}