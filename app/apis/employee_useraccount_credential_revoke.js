module.exports = {
   path : 'employees/:employee/useraccount/credential/revoke',
   method: 'patch',
   resource: 'employee_credential',
   op: 'edit',
   serviceProvider: 'app/services/employee/useraccount/credential_revoke',
   description: 'Revokes employee credential',
}