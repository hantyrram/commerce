/**
 * ECommerce Software
 * @module htcommerce
 * @author Ronaldo Ramano
 */
require('dotenv').config();
// const path = require('path');
// const MongoClient = require('mongodb').MongoClient;
// const ObjectID = require('mongodb').ObjectID;
// const cookieParser = require('cookie-parser');
const express = require('express');
// const dependencyManager = require('./dependencyManager');
// const sessionOnRedis = require('../local_modules/session-on-redis');
// const authentication = require('../local_modules/authentication');
// //Policy Based Authorization
// const authorization = require('../local_modules/authorization');
// const {serviceUsePolicy} = require('./policies');
const getServices = require('./functions/getServices');
const getRoutes = require('./functions/getRoutes');
const getMiddlewares = require('./functions/getMiddlewares');

// require('./_globals');


/**
 * Loads the route definitions on the express app, using the serviceProvider as responder.
 * Loads the middlewares specific to the routes as well.
 * If a route does not have the 'method' key, default value is 'get'.
 * @param {object} app - The express app
 * @param {Array} routes - Array of routes
 * @param {Array} services - Array of services
 */
const init = (app)=>{

   let registeredRoutes = getRoutes();
   let registeredServices = getServices();
   let registeredMiddlewares = getMiddlewares();

   for(let route of registeredRoutes){
      let serviceProvider = registeredServices.filter(rs => rs.name === route.serviceProvider);
      if(!serviceProvider){
         continue;
      }

      let routeMiddlewares = [];

      if(route.middlewares && route.middlewares.length > 0){
         routeMiddlewares = route.middlewares.reduce(function(acc,middlewareName){
            let middleware = registeredMiddlewares.filter(rm => rm.name === middlewareName)[0];
            if(!middleware){
               console.log(`Warning: Middleware:${middlewareName} defined on route ${route.method}:${route.path} is not registered! Middleware will not be applied on route!`);
               return acc;
            }
               acc.push(middleware);
               return acc;
         },[]);
      }
      
      let apiVersion = `/apiv${serviceProvider.apiVersion || 1}`;

      if(routeMiddlewares.length > 0){
         console.log('Route Middlewares for',route.path,routeMiddlewares);
         app[route.method](apiVersion.concat(route.path),routeMiddlewares,serviceProvider);
      }else{
         app[route.method](apiVersion.concat(route.path),serviceProvider);
      }
      

   }

   app.use(function(req,res,next){
      res.status(404).json({type:'NOT_FOUND',text:'Resource Not Found!'});
   });

}

/**
 * Start the server. Mount apps here.
 * @param {object} server 
 */
const server = express();



/**
 * The hantyr ecommerce app.
 */
const app = express();

// server.use((req,res,next)=>{
//  if(dependencyManager.isReady()){
//   console.log('Dependencies Ready');
//   init(app);
//   next();
//   return;
//  }
//  let error = new Artifact.Error('UNDER_MAINTENANCE','Sorry! Site is under maintenance. Please try Again Later');
//  let artifact = new Artifact('nok','m_main',error);
//  res.send(artifact);
// });
server.use((req,res,next)=>{
   //check if under maintenance
   if(process.env.NODE_ENV === 'maintenance'){
      res.status(503).json({type:'SITE_UNDER_MAINTENANCE',text:'Please try again later!'});
      return;
   }
   init(app);
   next();
});

server.use(app);

server.listen(process.env.PORT || 1234,function(){
   console.log(`Server started on port ${process.env.PORT || 1234}`);
   console.log(`Server is on "${process.env.NODE_ENV}" mode`);
});






