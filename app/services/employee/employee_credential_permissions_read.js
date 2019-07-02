const USERNAME_PREFIX = "htu"; //short for hantyr user
const GENESIS = 0;
const START = 1;

const SERVICE_NAME = 'employee_credential_permissions_read';
/**
 * @type {typdefs~service}
 * @func employee_credential_permissions_read
 * @memberof Services
 * @desc Returns the permissions associated with the employee's roles. This is a helper function so that
 * the client won't need to fetch each employee's role individually to get each role's associated permissions.
 */
module.exports = employee_credential_permissions_read = async (req,res,next)=>{
//requires empID from param
 let employeesCollection = req.app.get('db').collection('employees');
 let rolesCollection = req.app.get('db').collection('roles');
 let { username } = req.params; 

 try {
  //return credential if employee has existing credential
 let employee = await employeesCollection.findOne( 
  { "credential.username":username },
  { projection: {"credential.password": 0} }
 );
 
 if(!employee){
  let error = new Artifact.Error('NOT_FOUND','Invalid Username');
  let errorArtifact = new Artifact('nok', SERVICE_NAME , error);
  res.status(400).json(errorArtifact);
  return;
 }

 if(!employee.roles || employee.roles.length < 1){
  let msg  = new Artifact.Message(Artifact.Message.SUCCESS,`Permissions`);
  let data = { entity: [] };
  let artifact = new Artifact('ok', SERVICE_NAME, data, msg);
  res.status(200).json(artifact);
  return;
 }

 let r = employee.roles.map( role => {return {name: role}} );// { name : 'admin'}

 console.log(chalk.red(`@${SERVICE_NAME} @`,r));
 let ROLES_QUERY = {
  $or: r
 }

 let roles = await rolesCollection.find(ROLES_QUERY).toArray();

 let permissions = [];
 for(let role of roles){
  permissions = permissions.concat(role.permissions);
 }

 let msg  = new Artifact.Message(Artifact.Message.SUCCESS,`Permissions`);
 let data = { entity: permissions};
 let artifact = new Artifact('ok', SERVICE_NAME, data, msg);
 res.status(200).json(artifact);
 return;

 } catch (error) {
  console.log(error);
  next(error);
 }

 
}

module.exports.label = 'Retrieves the permissions associated with the username';
