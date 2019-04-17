/**
 * Returns the list of all permission names which has one one mapping to service names.
 */
module.exports = permission_browse = (req,res,next)=>{
 let permissions = getServices().map(s=>{
  return s.label? {name:s.name,label:s.label}: {name:s.name,label:s.name};
 });
 res.status(200).json({status:'ok',data:{permissions:permissions}})
}

module.exports.label = 'View All Permissions';