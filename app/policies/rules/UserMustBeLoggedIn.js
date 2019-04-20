
const { Rule } = require('../../../local_modules/authorization');

/**
 * 
 * Checks that the user is authenticated.
 * @memberof rules
 * @extends Rule
 */
class UserMustBeLoggedIn extends Rule{
 get condition(){
    return (request)=>{
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
