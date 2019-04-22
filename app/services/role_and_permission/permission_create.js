/**
 * @type {HT~service}
 * @func permission_create
 * @memberof Services
 * @desc Creates a New Permission. Assigns the permission to _GOD_ role. No need for permissions collection.
 * _GOD_ role MUST be an unassignable role.
 * @param {}
 */
module.exports = permission_create = async (req,res,next)=>{
 //Adds Permission to God Role
 let roles = req.app.get('db').collection('roles');
 try {
  let {name,label} = req.body;

  let FETCH_GOD_ROLE = {
   name: '_GOD_',
  }

  let permissionNameExist = await roles.findOne({$and:[FETCH_GOD_ROLE,{"permissions.name":name}]});

  if(permissionNameExist){
   let err = new Artifact.Error('DUPLICATE_KEY_VIOLATION','Permission name already exist!');
   let artifact = new Artifact('nok','permission_create',err);
   res.status(400).json(artifact);
   return;
  }

  let UPDATE = {
   $addToSet: {
    "permissions": {name,label}
   },
   $currentDate: {
    modifiedOn: {$type:'timestamp'}
   }
  }

  let result = await roles.updateOne(FETCH_GOD_ROLE,UPDATE);
  console.log(result);
  
  let message = new Artifact.Message(Artifact.Message.SUCCESS, 'Permission Added!');
  let artifact = new Artifact('ok', 'permission_create', null, message);
  res.json(artifact);
  } catch (error) {
   console.log(error);
   next(error);
 }
}

//add role to the system,
//a role may be assigned to a user a role must exist before it can be assigned to a user.

module.exports.label = 'Create New Permission';