

class UserMustBeLoggedIn extends global.Rule{
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
