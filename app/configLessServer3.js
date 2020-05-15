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

const dependencyManager = require('./dependencyManager');
const _registry = require('./_registry');
require('./_globals');

const server = express();
const app = express();
const PORT = process.env.PORT || 8080;
const services = require('./services');


global.APP_ROOT = __dirname;
global.SCHEMAS_PATH = __dirname + '/schemas';

console.log(chalk.bgYellowBright.black(`${new Date} : [SERVER STARTUP]: Starting Server!`));
console.log(chalk.yellow(`${new Date} : [APP INIT] Fetching Apis...`));

let apiFilenames = fs.readdirSync(path.resolve(__dirname,'apis'));
let apiParamLoadersFilenames = fs.readdirSync(path.resolve(__dirname,'apis_param_loaders'));


console.log(chalk.yellow(`${new Date} : [APP INIT] Found ${apiFilenames.length} API definitions.` ));
console.log(chalk.yellow(`${new Date} : [APP INIT] Parsing api files...`));
console.log(chalk.yellow(`${new Date} : [APP INIT] Initializing middlewares...`));
console.log(chalk.red(process.cwd()));
const middlewares = _registry.middlewares.map(rm => require(path.resolve(process.cwd(),rm)));

/*** app use ***/

app.use(express.json());


app.use((req,res,next)=>{
   //initialize
   //associative array that will be used by param loaders to attach any fetched entity
   req.preLoadedResource = [];
   next();
});

console.log(chalk.yellow(`${new Date} : [APP INIT] Initializing api param loaders...`));
for(let paramLoaderFilename of apiParamLoadersFilenames){
   let paramLoader = require(path.resolve(__dirname,`apis_param_loaders/${paramLoaderFilename}`));
   app.param(paramLoader.params,paramLoader.callback);
}

let apis = [];

//define apis on app
for(let service of services.filter( service => Boolean(service.api) && Boolean(service.api.path))){
   
   // console.log(chalk.red(`${new Date} : [APP INIT] ${error.code} Error in Retrieving ${api.serviceProvider} defined in ${filename}. Skipping api definition!`));
   
   let apiPath = path.join(`/apiv${service.api.apiVersion || 1}`,service.api.path);

   const reqAttachments = (req,res,next)=>{
      req.currentApi = service.api;//attaches the current api definition handling the request
      next();
   }

   let apiMiddlewares = [];
   if(service.api.use){
      service.api.use.forEach(middlewareName=>{
         let found = middlewares.find(middlewareFunction=> middlewareFunction.name === middlewareName);
         if(found){
            apiMiddlewares.push(found);
         }
   
      });
   }

   if(apiMiddlewares.length > 0){
      app[service.api.method](apiPath,reqAttachments,apiMiddlewares,service);   
      console.log(chalk.green(`${new Date} : [APP INIT] ${service.api.method}:/${apiPath} can now accept requests!`));
      continue;
   }

   app[service.api.method](apiPath,reqAttachments,service);
   console.log(chalk.green(`${new Date} : [APP INIT] ${service.api.method}:/${apiPath} can now accept requests!`));
}

app.set('apis',apis);

server.use((req,res,next)=>{
   if(!dependencyManager.isReady()){
      res.status(500).json({type:'SERVER_ERROR',text:'Please try again later!'});
      return;
   }
   console.log(chalk.yellow(`${new Date} : [SERVER START_UP] Dependencies are Ready! Server can now now accept requests!`));
   next();
});


server.use((req,res,next)=>{
   fs.appendFile(path.resolve(__dirname,'logs/server.log'),`${new Date} [CLIENT CONNECTED] : IP=${req.ip} ${os.EOL}`,(err)=>{
      if(err){
         console.log(chalk.yellow(`${new Date} : [SERVER LOGGING] Error on Server Log Middleware ${os.EOL}` ));
      }
   });
   next();
});

server.use(app);



server.listen(PORT,function(){
   console.log(`${new Date} : [SERVER START_UP] Server started on port ${PORT}`);
   console.log(`${new Date} : [SERVER START_UP] Server is on "${process.env.NODE_ENV}" mode`);
});









