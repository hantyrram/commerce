/**
 * @type {HT~service}
 * @func user_create
 * @memberof Services
 * @desc Adds a new user..
 */
module.exports = user_create = async (req,res)=>{
 let user = req.body;
 //validate user;
 try {
  let result = await req.app.get('db').collection('users').insertOne(user);
  let message = new Artifact.ArtifactMessage(Artifact.ArtifactMessage.SUCCESS,'User Created Successfully!');
  let data = {entity: {_id: result.insertedId, username: user.username}};
  let artifact = new Artifact('ok','user_create',data,message);
  res.json(artifact);
 } catch (error) {
  console.log(error);
  next(error);
 }
}

module.exports.label = 'Create New User';
