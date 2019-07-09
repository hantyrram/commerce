const {dependencies} = require(`${APP_ROOT}/dependencyManager`);
const routes = require(`${APP_ROOT}/config/routes`);

/**
 * @namespace Services
 * @func
 * @type {Service}
 * @param {Object} req
 * @param {Object} res 
 * @property {Boolean} permissionIsRequired= Must explicitly set to false
 */
module.exports = request_user_features = async (req,res)=>{
 const {db} = dependencies;
 try {
  console.log(req.user.roles);
  let artifact = new Artifact('ok', 'request_user_features', { entity: req.user.roles } , {});
  res.json(artifact);
 } catch (error) {
  console.log(error);
 }

 // [
 //  { feature: 'products', permissions: [
 //   {
 //    browse:true,
 //    read:true,
 //    edit:true,
 //    add:true,
 //    delete:true
 //   }],
 //   feature: 'roles', permissions: [
 //    {
 //     browse:true,
 //     read:true,
 //     edit:true,
 //     add:true,
 //     delete:true,
 //     permission_delete:true
 //    }
 //   ]
 //  }

 //  getUserFeatures -> 

  
 // ]
}

module.exports.permissionIsRequired = false;