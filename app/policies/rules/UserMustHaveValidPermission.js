

class UserMustHaveValidPermission extends global.Rule{
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
