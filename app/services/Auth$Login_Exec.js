module.exports = login = (req,res,next)=>{
   res.json({action:'logging in'});
}

module.exports.api = {
   path : 'auth/login',
   method: 'post',
   resource: 'Auth$Login',
   op: 'exec',
}