const USERNAME_PREFIX = "htu"; //short for hantyr user
const GENESIS = 0;
const START = 1;


/**
 * @type {HT~service}
 * @func employee_roles_add
 * @memberof Services
 * @desc Adds employee a role.
 * @param {}
 */
module.exports = employee_roles_add = async (req,res,next)=>{
//requires empID from param
 let employees = req.app.get('db').collection('employees');
 let { empID } = req.params;
 let role = req.body; 

 let validRole = await req.app.get('db').collection('roles').findOne({name:role.name});
 if(!validRole){
  let error = new Artifact.Error('NOT_FOUND','Invalid Role!');
  let artifact = new Artifact('nok','employee_roles_add',error);
  res.status(400).json(artifact);
  return;
 }

 const UPDATE = {
  $addToSet : {
   roles: role.name
  },
  $currentDate:{
   lastModified:{$type:"timestamp"}
  },
  $set:{
   lastModComment: `Added ${role.name} Role`,
   lastModBy: req.user.credential.username
  }
 }
 
 let {matchedCount,modifiedCount}  = await employees.updateOne({ empID },UPDATE);
 console.log(matchedCount);
 let message = new Artifact.Message(Artifact.Message.SUCCESS,`${role.name} assigned to ${empID}`);
 let artifact = new Artifact('ok','employee_roles_add',null,message);
 res.json(artifact);
}

module.exports.label = 'Adds Employee A Role';
