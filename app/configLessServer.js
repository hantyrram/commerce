/**
 * ECommerce Software
 * @module htcommerce
 * @author Ronaldo Ramano
 */
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const dependencyManager = require('./dependencyManager');

const server = express();

const app = express();


let apiFilenames = fs.readdirSync(path.resolve(__dirname,'apis'));
console.log(chalk.yellow(`${new Date} : [APP START_UP] Fetching Apis...`));
console.log(chalk.yellow(`${new Date} : [APP START_UP] Found ${apiFilenames.length} API definitions.` ));
console.log(chalk.yellow(`${new Date} : [APP START_UP] Parsing api files...`));
for(let filename of apiFilenames){
   
   let api = require(path.resolve(__dirname,`apis/${filename}`));
   
   let serviceProvider;

   try {
       serviceProvider = require(path.resolve(process.cwd(),api.serviceProvider));   
   } catch (error) {
      if(error.code === 'MODULE_NOT_FOUND'){
         //skip
         console.log(chalk.red(`${new Date} : [APP START_UP] Error in Retrieving ${api.serviceProvider} defined in ${filename}. Skipping api definition!`));
         continue;         
      }
   }
   
   
   let apiVersion = api.version || 1;
   let prefixedPath = path.join(`/apiv${apiVersion}`,api.path);
   app[api.method](prefixedPath,serviceProvider);
   console.log(chalk.green(`${new Date} : [APP START_UP] ${api.method}:/${prefixedPath} can now accept requests!`));
}



server.use((req,res,next)=>{
   if(!dependencyManager.isReady()){
      res.status(500).json({type:'SERVER_ERROR',text:'Please try again later!'});
      return;
   }
   console.log(chalk.yellow(`${new Date} : [SERVER START_UP] Dependencies are Ready! Server can now now accept requests!`));
   next();
   
});

server.use(app);

server.listen(process.env.PORT || 1234,function(){
   console.log(`${new Date} : [SERVER START_UP] Server started on port ${process.env.PORT || 1234}`);
   console.log(`${new Date} : [SERVER START_UP] Server is on "${process.env.NODE_ENV}" mode`);
});










