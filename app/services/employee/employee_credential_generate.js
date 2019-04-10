const USERNAME_PREFIX = "htu"; //short for hantyr user
const GENESIS = 0;
const START = 1;

/**
 * @type {HT~service}
 * @func employee_credential_generate
 * @memberof Services
 * @desc Creates a new user credential for the employee.
 */
module.exports = employee_credential_generate = async (req,res,next)=>{
 const QUERY = { credential: { $exists: true } };
 const OPTIONS = { projection: { "credential.username": 1 } };
 const SORT = { "credential.username": -1 } 
 let username;
 let cursor = await req.app.get('db').collection('employees').find(QUERY,OPTIONS).sort(SORT).limit(1);
 if(! await cursor.hasNext()){
  //genesis
  username = `${USERNAME_PREFIX}${String(START).padStart(5,"0")}`;
 }else{
  let employee = await cursor.next();
  username = `${USERNAME_PREFIX}${Number(employee.credential.username.replace(USERNAME_PREFIX,"")) + 1}`;
 }

 let temporaryPassword = randomStrGenerator(10);
 res.json({
  username: username,
  password: temporaryPassword
 });
}

module.exports.label = 'Generate Employee Credential';
