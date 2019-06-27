/**
 * @type {typedefs~service}
 * @func permission_delete
 * @memberof Services
 * @desc Creates a New Permission. Assigns the permission to _GOD_ role. No need for permissions collection.
 * _GOD_ role MUST be an unassignable role.
 * @param {}
 */
module.exports = permission_delete = async (req,res,next)=>{
 //Adds Permission to God Role
 let roles = req.app.get('db').collection('roles');
 try {
 

  let FILTER = {
   name: '_GOD_',
  }

  let UPDATE = {
   $pull : { permissions: {name : req.params.name} }
  }

  let result= await roles.update(FILTER,UPDATE);

  console.log(result);

  
  let message = new Artifact.Message(Artifact.Message.SUCCESS, 'Permission Deleted');
  let artifact = new Artifact('ok', 'permission_delete', {entity: {}}, message);
  res.json(artifact);
  } catch (error) {
   console.log(error);
   next(error);
 }
}

//add role to the system,
//a role may be assigned to a user a role must exist before it can be assigned to a user.

module.exports.label = 'Fetch Permissions';