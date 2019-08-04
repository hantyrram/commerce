const USERNAME_PREFIX = "htu"; //short for hantyr user
const GENESIS = 0;
const START = 1;


/**
 * @type {HT~service}
 * @func employee_roles_add
 * @memberof Services
 * @desc Adds employee a role. Required params = "employeeId", body = An Array of roles.
 * @param {}
 */
module.exports = employee_roles_add = async (req,res,next)=>{
//requires employeeId from param
 let employees = req.app.get('db').collection('employees');
 let { employeeId } = req.params;
 let role = req.body; 
 const CHECK_ROLES_IF_EXISTS = {
    name : { $in: role.map(r => r.name) }
 }
 let validRole = await req.app.get('db').collection('roles').find(CHECK_ROLES_IF_EXISTS).toArray();
 console.log('posted role', role);
 console.log('validRole', validRole);
 if(!validRole || validRole.length < 1){
  let error = new Artifact.Error('NOT_FOUND','Invalid Roles!');
  let artifact = new Artifact('nok','employee_roles_add',error);
  res.status(400).json(artifact);
  return;
 }

 let roleNames = validRole.map( r => r.name);

 const UPDATE = {
  $addToSet : {
   roles: { $each : roleNames }
  },
  $currentDate:{
   lastModified:{$type:"timestamp"}
  },
  $set:{
   lastModComment: `Added ${roleNames.join()} Role(s)`,
   lastModBy: req.user.credential.username
  }
 }
 
 let {matchedCount,modifiedCount}  = await employees.updateOne({ employeeId },UPDATE);
 console.log(matchedCount);
 let message = new Artifact.Message(Artifact.Message.SUCCESS,`${role.name} assigned to ${employeeId}`);
 let artifact = new Artifact('ok','employee_roles_add',message,null);
 res.json(artifact);
}

module.exports.label = 'Adds Employee A Role';
