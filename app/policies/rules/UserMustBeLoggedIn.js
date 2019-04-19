
const { Rule } = require('../../../local_modules/authorization');
class UserMustBeLoggedIn extends Rule{
 get condition(){
    return (request)=>{
      //check 
      if(!request.user){
        return false;
      }
      return true;
   }
 }
}

module.exports = UserMustBeLoggedIn;
