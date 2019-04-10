
/**
 * @type {HT~service}
 * @func employee_create_credential
 * @memberof Services
 * @desc Creates a credential to the employee.
 */
module.exports = employee_credential_create = async (req,res,next)=>{
//requires empID from param
 let {empID} = req.params; 
 let {credential} = req.body;
 //return the credential if employee already has credential

 const MATCH = {$match:{credential:{$exists:true}}}; // employees with credentials
 const PROJECT = {$project:{"credential.username":1}};//rertieve only username from credentials
 const SORT = {$sort:{"credential.username":-1}};//sort desc
 const LIMIT = {$limit:1};//return the last one
 //get the LAST username used
 let aggregationCursor = await req.app.get('db').collection('employees').aggregate([MATCH,PROJECT,SORT,LIMIT]);
 aggregationCursor.on('data',(document)=>{
  console.log(document);
  res.json(document)
 })
}

module.exports.label = 'Assigns A Credential To The Employee';
