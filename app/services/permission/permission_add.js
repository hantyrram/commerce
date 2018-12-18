
module.exports = permission_add = async (req,res,next)=>{
  let col = req.app.get('db').collection('permissions');
  try {
    //ops is array of objects inserted with ._id set
    let {ops} = await col.insertOne(req.body); 
    const permission = ops[0];
    console.log(ops);
    // const permission = {
    //   id: ops[0]._id,
    //   name: ops[0].name,
    //   label:ops[0].label
    // }
    res.status(201).json({status:'ok',source:'permission_add',data:{permission:permission}});
  } catch (error) {
    if(error.code === 11000){//UniqueIndexViolation
      //find the field that violates the index
      let violatedField = error.errmsg.match(/\$[a-zA-Z]+/)[0].replace("$","");//e.g $label_1
      let error = {type:'DUPLICATE_KEY_VIOLATION',message:`Permission ${violatedField} already Exist!`}
      next(error);
      return;
    }
    next({error:'Server Error'})
  }
}

module.exports.label = 'Add New Permission';