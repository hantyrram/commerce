module.exports = {
   path : 'employees/:employee/useraccount/credential',
   method: 'get',
   resource: 'employee_useraccount_credential',
   op: 'read',
   serviceProvider: 'app/services/employee/useraccount/credential_read',
   description: 'Create Credential For A Given Employee.',
   use: ['schemaValidator'],
   schemaValidator: {
      schema: 'Credential',
      op: 'read'
   }
}