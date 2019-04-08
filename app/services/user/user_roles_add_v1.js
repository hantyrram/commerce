const ObjectID = require('mongodb').ObjectID;

/**
 * @type {HT~service}
 * @func user_add_role
 * @memberof Services
 * @desc Adds a new permission.
 */
module.exports = user_roles_add = async (req,res,next)=>{
  try {
    const DB  = req.app.get('db');
    const QUERY = {
     _id: ObjectID(req.body._id)
    }
    let role = await DB.collection('roles').findOne(QUERY);
    if(!role){
     let error = new Artifact.Error('INVALID_ROLE',`Role: ${req.body._id} is not a valid Role!`);
     let artifact = new Artifact('nok','user_roles_add',error);
     res.status(400).json(artifact);
     return;
    }
    const USER_QUERY = {
     _id: ObjectID(req.params.id)
    };
    const UPDATE = {
     $currentDate: {
      lastModified: {
       $type: "timestamp"
      }
     },
     $addToSet: {
      roles : role
     }
    }

    const OPTIONS = {
     projection: {
      password: 0
     }
    }

    let findAndModifyWriteOpResultObject = await DB.collection('users').findOneAndUpdate(USER_QUERY,UPDATE,OPTIONS);
    let updatedUser = findAndModifyWriteOpResultObject.value;
    let message = new Artifact.Message(Artifact.Message.SUCCESS,`Role: "${role.name}" assigned to  ${updatedUser.username}!`);
    let artifact = new Artifact('ok','user_roles_add',{ entity: updatedUser },message);
    res.status(200).json(artifact);
  } catch (error) {
    next(error);
  }
}
 
 module.exports.label = 'Add Role To User';
 