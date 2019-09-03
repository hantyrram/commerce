const dependencyManager = require('../../../dependencyManager');

module.exports = employee_create = (req,res,next)=>{
   dependencyManager.dependencies.db.collection('employees').insertOne({identity:{name:'Ronaldo',lastname:'Revaldo'}})
   

   res.json({ok:1})
}