const {dependencies} = require(DEPENDENCY_MANAGER_PATH);

module.exports = employee_list = async (req,res,next)=>{
   let {db} = dependencies;
   let employees = await db.collection('employees').find({}).toArray();
   res.json({ 
      ok:1, 
      resource: employees,
      resourceType: 'Array',
      resourceItemType: 'Employee'});
}