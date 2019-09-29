module.exports = {
   path : 'employees/:employee/useraccount/credential/password',
   method: 'patch',
   resource: 'employee_credential_password',
   op: 'edit',
   serviceProvider: 'app/services/employee/useraccount/credential_password_edit',
   description: 'Create Credential For A Given Employee.',
   use: ['schemaValidator'],
   schemaValidator: {
      schema: 'Password',
      op: 'edit'
   }
}