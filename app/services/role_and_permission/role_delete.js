const {dependencies} = require(`${APP_ROOT}/dependencyManager`);
const ObjectID = require('mongodb').ObjectID;
/**
 * @type {typedefs~service}
 * @func role_create
 * @memberof Services
 * @desc Revokes a Credential.
 * @param {}
 */
module.exports = role_delete = async (req,res,next)=>{
   const {db} = dependencies;
   
   try {
    let _id = req.params._id;
    let FILTER = {
       _id : ObjectID(_id)
    }
   
    let {deletedCount,result} = await db.collection('roles').deleteOne(FILTER);

    console.log(result);
    console.log(deletedCount);
     
    let message = new Artifact.Message(Artifact.Message.SUCCESS, 'Role Deleted!');
    let artifact = new Artifact('ok', 'role_delete', null, message);
    res.json(artifact);
   } catch (error) {
    console.log(error);
    next(error);
   }
  }
  
  //add role to the system,
  //a role may be assigned to a user a role must exist before it can be assigned to a user.
  
  module.exports.label = 'Delete Role';