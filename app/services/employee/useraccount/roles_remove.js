/**
 * Creates an employee credential.
 */

const ObjectId = require('mongodb').ObjectId;

/**
 * Remove's a Role from employee's user account roles.
 */
module.exports = employee_useraccount_roles_remove = async(req,res,next)=>{

   let {db} = hantyr.dependencyManager.dependencies;
   
   let employee = req.preLoadedResource['Employee'];
   let role = req.preLoadedResource['Role'];

   let filter = { _id: ObjectId(employee._id) };   
   let update = { $pull: {  "userAccount.roles": { role_id: ObjectId(role._id)} } };
  
   let result = await db.collection('employees').findOneAndUpdate(filter,update);

   res.json({
      ok:1,
      resource: result,
      // resourceType: 'Array',
      // resourceArrayItemType: 'Role'
   });

}