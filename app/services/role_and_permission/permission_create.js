/**
 * @type {HT~service}
 * @func permission_create
 * @memberof Services
 * @desc Creates a New Permission
 * @param {}
 */
module.exports = permission_create = async (req,res,next)=>{
 //Adds Permission to God Role
 try {
  let {name,label} = req.body;
  let QUERY = {
   name: '_GOD_',
  }

  let UPDATE = {
   $addToSet: {
    permissions: {
     name
    }    
   },
   $currentDate: {
    modifiedOn: {$type:'timestamp'}
   },
   $set: {
    lastModComment: `Added ${name} Permission`,
    lattModBy: req.user.username,
    "permissions.$[element].label" : label,
   }
  }

  let OPTIONS = {
   arrayFilters: [{ "element.name": {$eq: name} } ]
  }
 
  
  let result = await req.app.get('db').collection('roles').updateOne(QUERY,UPDATE,OPTIONS);
  
  let message = new Artifact.Message(Artifact.Message.SUCCESS, 'Permission Created!');
  let artifact = new Artifact('ok', 'permission_create', null, message);
  res.json(artifact);
 } catch (error) {
  console.log(error);
  next(error);
 }
}

//add role to the system,
//a role may be assigned to a user a role must exist before it can be assigned to a user.

module.exports.label = 'Create New Role';