
const { Rule } = require('../../../local_modules/authorization');

/**
 * This Rule checks if the current logged in user has a valid permission to access a service.
 * The condition checks if the "permissionRequired" property is not set on the currentAccessedService OR if 
 * it has a truthy value,then it is assumed that the permission is required, permission name maps to service 
 * name so this Rule checks if the user has permission with name equals to the currentAccessedService's name.
 * 
 * 
 */
class UserMustHaveValidPermission extends Rule{
  get condition(){
     return (request)=>{
       //check 
       if(!request.user){
         return false;
       }

       let permissionIsRequired = request.currentAccessedService.permissionRequired === undefined || request.currentAccessedService.permissionRequired; 
       if(request.user.deserializedUserRoles && request.user.deserializedUserRoles.length > 0){
        //get each permission 
        let userHasPermissionRequired = request.user.permissions.find((permission)=>{
         return request.currentAccessedService.name === permission.name;
        });
        //permissionIsRequire if the service's does not have the permissionRequired property or , the property has a truthy value;
        
        console.log('@UserMustHaveValidPermission',{permissionIsRequired});
        if(permissionIsRequired && !userHasPermissionRequired){
         return false;
        }

        if(permissionIsRequired && userHasPermissionRequired){
         return true;
        }

        if(!permissionIsRequired){
         return true;         
        }

       } 
       return false;
    }
  }
}

module.exports = UserMustHaveValidPermission;
