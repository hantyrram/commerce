/**
 * Creates an employee credential.
 */

const ObjectId = require('mongodb').ObjectId;

module.exports = credential_create = async(req,res,next)=>{
   //create's userAccount.credential
   let {db} = hantyr.dependencyManager.dependencies;

   try {
      await db.collection('employees').find({
         employeeId: req.body.employeeId
      });
   } catch (error) {
      
   }

   if(employee.userAccount && employee.userAccount.credential){
      res.json({error: {type: 'INVALID_OPERATION',text: 'User Account has existing credential!'}});
      return;
   }

   
   let credential = {  temp: true , ...req.body };
   let filter = { _id: ObjectId(employee._id)};
   let update = { $set: {  "userAccount.credential" : credential} };
   let options = {
      projection: {
         "userAccount.credential.username": 1,
      },
      returnOriginal: false
   }

   let result = await db.collection('employees').findOneAndUpdate(filter,update,options);
   //createHref('employee_userAccount_credential',employee);because it will use the employee id
   //credential
   res.json(result);

}