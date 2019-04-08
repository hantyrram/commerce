

const ObjectID = require('mongodb').ObjectID;
/**
 * @type {HT~service}
 * @module Authentication/login
 * @desc logs in a user.
 */
module.exports = login = async(req,res)=>{
   try {     
    let QUERY = { username:req.body.username, password:req.body.password };

    let OPTIONS = { 
     projection: {
      password: 0
     } 
    };
    
    let user = await req.app.get('db').collection('users').findOne(QUERY,OPTIONS);
    
    if(user){
      delete user["password"]; // redundancy, though password was not included on project.      
      req.login(null,user);
    }else{
      req.login('Invalid Username or Password',null);
    }
   } catch (error) {
     console.log({loginServiceError:error});
   }
}

module.exports.permissionNotRequired = true;