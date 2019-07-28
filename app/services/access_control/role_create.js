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

  
  const referer = {
      params : {
         id : upsertedId._id
      },
      name: 'role_create',

      errHandler : (err)=>{console.log(err)}
   }

  forwardRequest(req,next,referer,'role_read');
  
 } catch (error) {
  console.log(error);
  next(error);
 }
}

//add role to the system,
//a role may be assigned to a user a role must exist before it can be assigned to a user.

module.exports.label = 'Create New Role';