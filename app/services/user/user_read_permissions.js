module.exports = user_read_permissions = async (req,res,next)=>{
  //get the username
  try {
    let user = await req.app.get('db').collection('users').findOne({username:req.params.username},{projection:{'roles':1}});
    let userRoles = await req.app.get('db').collection('roles').find({name:{$in:user.roles}},{projection:{'permissions':1}}).toArray();
    let userPermissions = [];
    userRoles.forEach(role=>{
      userPermissions = userPermissions.concat(role.permissions);
    });
    res.json({status:'ok',source:'user_read_permissions',data:{permissions:userPermissions}});
  } catch (error) {
    console.log(error);
  }
}