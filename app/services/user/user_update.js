const ObjectID = require('mongodb').ObjectID;
/**
 * @type {HT~service}
 * @func user_update
 * @memberof Services
 * @desc Updates a user.
 */
module.exports = user_update = (req,res,next)=>{
 
  let findAndModifyCallback = function(error,result){
     
    res.json({status:'ok',data:{value:result.value,lastErrorObject:result.lastErrorObject,ok:result.ok}}); 
  }

  let filter = {
   _id:ObjectID(req.params.id)
  };

  let update = {
   $currentDate : {
    lastModified: { $type: "timestamp" }
   },
   $set: {
    password: req.body.password,
    email: req.body.email,
    updatedOn : Date.now(),
    updatedBy : req.user.username
   }
  }

  req.app.get('db').collection('users').findOneAndUpdate(filter,update,findAndModifyCallback);
  
}