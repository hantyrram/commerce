module.exports = user_read = async (req,res,next)=>{
  let result = await req.app.get('db').collection('users').findOne({username:req.params.username});

  res.json({status:'ok',data:result});
}