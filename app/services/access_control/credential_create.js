const USERNAME_PREFIX = "htu"; //short for hantyr user
const GENESIS = 0;
const START = 1;
const { dependencies } = require(`${APP_ROOT }/dependencyManager`);

/**
 * @type {HT~service}
 * @func employee_credential_generate
 * @memberof Services
 * @desc Manually creates a credential, this is used to create credential that should not conform to the usual
 * form of an Employee credential. This is useful when you want to create a super user.
 */
module.exports = credential_create = async (req,res,next)=>{
//requires empID from param
 let { db } = dependencies;
 let employees = db.collection('employees');
 let { credential } = req.body; 
 //return credential if employee has existing credential
 let employeeWithCredential = await employees.findOne({ empID: empID, credential: { $exists:true }});
 if(employeeWithCredential){
  let error = new Artifact.Error('INVALID_OPERATION','Employee has existing Credential!');
  let errorArtifact = new Artifact('nok', 'employee_credential_generate', error);
  res.status(400).json(errorArtifact);
  return;
 }
 //Determine the last used username
 const QUERY = { credential: { $exists: true } };
 const OPTIONS = { projection: { "credential.username": 1 } };
 const SORT = { "credential.username": -1 } 
 let username;
 let cursor = await employees.find(QUERY,OPTIONS).sort(SORT).limit(1);
 if(! await cursor.hasNext()){
  //create first username
  username = `${USERNAME_PREFIX}${String(START).padStart(5,"0")}`;
 }else{
  let employee = await cursor.next();
  lastEmployeeNumber = Number(employee.credential.username.replace(USERNAME_PREFIX,""));
  username = `${USERNAME_PREFIX}${String(lastEmployeeNumber + 1).padStart(5,"0")}`;
 }
 //--

 const UPDATE = { 
  $set: { 
     credential,
     createdOn: Date.now(), 
     createdBy: req.user.credential.username
    },
 };

 let {matchedCount,modifiedCount,result,message} = await  employees.updateOne({ empID: empID },UPDATE);
 if (matchedCount === 0){//query failed, empID does not exist
  let error = new Artifact.Error('NOT_FOUND','Invalid Employee ID!');
  let errorArtifact = new Artifact('nok', 'employee_credential_generate', error);
  res.status(400).json(errorArtifact);
  return;
 }

 let msg  = new Artifact.Message(Artifact.Message.SUCCESS,`Username & Password created for EmpID: ${empID}!`);
 let data = { entity: credential, href :`/users/${empID}` };

 let artifact = new Artifact('ok', 'employee_credential_generate', data, msg);
 res.status(201).json(artifact);
}

module.exports.label = 'Generates a credential for an employee';
