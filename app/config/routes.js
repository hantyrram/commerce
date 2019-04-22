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

const employee = [
 { path:'/employees', method:'get', serviceProvider:'employee_browse' },
 {
  path:'/employees', method:'post', serviceProvider:'employee_add', middlewares: ['validateSchema'], 
  validateSchema: {
   schema: 'Employee'
  }
 },
 { path:'/employees/:empID/credential/generate', method:'post', serviceProvider:'employee_credential_generate' },
 { 
  path:'/credential/password', method:'put', serviceProvider:'credential_password_update' ,
  middlewares: ['validateSchema'], validateSchema: {
   schema: 'Credential'
  }
 },
 { path:'/employees/:empID/credential/revoke', method:'patch', serviceProvider:'credential_revoke' },
 { 
  path:'/employees/:empID/roles/add', method:'post', serviceProvider:'employee_roles_add' ,
  middlewares: ['validateSchema'], validateSchema: {
   schema: 'Role'
  }
 },
]

const user = [
 {
  path:'/users',
  method:'get',
  serviceProvider:'user_browse'
 },
 { 
  path:'/users/:id', 
  method:'get', 
  serviceProvider:'user_read' 
 },
 { 
  path:'/users/:id', 
  method:'put', 
  serviceProvider:'user_update', 
  middlewares: ['validateSchema'], 
  validateSchema: {
   schema: 'User'
  }
 },
 {
  path:'/users',
  method:'post',
  serviceProvider:'user_create',
  middlewares: ['validateSchema'], 
  validateSchema: {
   schema: 'User'
  }
 },
 {
  path:'/users/:id',
  method:'delete',
  serviceProvider:'user_delete'
 },
 {
  path:'/users/:id/roles', 
  method:'get',
  serviceProvider:'user_roles_browse'
 },
 {
  path:'/users/:id/roles',
  method:'post',
  serviceProvider:'user_roles_add',
  middlewares: ['validateSchema'],
  validateSchema: {
   schema: 'Role',
   requireId: true,
   generateEntity: true
  }
 },
 {
  path:'/users/:id/roles/:id',
  method:'delete',
  serviceProvider:'user_roles_delete'
 },
 {
  path:'/users/:id/permissions',
  method:'get',
  serviceProvider:'user_read_permissions'
 },
];

const role_and_permission = [
 { path: '/roles', method: 'post', serviceProvider: 'role_create', middlewares: ['validateSchema'], validateSchema: { schema: 'Role' } },
 { path: '/permissions', method: 'post', serviceProvider: 'permission_create', middlewares: ['validateSchema'], validateSchema: { schema: 'Permission' } },
 {
  path:'/roles',method:'get',serviceProvider:'role_browse'
 },
 {
  path:'/roles/:name',method:'get',serviceProvider:'role_read'
 },
 {
  path:'/roles/:name/edit',method:'post',serviceProvider:'role_edit'
 },
 {
  path:'/roles/:name/delete',method:'post',serviceProvider:'role_delete'
 },
 {
  path:'/roles/:name/permissions',method:'get',serviceProvider:'role_permissions_browse'
 },
 {
  path:'/roles/:name/permissions',method:'post',serviceProvider:'role_permissions_add'
 },
 {
  path:'/roles/:name/permissions/:permissionname',method:'delete',serviceProvider:'role_permissions_delete'
 },
]


const test = [
  {path:'/test/test',method:'get',serviceProvider:'test'}
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

let routes = prefixPath(API_VERSION,authentication,employee,user,role_and_permission,test);

module.exports = routes;