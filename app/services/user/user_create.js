
/**
 * @type {HT~service}
 * @func user_create
 * @memberof Services
 * @desc Adds a new user..
 */
module.exports = user_create = async (req,res,next)=>{

 try {
  let user = req.body;
  let QUERY = { username: user.username };
  let UPDATE = {
   $setOnInsert: {
    ...user,
    createdBy: req.user.username,
    createdOn: Date.now()
   }
  }
  let OPTIONS = {
   upsert: true
  }

  let result = await req.app.get('db').collection('users').updateOne(QUERY,UPDATE,OPTIONS);
  let { matchedCount } = result;
  if(matchedCount > 0){ // username is already on db
   let error = new Artifact.Error('DUPLICATE_KEY_VIOLATION','Username already exist!');
   let errorArtifact = new Artifact('nok', 'user_create', error);
   next(errorArtifact);
   return;
  }

  let data = {
   entity: {
    _id: result.upsertedId._id, 
    username: user.username
   }
  };
  let message = new Artifact.Message(Artifact.Message.SUCCESS, 'User Created Successfully!');
  let artifact = new Artifact('ok', 'user_create', data, message);
  res.json(artifact);
 } catch (error) {
  console.log(error);
  next(error);
 }
}

module.exports.label = 'Create New User';
