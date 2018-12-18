
const whitelist = [
  "127.0.0.1"
];

class MustBeFromAllowedIP extends global.Rule{
  get condition(){
     return (request)=>{
      console.log(request.connection.remoteAddress);
      console.log('MustBeFromAllowedIP Rule not yet implemented'); 
      return true;
    }
  }
}

module.exports = MustBeFromAllowedIP;
