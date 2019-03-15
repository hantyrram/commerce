/**
 * @type {HT~service}
 * @func user_add
 * @memberof Services
 * @desc Adds a new user..
 */
module.exports = user_add = async (req,res)=>{
 let user = req.body;
 //validate user;
 try {
  let result = await req.app.get('db').collection('users').insertOne(user);
  res.json({status:'ok',message:'User Created Successfully', data:{userID: result.insertedId}});
 } catch (error) {
  console.log(error);
  next(error);
 }
}

module.exports.label = 'Add New User';
