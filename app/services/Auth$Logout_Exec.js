module.exports = logout = (req,res,next)=>{
   res.json({action:'logging out'});
}

module.exports.api = {
   path: '/auth/login',
   method: 'post',
   op: 'login'
}