
const {dependencies} = require(`${APP_ROOT}/dependencyManager`);

const EMP_ID_PREFIX = "100";//company 1,company 2 = 200
const GENESIS = 1000;//should not be assigned to anyone
const START = 1001;//first employee
/**
 * @type {HT~service}
 * @func employee_add_eid_manual
 * @memberof Services
 * @desc Creates a new Employee Profile
 */
module.exports = employee_add = async (req,res,next)=>{ 
   
   let { db } = dependencies;

   let employee = req.body;

   req.user = {credential:{username:'Test'}};

   let {db} = dependencies;
   
   let employeeId;
   //get last
   let cursor = await db.collection('employees').find({}).sort({ employeeId:-1 }).limit(1);
   if(! (await cursor.hasNext())){
    employeeId = `${EMP_ID_PREFIX}${START}`; //First employee
   }else{
    let lastDoc =  await cursor.next();
    let lastID = Number(lastDoc.employeeId.replace(EMP_ID_PREFIX,""));
    employeeId = `${EMP_ID_PREFIX }${lastID + 1}`;
   }
   
   try {
      
    let QUERY = { employeeId: employeeId };
  
    let UPDATE = {
  
     $setOnInsert: {
      
        ...req.body,
  
      metadata: {
        createdBy: req.user.credential.username,
        createdOn: Date.now()
      }
      
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
