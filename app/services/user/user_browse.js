/**
 * @type {HT~service}
 * @func user_browse
 * @memberof Services
 * @desc Retrieves users.
 */
module.exports = user_browse = async (req,res)=>{
   await req.app.get('db').collection('users').find({}).project({'username':1}).toArray(function(error,documents){
    if(error){
      next(error);
      return;
    }
    res.status(200).json({status:'ok',data:{data:documents}});
   });
}

module.exports.label = 'View Users';