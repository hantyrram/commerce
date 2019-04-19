const USERNAME_PREFIX = "htu"; //short for hantyr user
const GENESIS = 0;
const START = 1;


/**
 * @type {HT~service}
 * @func employee_credential_password_update
 * @memberof Services
 * @desc Revokes a Credential.
 * @param {}
 */
module.exports = credential_revoke = async (req,res,next)=>{
//requires empID from param
 let employees = req.app.get('db').collection('employees');
 let { empID } = req.params; 
 const UPDATE = {
  $set:{
   "credential.revoked": true,
   "credential.revokedBy": req.user.credential.username
  },
  $currentDate:{
   "credential.modifiedOn": {$type: "timestamp"}   
  }
 }

 let {matchedCount,modifiedCount}  = await employees.updateOne({ empID },UPDATE);
 if(matchedCount < 1){
  let error = new Artifact.Error('NOT_FOUND','Invalid employee ID!');
  let artifact = new Artifact('nok','credential_revoke',error);
  res.status(400).json(artifact);
  return;
 }

 if(modifiedCount > 0){
  let message = new Artifact.Message(Artifact.Message.SUCCESS,`Employee : ${empID} Credential has been revoked!`)
  let artifact = new Artifact('ok','credential_revoke',null,message);
  res.json(artifact);
  return;
 }
 
 next({type:'SERVICE_HANDLE_ERROR'});
 
 
}

module.exports.label = 'Revokes the employees Credential.';
