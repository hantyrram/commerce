
module.exports = role_read = async (req,res,next)=>{
  try {
    let result = await req.app.get('db').collection('roles').findOne({name:req.params.name});
    res.status(200).json({status:'ok',data:result,href:`${req.path}/${req.body.name}`});  
  } catch (error) {
    error.service = 'role_read';
    next(error);
  }
}