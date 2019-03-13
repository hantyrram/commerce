/**
 *@desc A @see{Types~service} that authenticates a request. Basically provides a simple check if the client user is already authenticated.
 */
module.exports = authenticate = (req,res,next)=>{
  res.status(200).json({status:'ok',source:'authenticate',message:'Authentication Success!',data:{user:req.user}});
}