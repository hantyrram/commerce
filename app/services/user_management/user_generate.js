const USERNAME_PREFIX = "htu"; //short for hantyr user
const GENESIS = 0;
const START = 1;

const {dependencies} = require(`${APP_ROOT}/dependencyManager`);

/**
 * @type {HT~service}
 * @func employee_credential_generate
 * @memberof Services
 * @desc Generates a username and password combination.
 */
module.exports = user_generate = async (req,res,next)=>{
//requires empID from param
 let employees = dependencies.db.collection('employees');

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

 //generate temporary password
 let password = randomStrGenerator(10);
 
 let artifact = new Artifact('ok', 'user_generate', { entity: { username, password } }, null);
 console.log(artifact);
 res.status(200).json(artifact);
}

module.exports.label = 'Generates a user & password combination';

module.exports.permissionIsRequired = false;
