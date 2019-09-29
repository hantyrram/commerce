const path = require('path');
const {dependencies} = require(path.resolve(APP_ROOT,'dependencyManager'));

module.exports = employee_browse = async (req,res,next)=>{

   let {db} = dependencies;

   let list = await db.collection('employees').find({}).toArray();

   res.json({
      ok: 1,
      resource: list,
      resourceType: "employee"
   })
}