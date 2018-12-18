module.exports = permission_browse = async (req,res,next)=>{
  try {
    let permissions = await req.app.get('db').collection('permissions').find({}).toArray();
  
    res.json({status:'ok',source:'permission_browse',data:{permissions:permissions}});
  } catch (error) {
    console.log(error);
  }
}