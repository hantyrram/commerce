/**
 * ECommerce Software
 * @module htcommerce
 * @author Ronaldo Ramano
 */
require('dotenv').config();
const os = require('os');
const express = require('express');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const sessionOnRedis = require('./modules/session-on-redis');
const cookieParser = require('cookie-parser');
const dependencyManager = require('./dependencyManager');
const server = express();
const app = express();
const PORT = process.env.PORT || 8080;

const __defineGlobals = require('./__defineGlobals');
__defineGlobals();

const __initParamLoaders = require('./__initParamLoaders');
const __initAuthentication = require('./__initAuthentication');
const __defineApis = require('./__defineApis');



/**
 * 
 * Sets up, the app, call after when dependencyManager.isRead.
 */
function start(app){
   app.use(express.json());
   app.use(cookieParser());
   app.use(sessionOnRedis({redisClient:dependencyManager.dependencies.redisClient}));
   app.use((req,res,next)=>{
      //initialize
      //associative array that will be used by param loaders to attach any fetched entity
      req.preLoadedResource = [];
      next();
   });
   
   
   __initParamLoaders(app);
   __initAuthentication(app);
   __defineApis(app);
}


/**
 * Server Middleware. Check if dependencyManager.isReady.
 */
server.use((req,res,next)=>{
   if(!dependencyManager.isReady()){
      res.status(500).json({type:'SERVER_ERROR',text:'Please try again later!'});
      return;
   }
   start(app);
   console.log(chalk.yellow(`${new Date} : [SERVER START_UP] Dependencies are Ready! Server can now now accept requests!`));
   next();
});

/**
 * Server Middleware. Setup server log.
 */
server.use((req,res,next)=>{
   fs.appendFile(path.resolve(__dirname,'logs/server.log'),`${new Date} [CLIENT CONNECTED] : IP=${req.ip} ${os.EOL}`,(err)=>{
      if(err){
         console.log(chalk.yellow(`${new Date} : [SERVER LOGGING] Error on Server Log Middleware ${os.EOL}` ));
      }
   });
   next();
});

/**
 * Use app
 */
server.use(app);

/**
 * Startup server.
 */
server.listen(PORT,function(){
   console.log(`${new Date} : [SERVER START_UP] Server started on port ${PORT}`);
   console.log(`${new Date} : [SERVER START_UP] Server is on "${process.env.NODE_ENV}" mode`);
});










