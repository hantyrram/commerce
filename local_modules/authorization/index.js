/**
 * @func
 * @desc A function that deserializes the user's roles.The function is invoked with the current
 * logged in user as the first parameter, and (the done) function as second parameter.
 * The done function will receive the Array of deserialized roles.
 * 
 * 
 * Function Signature:
 * 
 * function(user,done){}
 */
let userRolesDeserializer;

/**
 * The function passed to the userRoleDeserializer as second parameter, that will receive 
 * the deserialized roles of the currently logged in user. ES5 function is used to allow
 * early binding of the request parameter.
 * @param {object} request - The request object.
 * @param {Array} roles - The deserialized roles of the user.
 * 
 */
let done = function(request,roles){
 //non-enumerable so it won't be saved on the session
 console.log('@done function, authorization index',{roles});
 Object.defineProperty(request.user,'deserializedUserRoles',{enumerable:false,writable:false,value:roles});
}

const enforce = (policies)=>{
  return {
    on : on.bind({},policies)
  }
}

/**
 * Must be chained after enforce.
 * 
 * @param {Array} policies - The Array of policies.
 * @param {object} request - The http request object.
 */
const on = async (policies,request)=>{
  let error = null;
  policy_test:{
    for(let policy of policies){
      for(let rule of policy){//policy is just an Array of rules
        try{
          rule.check(request);
          console.log('rule check triggered');
        }catch(policyViolation){
          error = policyViolation;
          break policy_test;
        }
      }
    }  
  }
  if(error) throw error;                   
  return true; 
}
/**
 * 
 * @param {Array} policies 
 */                                        
module.exports = (policies) => {
 return (request,response,next)=>{
  userRolesDeserializer(request.user,done.bind(request));
  enforce(policies).on(request).then(()=>next()).catch(policyViolation=>{
    request.unauthorized = true;
    console.log('Catching Policy Violation');
    next(policyViolation);//error on first violation
   });
 }
}

/**
 *  userRolesDeserializer must be set before using the authorization module.
 */
module.exports.deserializeUserRoles = (fn)=>{
 userRolesDeserializer = fn;
}
module.exports.Rule = require('./Rule');
module.exports.Policy = require('./Policy');
module.exports.PolicyViolation = require('./PolicyViolation');

//ignore , user only has permissions
//user.permissions = 'product_create'
//role is construct outside the database,e.g. define 'admin' 
//will automatically add the permissions on the user