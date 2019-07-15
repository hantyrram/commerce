const {dependencies} = require(`${APP_ROOT}/dependencyManager`);

module.exports = role_browse = async (req,res,next)=>{
 const {db} = dependencies;
  try {
    
    // let roles = await req.app.get('db').collection('roles').find({}).toArray();
    let roles = await db.collection('roles').find({}).toArray();
    res.json({status:'ok',source:'role_browse',entity: roles });
  } catch (error) {
    console.log(error);
  }
}

module.exports.label = 'Fetch Roles';

module.exports.description = 'Retrieves All Roles';