



/**
 * @type {HT~service}
 * @func getCountries
 * @memberof Services
 * @desc Creates a new Employee Profile
 */
const https = require('https');
module.exports = getCountries = async (req,res,next)=>{ 
   
   https.get('https://restcountries.eu/rest/v2/all',(getResponse)=>{
      getResponse.pipe(res);
   });
   
   
}


