
module.exports = employee_update = async (req,res,next)=>{
   let error = new Artifact.Error('SERVICE_NOT_IMPLEMENTED', 'Service not yet implemented');
   let artifact = new Artifact('nok', 'employee_update',null, error);
   res.json(artifact);
 }