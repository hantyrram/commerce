
const {dependencies} = require(`${APP_ROOT}/dependencyManager`);
/**
 * @type {HT~service}
 * @func employee_add
 * @memberof Services
 * @desc Creates a new Employee Profile
 */
module.exports = employee_add_eid_manual = async (req,res,next)=>{ 
   let {db} = dependencies;
 let employee = req.body;

 try {
  let QUERY = { employeeId: employee.employeeId };
  
  let UPDATE = {
   $setOnInsert: {
    ...employee,
    createdOn: Date.now()
   }
  }

  req.user && req.user.credential ? UPDATE['$setOnInsert'].createdBy = req.user.credential.username : null;

  let OPTIONS = {
   upsert: true
  }

  let result = await db.collection('employees').updateOne(QUERY,UPDATE,OPTIONS);
  let { matchedCount } = result;
  if(matchedCount > 0){ // username is already on db
   let error = new Artifact.Error('DUPLICATE_KEY_VIOLATION','Employee ID is already issued!');
   let errorArtifact = new Artifact('nok', 'employee_add', error);
   next(errorArtifact);
   return;
  }

  console.log(result);
  
  let data = {
   entity: {
    _id: result.upsertedId._id, 
   },
   href: `/employees/${result.upsertedId._id}`
  };
  console.log(data);
  let message = new Artifact.Message(Artifact.Message.SUCCESS, 'Employee Created Successfully!');
  let artifact = new Artifact('ok', 'employee_add', message, data);
  res.json(artifact);
 } catch (error) {
  console.log(error);
  next(error);
 }
}

module.exports.label = 'Create New Employee Profile';
