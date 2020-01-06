



/**
 * @type {HT~service}
 * @func getCountries
 * @memberof Services
 * @desc Creates a new Employee Profile
 */
const {dependencies} = require(APP_ROOT + '/dependencyManager');
const ObjectId = require('mongodb').ObjectId;
const https = require('https');

module.exports = getStates = async (req,res,next)=>{ 
   
   
   try {
      
      let {db} = dependencies;
      let states = await db.collection('states').find({}).toArray();
      
      if(states.length === 0){
         
         let getaccesstokenOptions = {
            headers: {
               Accept: "application/json",
               "api-token": process.env.UNIVERSAL_TUTORIAL_REST_API_TOKEN,
               "user-email": "rongrammer@hotmail.com"
            }
         }

         // https.get("https://www.universal-tutorial.com/api/getaccesstoken",getaccesstokenOptions, getResponse=>{
         //    let auth_token_json_string = ""; //is json string

         //    getResponse.on('data', d =>{
         //       console.log(d.toString());
         //       auth_token_json_string = auth_token_json_string.concat(d.toString());
         //    });

         //    getResponse.on('end',()=>{
         //       // res.json({ok:1,data:  JSON.parse(auth_token)})
          
         //       res.json({ok:auth_token_json_string});
         //    });
         // });

         let auth_token = await new Promise((resolve,rej)=>{
            https.get("https://www.universal-tutorial.com/api/getaccesstoken",getaccesstokenOptions, getResponse=>{
               let auth_token_json_string = ""; //is json string
   
               getResponse.on('data', d =>{
                  console.log(d.toString());
                  auth_token_json_string = auth_token_json_string.concat(d.toString());
               });
   
               getResponse.on('end',()=>{
                  // res.json({ok:1,data:  JSON.parse(auth_token)})
                  let at = JSON.parse(auth_token_json_string);
                  resolve(at.auth_token);
               });
            });
         });

         let requestOptions = {
            headers: {
               "Authorization": `Bearer ${auth_token}`,
               "Accept": "application/json"
            }
         }

         let states = await new Promise((resolve,rej)=>{
            https.get(`https://www.universal-tutorial.com/api/states/${req.params.country || 'United States'}`,requestOptions,(getResponse)=>{

               let states = ""; //is json string
   
               getResponse.on('data', d =>{
                  
                  states = states.concat(d.toString());
               });
   
               getResponse.on('end',()=>{
                  // res.json({ok:1,data:  JSON.parse(auth_token)})
                  let at = JSON.parse(states);
                  resolve(at);
               });
            });
         });

         await db.collection('helpers_data').updateOne({},{
            $set: {
               states
            }
         },{
            upsert: true
         })

         
         res.json({states});
         // https.get(`https:"https://www.universal-tutorial.com/api/countries"'}`,(getResponse)=>{

         //    getResponse.pipe(res);
         // });
         return;
      }
      res.json({ok:1,resource: states})
   } catch (error) {
      
   }
   
   
   
}


