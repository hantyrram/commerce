const USERNAME_PREFIX = "htu"; //short for hantyr user
const GENESIS = 0;
const START = 1;
const { dependencies } = require(`${APP_ROOT }/dependencyManager`);
const ObjectID = require('mongodb').ObjectID;

/**
 * @type {HT~service}
 * @func employee_credential_generate
 * @memberof Services
 * @desc Manually creates a credential, this is used to create credential that should not conform to the usual
 * form of an Employee credential. This is useful when you want to create a super user.
 */
module.exports = credential_create = async (req,res,next)=>{
//requires employeeId from param
 let { db } = dependencies;
 let employees = db.collection('employees');


 const employeeId = req.body.employeeId;

 try {
   let employee = await employees.findOne({ employeeId: employeeId});
 
   if(employee && employee.credential){
      let error = new Artifact.Error('INVALID_OPERATION','Employee has existing Credential!');
      let errorArtifact = new Artifact('nok', 'credential_create', error);
      res.status(400).json(errorArtifact);
      return;
   }

   req.user && req.user.credential && req.user.credential.username ?
      entity['createdBy'] = req.user.credential.username : null;
   
    
   const credential = { 
      username: req.body.username, password: req.body.password,
      temp: true,
      createdOn: Date.now()
   };

   const UPDATE = { 
     $set: {
         credential,
      },
      
    };
    
   let {matchedCount,modifiedCount,result,message} = await  employees.updateOne({ employeeId: employeeId },UPDATE);

   if (matchedCount === 0){//query failed, employeeId does not exist
      let error = new Artifact.Error('NOT_FOUND','Invalid Employee ID!');
      let errorArtifact = new Artifact('nok', 'credential_create', error);
      res.status(400).json(errorArtifact);
   return;
   }   

   console.log(result);

   let msg  = new Artifact.Message(Artifact.Message.SUCCESS,`Username & Password created for EmpID: ${employeeId}!`);

   let data = { entity: credential, href :`/credentials/${credential.username}` };

   let artifact = new Artifact('ok', 'credential_create',msg, data);
   res.status(201).json(artifact);
 } catch (error) {
   // const { stack, message, driver, name, index, code, errmsg } = error;
   if(error.code === 11000){
      //???parse the errmsg to get the violated unique index
      let error = new Artifact.Error(ERRORS.DATABASE_ERROR.DUPLICATE_KEY_VIOLATION,'Username already exist!'); 
      let artifact = new Artifact('nok', 'credential_create', error);
      res.status(409).json(artifact);
   }
   console.log(error);

 }
 

 
}

module.exports.label = 'Generates a credential for an employee';
