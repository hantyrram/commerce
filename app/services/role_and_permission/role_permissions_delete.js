const {dependencies} = require(`${APP_ROOT}/dependencyManager`);
const ObjectID = require('mongodb').ObjectID;
/**
 * @type {typedefs~service}
 * @func role_permissions_add
 * @memberof Services
 * @desc Adds the permission to the given Role.
 * @param {}
 */
module.exports = role_permissions_delete = async (req,res,next)=>{
 const { db } = dependencies;

 let roleId = req.params._id;
 let permissionName = req.params.permission_name;
 
 try {
  const FILTER = { _id: ObjectID(roleId) };
  const UPDATE = {
     $pull : {permissions: {name : permissionName }}
  }

  let findAndModifyWriteOpResultObject = await db.collection('roles').findOneAndUpdate(
   FILTER,
   UPDATE
   );

  let { value,lastErrorObject, ok } = findAndModifyWriteOpResultObject;

//   if(ok){
   let message = new Artifact.Message(Artifact.Message.SUCCESS, `${permissionName} removed from ${roleId}`);
   let artifact = new Artifact('ok', 'role_permissions_delete', null, message);
   res.json(artifact);
//   }

  
  
 } catch (error) {
  console.log(error);
  next(error);
 }
}



module.exports.label = 'Add permission to role';