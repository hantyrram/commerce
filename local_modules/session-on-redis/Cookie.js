/**
 * The session cookie 
 */


//This particular cookie will only be used for user session
class Cookie{
  constructor(options){
    this.name = options.name;
    this.expires = options.expires;
    this.path = options.path;
    this.sameSite = options.sameSite;
    this.http = options.httpOnly;
    this.secure = options.secure;
    this.domain = options.domain;
    //
    //this[this.name] = value of the cookie
  }

  //Construct the raw cookie string
  toString(){
    let arr =  Object.getOwnPropertyNames(this).reduce((acc,propertyName)=>{
      if(propertyName === 'name'){
        //skip
        return acc;
      }
      if(!this[propertyName]){
        return acc;
      }
      //cookie name,insert as first element, h_sid=jkljfsldafjasf
      if(propertyName === this.name){
        acc.unshift(`${propertyName}=${this[propertyName]}`);
        return acc;
      }
      //use Max-Age on set cookie
      acc.push(`${propertyName === 'expires'? 'Max-Age': propertyName}=${this[propertyName]}`);

      return acc;
    },[]);

    return arr.join(';');
  }
}

module.exports = Cookie;