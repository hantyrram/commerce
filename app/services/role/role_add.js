
module.exports = role_add = async (req,res,next)=>{

 try {
  let role = req.body;
  let QUERY = { username: "genesis" };
  let UPDATE = {
   $addToSet: {
    roles : { ...role, createdOn: Date.now(), createdBy: req.user.username }
   },
   $currentDate: {
    updatedOn: { $type: "timestamp" }
   }
  }

  let result = await req.app.get('db').collection('users').updateOne(QUERY,UPDATE);
  console.log(result);
  let message = new Artifact.Message(Artifact.Message.SUCCESS, 'Role Added!');
  let artifact = new Artifact('ok', 'user_create', null, message);
  res.json(artifact);
 } catch (error) {
  console.log(error);
  next(error);
 }
}

//add role to the system,
//a role may be assigned to a user a role must exist before it can be assigned to a user.

module.exports.label = 'Add New Role';