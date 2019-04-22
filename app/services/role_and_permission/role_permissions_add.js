const ObjectID = require('mongodb').ObjectID;
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

 let roleID = req.params.roleID;
 let permission = req.body;
 let roles = req.app.get('db').collection('roles');
 try {

  let _GOD_and_TargetRole = await roles.find( {$or:[{ name:'_GOD_' },{_id: ObjectID(roleID)}]}).toArray();

  if(_GOD_and_TargetRole.length <= 1){
   res.json({x:'Invalid Role'});
   return;
  }

  let _GOD_ = _GOD_and_TargetRole.find((r)=>r.name === '_GOD_');
  let isValidPermission = _GOD_.permissions.find(p => p.name === permission.name);
  if(!isValidPermission){
   res.json({x:'Not a valid permission'});
   return;
  }

  let {matchedCount, modifiedCount} = await roles.update({_id: ObjectID(roleID)},{$addToSet:{permissions:permission}});
  if(matchedCount || modifiedCount){
   let message = new Artifact.Message(Artifact.Message.SUCCESS, `Permission added to Role: ${roleID}`);
   let artifact = new Artifact('ok', 'role_permissions_add', null, message);
   res.json(artifact);
  }
  
 } catch (error) {
  console.log(error);
  next(error);
 }
}



module.exports.label = 'Add permission to role';