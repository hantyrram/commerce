/**
 *@type {typedefs~service}
 *@desc Authenticates the user.
 */
module.exports = authenticate = (req,res,next)=>{
  res.status(200).json({status:'ok',source:'authenticate',message:'Authentication Success!',data:{user:req.user}});
}

module.exports.permissionIsRequired = false;