/**
 * Creates an employee credential.
 */

const ObjectId = require('mongodb').ObjectId;

/**
 * Remove's a Role from employee's user account roles.
 */
module.exports = employee_useraccount_roles_remove = async(req,res,next)=>{

   let {db} = hantyr.dependencyManager.dependencies;
   let { username, role } = req.params;

   let filter = { 
      $and : [
         {
            "userAccount.credential" : {
               $exists: true
            }
         },
         {
            "userAccount.credential.username" : username
         }
      ]
   };  


   console.log('Role Id',role); 
   let update = { $pull: {  "userAccount.roles": { "role_id": { $eq: ObjectId(role) } } } };
   let options = {
      returnOriginal:false
   }
   let result = await db.collection('employees').findOneAndUpdate(filter,update,options);

   

   console.log(result);
   
   res.json({
      ok:1,
      resource: result,
      // resourceType: 'Array',
      // resourceArrayItemType: 'Role'
   });

}