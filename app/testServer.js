
// const express = require('express');
// const server = express();
// const Ajv = require('ajv');
// const path = require('path');

// //http://localhost:1235/schemas/<json file>
// server.use('/schemas',express.static(path.resolve(__dirname,'schemasv2')));

// server.use(express.json());
// server.post('/',(req,res)=>{
//    const employeeSchema = require('./schemasv2/Employee');
//    const definitions = require('./schemasv2/definitions');
//    const ajv = new Ajv();
//    const validate = ajv.addSchema(definitions).compile(employeeSchema);

   
//    const valid = validate(req.body);
   
//    if(!valid){
//       res.json({errors: validate.errors});
//       return;
//    }
//    res.json({ok:1});
// });
// //post employee 
// //validate using ajv

// server.listen(1235,function(){
//  console.log('Server Started: ');
// });
const p = require('path');

const $require = function(path){
   if(path.startsWith("$")){
      return require(p.resolve(__dirname),path.replace(/^$/,''));
   }
   return require(path);
}

let x = $require('$Artifact');

console.log(x);

