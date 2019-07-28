const {dependencies} = require(`${APP_ROOT}/dependencyManager`);
const ObjectId = require('mongodb').ObjectId;
/**
 * @type {typedefs~service}
 * @func role_read
 * @memberof Services
 * @desc Revokes a Credential.
 * @param {}
 */
module.exports = role_read = async (req,res,next)=>{
   const { db } = dependencies;
   try {
      let id = req.params.id;
      let source = 'role_read';
      
      console.log(req.referer);
      if(req.referer){
         id = req.referer.params.id;
         source = req.referer.name || '';
      }
      let result = await db.collection('roles').findOne({_id: ObjectId(id)});

      if(result){
         let artifact = new Artifact('ok', source ,null,{ entity:result, href:`/roles/${result._id}` });
         res.json(artifact);
         return;
      }
      
      let err = new Artifact('ok',source,{type: 'NOT_FOUND',text:'Role not found!'},null);

      if(req.referer.errHandler){
         req.referer.errHandler(err);
         return;
      }
      res.json(err);
      
   } catch (error) {
      console.log(error);
   }
  }
  
  //add role to the system,
  //a role may be assigned to a user a role must exist before it can be assigned to a user.
  
  module.exports.label = 'Create New Role';