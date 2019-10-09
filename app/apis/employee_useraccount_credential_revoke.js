module.exports = {
   path : 'employees/:employee/useraccount/credential/revoke',
   method: 'patch',
   resource: 'employee_userAccount_credential',
   op: 'revoke',
   serviceProvider: 'app/services/employee/useraccount/credential/revoke',
   description: 'Revokes employee credential',
}