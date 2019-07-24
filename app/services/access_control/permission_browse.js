/**
 * @type {typedefs~service}
 * @func permission_browse
 * @memberof Services
 * @desc Creates a New Permission. Assigns the permission to _GOD_ role. No need for permissions collection.
 * _GOD_ role MUST be an unassignable role.
 * @param {}
 */
module.exports = permission_browse = async (req,res,next)=>{
   try {
      const entity = getServices().map(s=>{
      return { name: s.name, label:s.label }; 
   })

      let message = new Artifact.Message(Artifact.Message.SUCCESS, 'Permissions');
      let artifact = new Artifact('ok', 'permission_browse', {data: {entity} }, message);
      res.json(artifact);
   } catch (error) {
      console.log(error);
      next(error);
   }
}

//add role to the system,
//a role may be assigned to a user a role must exist before it can be assigned to a user.
module.exports.label = 'Fetch Permissions';

module.exports.description = 'Retrieves all Permissions';

module.exports.devDescription = `Retrieves all Permissions and sets the Artifact's data.entity property to the 
   array of permissions.
`