
module.exports = permission_delete = async (req,res,next)=>{
  let col = req.app.get('db').collection('permissions');
    try {
    //ops is array of objects inserted with ._id set
      let permissionName = req.params.name;
      let {result} = await col.deleteOne({name:permissionName}); 
      if(result.ok === 1 && result.n > 0){
        res.status(200).json({status:'ok',source:'permission_delete',message:`${permissionName} has been deleted!`});
      }else{
        next({status:'nok',type:'DELETE_OP_ERROR',errMsg:`There was a problem deleting the ${permission.name} permission`});
      }
    } catch (error) {
     next(error);
      return;
    }
  
  }

module.exports.label = 'Delete A Permission';