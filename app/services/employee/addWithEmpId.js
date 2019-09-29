
const {dependencies} = require(`${APP_ROOT}/dependencyManager`);
/**
 * @type {HT~service}
 * @func employee_addEidManual
 * @memberof Services
 * @desc Creates a new Employee Profile, providing the employee id manually.
 */
module.exports = employee_addEidManual = async (req,res,next)=>{ 
   
   let { db } = dependencies;

   await db.collection('employees').insertOne(req.body);
   
   res.json({ok:1, text:'Adding employee manually'});
}


