
module.exports = employee_roles_read = async (req,res,next)=>{
   let error = new Artifact.Error('SERVICE_NOT_IMPLEMENTED', 'Service not yet implemented');
   let artifact = new Artifact('nok', 'employee_roles_read',null, error);
   res.json(artifact);
 }