
module.exports = role_add = async (req,res,next)=>{

  let role = {name,description,permissions} = req.body;
  try {
    let roles = req.app.get('db').collection('roles');
    let roleAlreadyExist = await roles.findOne({name:name});
    if(roleAlreadyExist){
      next({status:'nok',type:'DUPLICATE_VIOLATION_ERROR',errMsg:'Role not added, role already exist!'});    
      return;
    }
    let result = await req.app.get('db').collection('roles').insertOne(role);
    res.status(200).json({status:'ok',data:{roleID:result.insertedId}, links:{href:`${req.path}/${req.params.name}`}});  
  } catch (error) {
    error.service = 'role_add';
    next(error);
  }
}

module.exports.label = 'Add New Role';