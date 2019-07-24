
const { dependencies } = require(`${APP_ROOT }/dependencyManager`);
/**
 * @type {HT~service}
 * @func employee_credential_generate
 * @memberof Services
 * @desc Generates credential for the given employee.
 */
module.exports = credential_browse = async (req,res)=>{
   let { db } = dependencies;
   try {
    const MATCH = {$match:{"credential":{$exists:true}}};
    const INCLUDE_WITH_CREDENTIALS = {$project:{"credential":1}};
    const NO_PASSWORD = {$project:{"credential.password":0}};
    
    let employees = await db.collection('employees').aggregate([MATCH,INCLUDE_WITH_CREDENTIALS,NO_PASSWORD]).toArray();  
    let message = new Artifact.Message(Artifact.Message.INFO, 'Credentials');
  
    let credentials = [];
    for(let e of employees){
      credentials.push({ _id: e._id, ...e.credential });
    }
  
    let artifact = new Artifact('ok', 'credential_browse', { entity: credentials } , message);
    res.json(artifact);
   } catch (error) {
    console.log(error);
   }
  
}

module.exports.label = 'View All Credentials';

module.exports.description = `Returns a list of all the credentials in the system. User MUST have a credential_browse
   permission to access this service.
`