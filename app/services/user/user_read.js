/**
 * @type {Types~service}
 * @func user_read
 * @memberof Services
 * @desc Retrieves a single user, with the given username.
 */
module.exports = user_read = async (req,res,next)=>{
  let result = await req.app.get('db').collection('users').findOne({username:req.params.username});

  res.json({status:'ok',data:result});
}