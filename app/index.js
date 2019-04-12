require('dotenv').config();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cookieParser = require('cookie-parser');
const express = require('express');
const server = express();
const config = require('./config');
const sessionOnRedis = require('../local_modules/session-on-redis');
const authentication = require('../local_modules/authentication');
//Policy Based Authorization
const authorization = require('../local_modules/authorization');
const helpers = require('./helpers');
global.Artifact = require('./Artifact');
global.Rule = require('../local_modules/authorization').Rule;
global.Policy = require('../local_modules/authorization').Policy;
global.PolicyViolation = require('../local_modules/authorization').PolicyViolation;

for(let helper of Object.getOwnPropertyNames(helpers)){
 global[helper] = helpers[helper];
}

let serverStarted = false;
/**
 * @type {Object} 
 * @desc Mongo DB database
 */
let db;

/**
 * @returns {Array} - The array of middlewares as defined on the middlewares config.
 */
 global.getMiddlewares = ()=>{
  return config.middlewares.map((middleware)=>{
    return require(path.resolve(process.cwd()+middleware));
  })
}

/**
 * @global
 * @param {string} name of the middleware.
 * @return {function} the middleware with the given name.
 */
global.getMiddleware = (name)=>{
  
  return getMiddlewares().find(middleware=>{
    return middleware.name === name;
  })
}

/**
 * @global
 * @returns {Array} - The array of services as defined on the services config
 */
global.getServices = () => {
  return config.services.map((pathToService)=>{
    return require(path.resolve(process.cwd() + pathToService));
  })
}

/**
 * @returns {Array} - The array of routes as defined on the routes config
 */
global.getRoutes = ()=>{
 return config.routes;
}

global.errorsHandlers = ()=>{
  return config.errorHandlers.map(handler=>{
   return require('./error_handlers/' + handler);
  });
}
/**
 * Loads the route definitions on the express app, using the serviceProvider as responder.
 * Loads the middlewares specific to the routes as well.
 * If a route does not have the 'method' key, default value is 'get'.
 * @param {object} app - The express app
 * @param {Array} routes - Array of routes
 * @param {Array} services - Array of services
 */
const init = (app)=>{
 
 app.use(express.static(process.cwd()+'/tempimages'));//just to serve the favicon temporarily
 
 app.use(express.json());
 app.use(cookieParser());
 app.use(sessionOnRedis());

 authentication.serializeUser(function(user,done){
  done(user._id);//save the _id only to the session
 });
 authentication.deserializeUser(function(id,done){
  app.get('db').collection('employees').findOne(ObjectID(id),function(err,employee){
    let user = {};
    user._id = employee._id;
    user.username = employee.credential.username;
    //save only the id,username on the req.object
    done(user);
  });
 });

 //deserializes the roles,of the currently logged in user, pass the array of roles to done callback
 //done([{name:'admin',label:'Admin',permissions:[...]},...])
//  authorization.deserializeUserRoles(function(currentLoggedInUser,done){
//   if(currentLoggedInUser.roles !== undefined && currentLoggedInUser.roles.length !== 0){
//    //query roles with role names = the current user's roles e.g. ['admin','product_manager']
//    app.get('db').collection('roles')
//    .find({$or: currentLoggedInUser.roles.map(roleName=>{name:roleName})})
//    .toArray(function(error,documents){
//     done(documents);
//    });
//   }
//  });
 //end authorization 
 app.use(getMiddleware('handleNonXHR'));
 app.use(getMiddleware('attachArtifactToResponse'))
 app.use(getMiddleware('attachCurrentServiceToReq'));
 
 app.use(authentication.init({ Artifact: global.Artifact, loginURL:`/${config.API_VERSION}/login` })); 
 // let attachCurrentServiceToReq = require('./middlewares/attachCurrentServiceToReq');
 // app.use(attachCurrentServiceToReq);
  
 const DEFAULT_REQUEST_METHOD = 'get';

 let routes = getRoutes();
 for(let i = 0; i < routes.length; i++){
  let route = routes[i];
  let serviceProvider = getServices().find(service=>route.serviceProvider === service.name);
  if(serviceProvider){  //only define routes that has an existing service provider
   //get middlewares
   let routeSpecificMiddlewares;
   if(route.middlewares && route.middlewares.length > 0){

    //get middlewares that are defined on each route if there is any.
    let middlewaresDefinedOnRoute = middleware => route.middlewares.includes(middleware.name);
    //Reducer that'll sort the filtered routes based on how the route.middlewares are defined.Since sequence is important.
    let sortBasedOnRouteMiddlewaresDefinition = (acc,middleware) => {
     acc[route.middlewares.indexOf(middleware.name)] = middleware;
     return acc;
    };

    routeSpecificMiddlewares = getMiddlewares().filter(middlewaresDefinedOnRoute);
    routeSpecificMiddlewares = routeSpecificMiddlewares.length > 0 ? routeSpecificMiddlewares.reduce(sortBasedOnRouteMiddlewaresDefinition) : routeSpecificMiddlewares;

   }
   if(routeSpecificMiddlewares){
    app[route.method || DEFAULT_REQUEST_METHOD](route.path,routeSpecificMiddlewares,serviceProvider);
    continue;
   }
   app[route.method || DEFAULT_REQUEST_METHOD](route.path,serviceProvider);
  }
  
 }
//  console.log(app._router.stack);
 app.use(errorsHandlers());

}

/**
 * Start the server. Mount other apps
 * @param {object} server - The express app
 */
const start = (server)=>{
 const app = express();
 app.set('db',db);
 init(app);
 server.use(app);
 server.listen(process.env.PORT || 1234,function(){
  serverStarted = true;
  console.log('Server Started: ',serverStarted);
 });
}

server.on('dependency-ready',function(dependency){
 switch(Object.getOwnPropertyNames(dependency)[0]){
  case 'db':{
   db = dependency.db;
  }
 }
 if(db && !serverStarted){
  start(server);
 }
});



/**
 *  Prepare dependencies
 */

//1. prepare db
(async function(){
 try {
  let client = new MongoClient(process.env.MONGODB_URI,{useNewUrlParser:true});
  await client.connect();
  server.emit('dependency-ready',{db:client.db(process.env.MONGODB_DBNAME)});
 } catch (error) {
  console.log(error);
 }
})()
//may add additional dependency asyncronously


