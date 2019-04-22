/**
 * @type {typedefs~service}
 * @func permission_browse
 * @memberof Services
 * @desc Creates a New Permission. Assigns the permission to _GOD_ role. No need for permissions collection.
 * _GOD_ role MUST be an unassignable role.
 * @param {}
 */
module.exports = permission_browse = async (req,res,next)=>{
 //Adds Permission to God Role
 let roles = req.app.get('db').collection('roles');
 try {
 

  let GOD_ROLE = {
   name: '_GOD_',
  }

  const OPTIONS = {
   projection : {
    permissions: 1
   }
  }

  const _GOD_ = await roles.findOne(GOD_ROLE,OPTIONS);

  
  let message = new Artifact.Message(Artifact.Message.SUCCESS, 'Permissions');
  let artifact = new Artifact('ok', 'permission_browse', {entity: _GOD_.permissions}, message);
  res.json(artifact);
  } catch (error) {
   console.log(error);
   next(error);
 }
}

//add role to the system,
//a role may be assigned to a user a role must exist before it can be assigned to a user.

module.exports.label = 'Fetch Permissions';