/**
 * ECommerce Software
 * @module htcommerce
 * @author Ronaldo Ramano
 */
require('dotenv').config();
let dependencyManager = require('./dependencyManager');


const express = require('express');
const server = express();

const start = (server)=>{
 const app = express();
 app.set('db',db);
 init(app);
 server.use(app);

}

server.use(function(req,res,next){
 console.log(dependencyManager.dependencies.redisClient);
 if(dependencyManager.isReady()){
  res.send('Ok Na');
  return;
 }
 res.send('OOPS still waiting please refresh');

});

server.listen(process.env.PORT || 1234,function(){
 serverStarted = true;
 console.log('Server Started: ',serverStarted);
});



