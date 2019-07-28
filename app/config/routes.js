/**
 * Defines all routes that could serve a request.
 * 
 */

/**
 * @typedef Types~route
 * @property {string} path - The route path.
 * @property {string} method - The Http request method.
 * @property {serviceProvider} - The name of the @see {HT~service} that handles the route.
 * @property {Array} [middlewares] - Array of middlewares to use on the specific route.
 * 
 * Arbitrary properties can be added on each route. E.g. validateSchema may check for validateSchema property for it's config.
 */
//stored on config because this is configuration 
let API_VERSION = require('./').API_VERSION;

const authentication = [
  {
   path:'/authenticate',
   method:'get',
   serviceProvider:'authenticate'
  },
  { 
   path:'/login', method:'post', serviceProvider:'login', middlewares: ['validateSchema'],
   validateSchema: {
    schema: 'Credential'
   }
  },
  {
   path:'/logout',
   method:'get',
   serviceProvider:'logout'
  }
];

const access_control = [
   ...[//credentials
      //view list of all credentials
      {path:'/credentials', method:'get', serviceProvider:'credential_browse' },
      {path:'/credentials/:_id', method:'get', serviceProvider:'credential_browse' },
      //manually create a credential - for superusers, to be able to create username that does not conform to the set format
      {path:'/credentials/create', method:'post', serviceProvider:'credential_create'},
      //update credential's password
      {path:'/credentials/:_id/password', method:'put', serviceProvider:'credential_password_update' },
      //revoke credential
      {path:'/credentials/:_id/revoke', method:'post', serviceProvider:'credential_revoke' },
      //generate a credential
      {path:'/credentials/generate', method:'post', serviceProvider:'credential_generate' },
      
   ],
   ...[//roles
      //view list of all Roles
      {path:'/roles',method:'get',serviceProvider:'role_browse'},
      //create new Role
      { path: '/roles', method: 'post', serviceProvider: 'role_create', middlewares: ['validateSchema'], validateSchema: { schema: 'Role' } },
      //retrieve single Role
      { path: '/roles/:_id', method: 'get', serviceProvider: 'role_read'},
      //update Role - Only the label and description can be modified once it's created
      { path: '/roles/:_id', method: 'put', serviceProvider: 'role_update'},
      //get A Role
      { path: '/roles/:_id', method: 'delete', serviceProvider: 'role_delete'},
      //add Permissions to Role
      {path:'/roles/:_id/permissions',method:'put',serviceProvider:'role_permissions_add'},
      {path:'/roles/:_id/permissions/:permissionName',method:'delete',serviceProvider:'role_permissions_delete'},

   ],
   ...[//permissions
      //view list of all Permissions
      {path:'/permissions',method:'get',serviceProvider:'permission_browse'},
   ]
];

const employee = [
 { path:'/employees', method:'get', serviceProvider:'employee_browse' },
 { path:'/employees/add/auto', method:'post', serviceProvider:'employee_add_eid_auto', middlewares: ['validateSchema'], validateSchema: {
   schema: 'Employee'
  }
 },
 { path:'/employees/add/manual', method:'post', serviceProvider:'employee_add_eid_manual', middlewares: ['validateSchema'], validateSchema: {
   schema: 'Employee',
   skip: ['employeeId']
  }
 },
 {
   path:'/employees', method:'put', serviceProvider:'employee_update', middlewares: ['validateSchema'], 
   validateSchema: {
    schema: 'Employee'
   }
  },
 { path:'/employees/credential/:username/permissions', method:'get', serviceProvider:'employee_credential_permissions_read' },
 { 
  path:'/employees/:empID/roles/add', method:'post', serviceProvider:'employee_roles_add' ,
  middlewares: ['validateSchema'], validateSchema: {
   schema: 'Role'
  }
 },
]

/**
 * Prefixes all paths with the API_VERSION.
 * @param {array} routes Arrays of routes
 * @return {array} all routes
 */
function prefixPath(prefix,...routes){
  let allRoutes = [];
  for(let i=0;i<routes.length;i++){
    allRoutes = allRoutes.concat(routes[i]);
  }
  for(let i=0;i<allRoutes.length;i++){
    allRoutes[i].path =`/${prefix}${allRoutes[i].path}`;
  }
  return allRoutes;
}

let routes = prefixPath(API_VERSION,authentication,access_control,employee);

module.exports = routes;