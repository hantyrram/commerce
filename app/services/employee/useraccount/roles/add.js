/**
 * Creates an employee credential.
 */

const ObjectId = require('mongodb').ObjectId;

/**
 * Adds role to employee's user account.
 */
module.exports = employee_roles_add = async(req,res,next)=>{

   let {db} = hantyr.dependencyManager.dependencies;

   if(!ObjectId.isValid(req.body._id)){ //
      res.json({error: {type: 'RESOURCE_NOT_FOUND',text: 'Role not found!'}});
      return;
   }

   let role = await db.collection('roles').findOne({_id: ObjectId(req.body._id)});
   console.log(role);
   if(!role){
      res.json({error: {type: 'RESOURCE_NOT_FOUND',text: 'Role not found!'}});
      return;
   }
   let employee = req.preLoadedResource['Employee'];
   let filter = { _id: ObjectId(employee._id)};   
   let update = { $addToSet: {  "userAccount.roles": { role_id: ObjectId(req.body._id) } } } ;
   let options = {
      projection: {
         "userAccount.roles": 1
      },
      returnOriginal: false
   }

   let result = await db.collection('employees').findOneAndUpdate(filter,update,options);
   res.json(result);

}