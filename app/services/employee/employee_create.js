
const _generateEmpId = require('./_generateEmpId');
/**
 * @type {HT~service}
 * @func employee_create
 * @memberof Services
 * @desc Creates a new Employee Profile
 */
module.exports = employee_create = async (req,res,next)=>{
 let empID;
 let cursor = await req.app.get('db').collection('employees').find({}).sort({$orderby:-1}).limit(1);
 if(! (await cursor.hasNext())){
  empID = "ht1";
 }else{
  let lastDoc =  await cursor.next();
  let lastID = lastDoc.empID;
  let num = Number(lastID.replace("ht","")) + 1;
  empID = "ht" + num;
 }
 console.log(empID);
 
 try {
  let QUERY = { empID: empID };
  let UPDATE = {
   $setOnInsert: {
    ...req.body,
    createdBy: req.user.username,
    createdOn: Date.now()
   }
  }
  let OPTIONS = {
   upsert: true
  }

  let result = await req.app.get('db').collection('employees').updateOne(QUERY,UPDATE,OPTIONS);
  let { matchedCount } = result;
  if(matchedCount > 0){ // username is already on db
   let error = new Artifact.Error('DUPLICATE_KEY_VIOLATION','Employee ID is already issued!');
   let errorArtifact = new Artifact('nok', 'employee_create', error);
   next(errorArtifact);
   return;
  }

  let data = {
   entity: {
    _id: result.upsertedId._id, 
   }
  };
  let message = new Artifact.Message(Artifact.Message.SUCCESS, 'Employee Created Successfully!');
  let artifact = new Artifact('ok', 'employee_create', data, message);
  res.json(artifact);
 } catch (error) {
  console.log(error);
  next(error);
 }
}

module.exports.label = 'Create New Employee Profile';
