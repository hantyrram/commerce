const USERNAME_PREFIX = "htu"; //short for hantyr user
const GENESIS = 0;
const START = 1;
const { dependencies } = require(`${APP_ROOT }/dependencyManager`);

/**
 * @type {HT~service}
 * @func employee_credential_password_update
 * @memberof Services
 * @desc Updates Employee password, unsets "temp" field on credential. 
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
module.exports = credential_password_update = async (req,res,next)=>{
   let { db } = dependencies;
//requires empID from param
   let employees = db.collection('employees');
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

module.exports.label = 'Change Password';

module.exports.description = `Updates the Credential's password.`;

module.exports.devDescription = `Updates the Credential's password, removes temp property of the Credential if it exists. `
