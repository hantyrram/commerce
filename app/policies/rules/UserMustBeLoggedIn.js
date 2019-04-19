
const { Rule } = require('../../../local_modules/authorization');
class UserMustBeLoggedIn extends Rule{
 get condition(){
    return (request)=>{
      console.log(request.currentAccessedService);
      
      if( request.currentAccessedService.permissionIsRequired !== false ){
       if(!request.user){
        return false;
       }
      }
      return true;
   }
 }
}

module.exports = UserMustBeLoggedIn;
