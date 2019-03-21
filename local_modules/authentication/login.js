

const ObjectID = require('mongodb').ObjectID;
/**
 * @type {HT~service}
 * @module Authentication/login
 * @desc logs in a user.
 */
module.exports = login = async(req,res)=>{
  console.log({body:req.body});
   try {     
    let query = { username:req.body.username,password:req.body.password };
    let project = { _id:1, username:1, roles:1 };
    let user = await req.app.get('db').collection('users').findOne(query,project);
    if(user){
      delete [user.password]; //just to be sure      
      req.login(null,user);
    }else{
      req.login('Invalid Username or Password',null);
    }
   } catch (error) {
     console.log({loginServiceError:error});
   }
}

module.exports.permissionNotRequired = true;