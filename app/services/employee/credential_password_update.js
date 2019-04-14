const USERNAME_PREFIX = "htu"; //short for hantyr user
const GENESIS = 0;
const START = 1;


/**
 * @type {HT~service}
 * @func employee_credential_password_update
 * @memberof Services
 * @desc Updates Employee password, unsets "temp" field on credential. 
 * @param {}
 */
module.exports = credential_password_update = async (req,res,next)=>{
//requires empID from param
 let employees = req.app.get('db').collection('employees');
 // let { empID } = req.params; 
 let { username,password,newPassword } = req.body;
 if(password === newPassword){
  let error = new Artifact.Error('NOT_ALLOWED','New password must be different from the current password!');
  let artifact = new Artifact('nok','credential_password_update',error);
  res.status(400).json(artifact);
  return;
 }
 let PROJECTION = {
  projection: {
   credential: 1,
   empID: 1
  }
 }

 let employee  = await employees.findOne({ "credential.username": username, "credential.password": password },PROJECTION);

 if(!employee){
  let error = new Artifact.Error('NOT_FOUND','Invalid Username or Password');
  let artifact = new Artifact('nok','credential_password_update',error);
  res.status(400).json(artifact);
  return;
 }

 if(employee){
  const QUERY = { empID: employee.empID, "credential.username":employee.credential.username };
  const UPDATE = {
   $set: {
    "credential.password": newPassword
   },
   $unset:{
    "credential.temp":true
   },
   $currentDate:{
    "credential.modifiedOn": { $type:"timestamp" }
   }
  }
  let {matchedCount,modifiedCount,result,message} = await  employees.updateOne(QUERY,UPDATE);
  if(result.ok === 1 && modifiedCount === 1){
   let message = new Artifact.Message(Artifact.Message.SUCCESS,'Password updated!')
   let artifact = new Artifact('ok','credential_password_update',null,message);
   res.json(artifact);
   return;
  }
  
 }
 next({type:'SERVICE_HANDLE_ERROR'});
 
 
}

module.exports.label = 'Updates employee password';
