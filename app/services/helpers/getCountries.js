



/**
 * @type {HT~service}
 * @func getCountries
 * @memberof Services
 * @desc Creates a new Employee Profile
 */
const https = require('https');
const {dependencies} = require(APP_ROOT + '/dependencyManager');

module.exports = getCountries = async (req,res,next)=>{ 
   
  
   let countries = [];
   
   try {
      
      let {db} = dependencies;

      let helpers_data = await db.collection('helpers_data').find({}).toArray();
      
      console.log(helpers_data);
      countries = helpers_data && helpers_data[0] ? helpers_data[0].countries : null;

      if(!countries || countries.length === 0){
        
         countries = await new Promise((resolve,rej)=>{
            https.get(`https://restcountries.eu/rest/v2/all`,(getResponse)=>{

               let countriesJSON = ""; //is json string
   
               getResponse.on('data', d =>{
                  
                  countriesJSON = countriesJSON.concat(d.toString());
               });
   
               getResponse.on('end',()=>{
                  // res.json({ok:1,data:  JSON.parse(auth_token)})
                  let at = JSON.parse(countriesJSON);
                  resolve(at);
               });
            });
         });

         await db.collection('helpers_data').updateOne({},{
            $set: {
               countries
            }
         },{
            upsert: true
         })
         
      }

      res.json( {
         ok: 1,
         resource: countries,
         resourceType: 'Array',
         resourceItemType: 'Country'
      } ); //country name as key

   } catch (error) {
      console.log(error);
      res.json({error: {type: 'SERVER_ERROR'}})
   }
   
}


