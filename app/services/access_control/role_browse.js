const {dependencies} = require(`${APP_ROOT}/dependencyManager`);

module.exports = role_browse = async (req,res,next)=>{
 const {db} = dependencies;
  try {
    
    // let roles = await req.app.get('db').collection('roles').find({}).toArray();
    let roles = await db.collection('roles').find({}).toArray();
    const data = { entity:roles }
    const artifact = new Artifact('ok','role_browse',null, data );
    res.json(artifact);
  } catch (error) {
    console.log(error);
  }
}

module.exports.label = 'Fetch Roles';

module.exports.description = 'Retrieves All Roles';