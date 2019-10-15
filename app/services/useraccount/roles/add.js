/**
 * Creates an employee credential.
 */

const ObjectId = require('mongodb').ObjectId;

/**
 * Adds role to employee's user account.
 */
module.exports = employee_useraccount_roles_add = async(req,res,next)=>{

   console.log('Function Reached');
   let {db} = hantyr.dependencyManager.dependencies;
   
   let username = req.params.username;

   if(!ObjectId.isValid(req.body._id)){ //
      res.json({error: {type: 'RESOURCE_NOT_FOUND',text: 'Role not found!'}});
      return;
   }

   let role = await db.collection('roles').findOne({_id: ObjectId(req.body._id)});
   
   if(!role){
      res.json({error: {type: 'RESOURCE_NOT_FOUND',text: 'Role not found!'}});
      return;
   }
   let filter = { "userAccount.credential.username": username};   
   let update = { $addToSet: {  "userAccount.roles": { role_id: ObjectId(req.body._id)} } } ;
   let options = {
      projection: {
         "userAccount.roles": 1
      },
      returnOriginal: false
   }


   let result = await db.collection('employees').findOneAndUpdate(filter,update,options);  
      console.log('Result ',result);
      res.json({
         ok: 1,
         resource : role,
         resourceType: 'Role',
         message: {
            type: 'SUCCESS',
            text: 'Role Added To User Account.'
         }
      });
   // try {
      
   // } catch (error) {
   //    console.log(error);
   //    res.json({
   //       error: {
   //          type: 'SERVER_ERROR',
   //          text: 'Error Adding Role. Contact Administrator.'
   //       }
   //    })
   // }
   
   

}