
module.exports = permission_add = async (req,res,next)=>{
  let col = req.app.get('db').collection('permissions');
  try {
    //ops is array of objects inserted with ._id set
    let initialDate = new Date();
    let entity = Object.assign(req.body,{createdBy:req.user.username,createdOn:initialDate,modifiedOn:initialDate});
    let {ops} = await col.insertOne(entity);
    const permission = ops[0];

    let artifact = new Artifact(
     Artifact.OK,
     'permission_add',
     new Artifact.Message(Message.SUCCESS,'Added Successfully'),
     {permission: permission}
    );
    res.status(201).json(artifact);

  } catch (error) {
    if(error.code === 11000){//UniqueIndexViolation
      //find the field that violates the index
      let violatedField = error.errmsg.match(/\$[a-zA-Z]+/)[0].replace("$","");//e.g $label_1
      let error = {type:'DUPLICATE_KEY_VIOLATION',message:`Permission ${violatedField} already Exist!`}
      next(error);
      return;
    }
    console.log(error);
    next({error:'Server Error'})
  }
}

module.exports.label = 'Add New Permission';