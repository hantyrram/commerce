const {dependencies} = require(APP_ROOT + '/dependencyManager');
const ObjectId = require('mongodb').ObjectId;


module.exports = employee_edit = async (req,res,next)=>{

   let { db } = dependencies;
   let employee = req.preLoadedResource['Employee'];
   const query = {  
      _id: ObjectId(employee._id)
   };

   delete req.body.userAccount;
   delete req.body.roles;
   
   const update = {
      $set : hantyr.flatten(req.body)
   }
   let result = await db.collection('employees').updateOne(query,update);

   res.json(result);
}