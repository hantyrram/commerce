/**
 * @type {typedefs~service}
 * @func role_create
 * @memberof Services
 * @desc Revokes a Credential.
 * @param {}
 */
module.exports = role_create = async (req,res,next)=>{
 
 try {
  let {name,label} = req.body;
  let UPDATE = {
   $set: {
    name,
    label,
    createdBy: req.user.credential.username
   },
   $currentDate: {
    createdOn: { $type: "timestamp" }
   },
  }
  let OPTIONS = {
   upsert: true
  }

  let {matchedCount,upsertedId} = await req.app.get('db').collection('roles').updateOne({name},UPDATE,OPTIONS);
  if(matchedCount > 0){
   let err = new Artifact.Error('DUPLICATE_KEY_VIOLATION','Role already exist');
   let errArtifact = new Artifact('nok','role_create',err);
   res.status(400).json(errArtifact);
   return;
  }

  //upsertedId is an object index, _id 
  let message = new Artifact.Message(Artifact.Message.SUCCESS, 'Role Created!');
  let entity = { _id: upsertedId._id, name, label};
  
  let artifact = new Artifact('ok', 'role_create', {data: { entity, href:`/roles/${entity._id}` } }, message);
  res.json(artifact);
 } catch (error) {
  console.log(error);
  next(error);
 }
}

//add role to the system,
//a role may be assigned to a user a role must exist before it can be assigned to a user.

module.exports.label = 'Create New Role';