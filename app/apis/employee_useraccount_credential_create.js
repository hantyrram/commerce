module.exports = {
   path : 'employees/:employee/useraccount/credential',
   method: 'post',
   resource: 'employee_useraccount_credential',
   op: 'create',
   serviceProvider: 'app/services/employee/useraccount/credential_create',
   description: 'Create Credential For A Given Employee.',
   use: ['schemaValidator'],
   schemaValidator: {
      schema: 'Credential',
      op: 'create'
   }
}