const ObjectID = require('mongodb').ObjectID;
/**
 * @type {HT~service}
 * @func user_update
 * @memberof Services
 * @desc Updates a user.
 */
module.exports = user_update = (req,res,next)=>{
  console.log(req.body);
  console.log(req.params.userID);
  let findAndModifyCallback = function(error,result){
    
    res.json({status:'ok',data:{value:result.value,lastErrorObject:result.lastErrorObject,ok:result.ok}}); 
  }
  
  req.app.get('db').collection('users').findOneAndUpdate(
    {_id:ObjectID(req.params.userID)},
    {$set: req.body},
    findAndModifyCallback
  );
}