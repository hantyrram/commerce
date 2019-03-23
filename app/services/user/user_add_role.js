const ObjectID = require('mongodb').ObjectID;

/**
 * @type {HT~service}
 * @func user_add_role
 * @memberof Services
 * @desc Adds a new permission.
 */
module.exports = user_add_role = async (req,res,next)=>{
  let {name} = req.body;
  if(!name){
    res.status(200).json({status:'nok',message:'A role must have a name!'});//put this kind on validation error handler
  }
  try {
    let db  = req.app.get('db');
    let roles = await db.collection('roles').find({}).toArray();
    let role = roles.find(function(role){
      return role.name === name;
    });
    //check if role does not yet exist,
    //check if userID param exist
    if(role){//a valid role
      let userCollection = db.collection('users');
      let userRoles = await userCollection.findOne({_id:ObjectID(req.param.userID)},{projection:{roles:1}});
      
      if(userRoles){// a valid role
        
        let userHasTheRole = userRoles.find((r)=>{
          r.name === name;
        });
        if(userHasTheRole){
          res.status(200).json({status:'nok',message:'Role is already assigned to the user!'});
          return;
        }
        userCollection.findOneAndUpdate({_id:ObjectID(req.params.userID)},{$push:{roles:{name,description}}});  
        return;
      }
      //
      let findAndModifyCallback = (error,result)=>{
        res.json({result});
      }  
      console.log(req.params.userID);
      await userCollection.findOneAndUpdate(
        {_id:ObjectID(req.params.userID)},
        {$set:{roles:[{name,description}]}},
        findAndModifyCallback
      );
      
    }

  } catch (error) {
    next(error);
  }
}
 
 module.exports.label = 'Add Role To User';
 