module.exports = employee_list = (req,res,next)=>{
   res.json({ok:1,resource:[{employeeId:1}],href:'/employees'});
}