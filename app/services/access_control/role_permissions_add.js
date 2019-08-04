const ObjectID = require('mongodb').ObjectID;
const {dependencies} = require(`${APP_ROOT}/dependencyManager`);
/**
 * @type {typedefs~service}
 * @func role_permissions_add
 * @memberof Services
 * @desc Adds the permission to the given Role.
 * @param {}
 */
module.exports = role_permissions_add = async (req,res,next)=>{
 //roleID
 //permission
 const {db} = dependencies;

 let roleID = req.params.id;
 let permissions = req.body; // Array

 console.log(req.params);
 console.log('@role_permissions_add',permissions);

 try {

  
//   let service = getServices().find(service=>service.name === permission.name);
  

//   if(service === -1){
//    let error = new Artifact.Error('INVALID_PERMISSION', `${permission.name} is not a valid permission!`);
//    let artifact = new Artifact('nok', 'role_permissions_add', error);
//    res.json(artifact);
//   }


  let {matchedCount, modifiedCount} = await db.collection('roles').updateOne({_id: ObjectID(roleID)},{$addToSet: {permissions : { $each: permissions} }});
  if(matchedCount || modifiedCount){
   let message = new Artifact.Message(Artifact.Message.SUCCESS, `Permission added to Role: ${roleID}`);
   let artifact = new Artifact('ok', 'role_permissions_add', message,null);
   res.json(artifact);
  }
  
 } catch (error) {
  console.log(error);
  next(error);
 }
}



module.exports.label = 'Add permission to role';