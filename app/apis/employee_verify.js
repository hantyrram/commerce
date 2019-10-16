module.exports = {
   path : 'employees/verify',
   method: 'post',
   resource: 'Employee',
   op: 'exec',
   serviceProvider: 'app/services/employee/verify',
   description: 'Verifies If The Employee Id Exist or Valid' ,
   // use: ['schemaValidator'],
   // schemaValidator: {
   //    schema: 'Role',
   //    op: 'delete'
   // }
}