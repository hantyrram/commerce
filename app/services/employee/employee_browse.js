
/**
 * @type {HT~service}
 * @func employee_browse
 * @memberof Services
 * @desc Creates a new Employee Profile
 */
module.exports = employee_browse = async (req,res,next)=>{ 
 let empID;
 //get last
 const LIMIT = req.params.limit;
 const MATCH = { $match:{} };
 const PROJECT_REMOVE_CREDENTIAL = { $project: { credential: 0 }};
 let employees = await req.app.get('db').collection('employees').aggregate([MATCH,PROJECT_REMOVE_CREDENTIAL]).toArray(); 
 let message = new Artifact.Message(Artifact.Message.INFO, 'Employees');
 let artifact = new Artifact('ok', 'employee_browse',  message,{ entity: employees });
 res.json(artifact);
 // next({type:'UNHANDLED_SERVER_ERROR'});
}

module.exports.label = 'Create New Employee Profile';
