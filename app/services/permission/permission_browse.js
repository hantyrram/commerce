/**
 * @func permission_browse
 * @memberof Services
 * @desc Retrieves permissions.
 */
module.exports = permission_browse = async (req,res,next)=>{
  console.log(res.Artifact);
  try {
    let permissions = await req.app.get('db').collection('permissions').find({}).toArray();
    // res.json({status:'ok',source:'permission_browse',data:{entities:permissions}});
    res.status(200).json(new res.Artifact('ok','permission_browse',{entities:permissions}));
  } catch (error) {
    console.log(error);
  }
}