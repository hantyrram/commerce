module.exports = role_browse = async (req,res,next)=>{
  try {
    let roles = await req.app.get('db').collection('roles').find({}).toArray();
   console.log(roles);
    res.json({status:'ok',source:'role_browse',entity: roles });
  } catch (error) {
    console.log(error);
  }
}