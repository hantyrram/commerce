module.exports = {
   path : 'employees/:employee/useraccount/credential/password',
   method: 'patch',
   resource: 'Employee$UserAccount$Credential$Password',
   op: 'edit',
   serviceProvider: 'app/services/employee/useraccount/credential/password/change',
   description: 'Create Credential For A Given Employee.',
   use: ['schemaValidator'],
   schemaValidator: {
      schema: 'Password',
      op: 'edit'
   }
}