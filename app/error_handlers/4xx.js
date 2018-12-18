/**
 * Authentication has failed
 */
module.exports = function(error,req,res,next){
  if(error.type){
    switch(error.type){
      case 'AUTHENTICATION_ERROR':{
        res.status(401).json(error)
      }
      break;
      case 'NOT_FOUND':{
        res.status(404).json(error)
      }
      break;
      default:{
        res.status(400).json(error)
      }
    }
    return;
  }
  //no error type server error;
  next(error);
}

