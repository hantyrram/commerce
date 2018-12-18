
/**
* @var function
* A function which allows the user of gives the user of this module to decide which part of the user 
* data will be saved on the session, serializer MUST call the serializationDoneCallback passed to 
* it with the user identifier.
* 
*/

let serializer;


/**
* Deserializer function, hydrates a user, given a user identifier (e.g. user.id) previously provided during serialization,
* saved on the session. 
* 
*/
let deserializer;

/**
 * Sets the serializer function.
 * @param {function} fn - The serializer function.
 */  
module.exports.serializeUser = (fn)=>{
 serializer = fn;
}

/**
 * Sets the deserializer function
 * @param {function} fn - The deserializer function.
 */
module.exports.deserializeUser = (fn)=>{
 deserializer = fn;
}



/**
 * @param {object} - The options object. With the following properties:
 * 
 * loginURL = The login url.
 * 
 * successRedirect = The path the user will be redirected to when the authentication is successful. This will be
 * included on the payload, sent to the client.
 * 
 * deserializeUser = <required> A function that accepts the data that has been set during serialization e.g. user or user.id,
 * and a done function.
 * 
 * useInternalLoginService = if true, authentication will terminate on this module, response/error response
 * will be sent next will not be called. If false the validationn logic will be delegated to a login service. 
 * A login service will provide a user to the "done" callback passed on the function fn at req.login(fn)
 * if user is null AuthError is passed to next(),else allow req to proceed so next() is called.
 * Default = 
 * 
 */
module.exports.init = (options = {})=>{
 //save the authenticatedUser,nope?
 let loginURL = options.loginURL || '/apiv1/login';
 let successRedirect = options.successRedirect || '/';
 let useInternalLoginService = options.useInternalLoginService || false;
 


 return (req,res,next)=>{
  //if no session, go to /login
  //test remove this line
  // req.session.user = "5bca58d4e7179a4377ff835d";
  console.log('@authentication',{sessionID:req.session.id})

  let login = (errMsg,user)=>{
    let userObject = user;
    if(user === null){
      // res.json({status:'nok',error:{type:'AuthError',message:errMessage,failureRedirect:loginURL}});
      next({status:'nok',source:'login',type:'AUTHENTICATION_ERROR',errMsg:errMsg});
      return;
    }
    let serializationDoneCallback = (user)=>{
      req.session.user = user;
      req.session.save();
      res.json({status:'ok',source:'login',message:'Login Success!',data:{user : {id:userObject._id,username:userObject.username}}});
      return;
    } 
    //allow module user to determines which property of the user to save to session. e.g. ID
    serializer(user,serializationDoneCallback);
  }//login end
  

  let logout = ()=>{
    req.session.destroy();
    res.clearCookie(req.session.cookie.name);
  }//logout end

  req.logout = logout;
  
  if(!req.session || !req.session.user){
   if(req.path !== loginURL){
    next({status:'nok',source:'authenticate',type:'AUTHENTICATION_ERROR',errMsg:'Authentication Failed'});
    return;
   }
    //req.path === loginURL
    //attach the login function, which can be invoked on the login service
    //errMessage to send to client
    //user object 
    req.login = login;
    //proceed
    next();
    return;
  }

  //
  //function passed to the deserializer
  let done = (user)=>{
    
    if(!user){
      //this error might happen when there is an existing session.user but the user was already deleted on the database
      // res.json({status:'nok',error:{type:'AuthError',message:'user not found on db',failureRedirect:loginURL}});
      next({status:'nok',source:'authenticate',type:'AUTHENTICATION_ERROR',errMsg:'Invalid User',failureRedirect:loginURL});
      return;
    }
    //accessing /login when there's already an existing user session
    if(req.path === loginURL){
      res.json({status:'ok',source:'login',message:'Already Logged in!',data:{user:user}});
      return;
    }
    req.user = user;
    next();    
  }

  deserializer(req.session.user,done);
 }
}

