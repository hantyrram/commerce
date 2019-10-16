module.exports = {
   path : 'employees/:employee/useraccount/credential',
   method: 'get',
   resource: 'Employee$UserAccount$Credential',
   op: 'read',
   serviceProvider: 'app/services/employee/useraccount/credential/read',
   description: 'Create Credential For A Given Employee.',
   use: ['schemaValidator'],
   schemaValidator: {
      schema: 'Credential',
      op: 'read'
   }
}