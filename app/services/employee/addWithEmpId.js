
const {dependencies} = require(`${APP_ROOT}/dependencyManager`);
/**
 * @type {HT~service}
 * @func employee_addEidManual
 * @memberof Services
 * @desc Creates a new Employee Profile, providing the employee id manually.
 */
module.exports = employee_addEidManual = async (req,res,next)=>{ 
   
   let { db } = dependencies;

   let {result,insertedId} = await db.collection('employees').insertOne(req.body);
   
   res.status(201).json({
      ok: result.ok,
      resource: { _id: insertedId },
      resourceHref: '/employees/' + insertedId,
      resourceType: 'Employee',
      code: 201,
   })
}


