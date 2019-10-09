
const ObjectId = require('mongodb').ObjectId;

module.exports.params = ['employee'];

module.exports.callback = async function(req,res,next,id){
   
   const {dependencies} = require('../dependencyManager');

   if(ObjectId.isValid(id)){
      let filter = {employeeId:id };
      let options = { 
         projection: {
            "userAccount.credential.password": 0
         }
      };

      let employee = await dependencies.db.collection('employees').findOne(
         filter,
         options
      );

      if(employee){
         req.preLoadedResource['Employee'] = employee;
         next();
         return;
      }
      res.json({
         error: {
            type: 'RESOURCE_NOT_FOUND',
            text: 'Employee does not exist'
         }
      })
      return;
   }

   res.json({
      error: {
         type: 'RESOURCE_NOT_FOUND',
         text: 'Invalid Employee Id'
      }
   })

   

   
}