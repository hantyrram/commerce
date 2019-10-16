module.exports = {
   path : 'employees/:employee/useraccount/credential',
   method: 'post',
   resource: 'Employee$UserAccount$Credential',
   op: 'create',
   serviceProvider: 'app/services/employee/useraccount/credential/create',
   description: 'Create Credential For A Given Employee.',
   use: ['schemaValidator'],
   schemaValidator: {
      schema: 'Credential',
      op: 'create'
   }
}