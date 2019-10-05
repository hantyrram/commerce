const USERNAME_PREFIX = "htu"; //short for hantyr user
const GENESIS = 0;
const START = 1;
const { dependencies } = require(`${APP_ROOT }/dependencyManager`);

/**
 * @type {HT~service}
 * @func employee_credential_generate
 * @memberof Services
 * @desc Generates A Temporary Credential. This does not assign or save the credential.
 */
module.exports = credential_generate = async (req,res,next)=>{
//requires empID from param
 let { db } = dependencies;

 let employees = db.collection('employees');


 
 //Determine the last used username
 const QUERY = { "userAccount.credential": { $exists: true } };
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

 //generate temporary password
 let password = randomStrGenerator(10);
 
 let credential = { username, password };

 res.json({
    ok:1,
    resource : credential,
    resourceType: 'Credential'
 })

}

module.exports.label = 'Generate Credential';

module.exports.description = `Generates a Credential and assigns it to given Employee. Employee MUST already exist in the 
   system. The generated Credential is a temporary Credential, user MUST changed his/her password before the Credential
   can be used to log in to the system.
`
