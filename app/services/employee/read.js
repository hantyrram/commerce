
module.exports = employee_read = async (req,res,next)=>{
   res.json({
      ok:1,
      resource: req.preLoadedResource['Employee'],
      resourceType: "Employee"
   })
}