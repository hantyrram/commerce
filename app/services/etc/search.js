
const EMP_ID_PREFIX = "100";//company 1,company 2 = 200
const GENESIS = 1000;//should not be assigned to anyone
const START = 1001;//first employee
const {dependencies} = require(`${APP_ROOT}/dependencyManager`);
const pluralize = require('pluralize');
/**
 * @type {HT~service}
 * @func search
 * @memberof Services
 * @desc Creates a new Employee Profile
 */
module.exports = search = async (req,res,next)=>{ 
   let {db} = dependencies;
   
   let collection = pluralize(req.query.entity);

   try{
      let collections = await db.listCollections().toArray();
      let r = collections.find(col => col.name === collection);
      if(!r){         
         res.json('Invalid Entity');
         return;
      }
      
      qRes = await db.collection(collection).find(req.body).toArray();
      let artifact = new Artifact('ok','search',null,{entity: qRes});
      res.json(artifact);
   }catch(e){
      console.log(e);
   }

}

module.exports.label = 'Search ';
