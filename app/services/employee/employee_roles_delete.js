const path = require('path');

const {dependencies} = require(path.resolve(APP_ROOT,'dependencyManager'));
/**
 * @type {HT~service}
 * @func employee_roles_delete
 * @memberof Services
 * @desc Adds employee a role. Required params = "employeeId", body = An Array of roles.
 * @param {}
 */
module.exports = employee_roles_delete = async (req,res,next)=>{
//requires employeeId from param
 let {db} = dependencies;
 let {employeeId,roleName} = req.params;

 try {
    const FILTER = {
      employeeId
    }
    const UPDATE = {
       $pull : {"roles": roleName}
    }

    const OPTIONS = {
       projection: {
          employeeId: 1,
          roles: 1
       },
       returnOriginal:false // return updated
    }

    let findAndModifyWriteOpResultObject = await db.collection('employees').findOneAndUpdate(FILTER,UPDATE,OPTIONS);

    if(!findAndModifyWriteOpResultObject.value){ //employeeId not found
      res.json(
         new Artifact('nok','employee_roles_delete',{type: 'ENTITY_NOT_EXIST',text:'Invalid Employee Id'})
      );
      return;
    }

   res.json(
      new Artifact('ok','employee_roles_delete',
         {type: 'ENTITY_NOT_EXIST',text:'Invalid Employee Id'},
         {entity: findAndModifyWriteOpResultObject.value}
      )
   );

 } catch (error) {
    console.log('Service@employee_roles_delete: ', error);
 }
 
}

module.exports.label = 'Remove Role from Employee';
