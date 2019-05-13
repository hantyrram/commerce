module.exports = user_browse = async (req,res)=>{
 try {
  const MATCH = {$match:{"credential":{$exists:true}}};
  const INCLUDE_WITH_CREDENTIALS = {$project:{"credential":1}};
  const NO_PASSWORD = {$project:{"credential.password":0}};
  
  let employees = await req.app.get('db').collection('employees').aggregate([MATCH,INCLUDE_WITH_CREDENTIALS,NO_PASSWORD]).toArray();  
  let message = new Artifact.Message(Artifact.Message.INFO, 'Users');

  let users = [];
  for(let e of employees){
   users.push({ _id: e._id, ...e.credential });
  }

  let artifact = new Artifact('ok', 'user_browse', { entity: users } , message);
  res.json(artifact);
 } catch (error) {
  console.log(error);
 }

}