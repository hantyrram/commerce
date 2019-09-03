[
   'post:/login | local_modules/authentication/login | auth.login x',
   'get:/logout | local_modules/authenticaition/logout | auth.logout x',
   'get:/authenticate | local_modules/authentication/authenticate | auth.authenticate x',

   'get:/employees | app/services/employees/browse | employee r',
   'post:/employees | app/services/employees/create | employee rw',
   'patch:/employees/:employee | app/services/employees/update | employee rw',
   'put:/employees/:employee/roles | app/services/employees/roles/add | employee.roles rw',
   'delete:/employees/:employee/roles/:role | app/services/employees/roles/del | employee.roles',
   'put:/employees/:employee/credential | app/services/employees/credentials/add | employee.credentials',
   
   'get:/permissions | app/services/permissions/list',

   'get:/roles | app/services/roles/list',
   'post:/roles | app/services/roles/create',
   'get:/roles/:role | app/services/roles/read',
   'delete:/roles/:role | app/services/roles/del',
   'patch:/roles/:role | app/services/roles/update',
   
   'get:/products | app/services/store/products/list',
   'post:/products | app/services/store/products/create',
   'get:/products/:product | app/services/store/products/get',
   'patch:/products/:product | app/services/store/products/update',
   'delete:/products/:product | app/services/store/products/delete',

   'get:/products/attributes | app/services/store/products/attributes/list',
   'post:/products/attributes | app/services/store/products/attributes/create',
   'get:/products/:product/attributes/:attribute | app/services/store/products/attributes/get',
   'patch:/products/:product/attributes/:attribute | app/services/store/products/attributes/update',
   'delete:/products/:product/attributes/:attribute | app/services/store/products/attributes/delete',

   'get:/products/categories | app/services/store/products/categories/list',
   'post:/products/categories | app/services/store/products/categories/create',
   'get:/products/:product/categories/:category | app/services/store/products/categories/get',
   'patch:/products/:product/categories/:category | app/services/store/products/categories/update',
   'delete:/products/:product/categories/:category | app/services/store/products/categories/delete',
]