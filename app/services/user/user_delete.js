const ObjectID = require('mongodb').ObjectID;
/**
 * @type {HT~service}
 * @func user_delete
 * @memberof Services
 * @desc Adds a new user..
 */
module.exports = user_delete = async (req,res,next)=>{
 //validate user;
 try {
  let deleteWriteOpResult = await req.app.get('db').collection('users').deleteOne({_id : req.params.id});
  console.log(deleteWriteOpResult.result);
  let message = new Artifact.Message(Artifact.Message.SUCCESS,`${req.params.username} deleted!`);
   let artifact = new Artifact('ok','user_delete',null,message);
   res.json(artifact);
 } catch (error) {
  next({status:'nok',type:'DB_ERROR',message: error.message});
 }
}

module.exports.label = 'Deletes the user';
