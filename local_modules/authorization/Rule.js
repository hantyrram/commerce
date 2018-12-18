const PolicyViolation = require('./PolicyViolation');

/**
 * condition function signature
 * @param {*} request 
 */
const condition = (request)=>{}


/**
 *A Rule is a class that defines a certain condition. This class should be extended and NOT instantiated directly.
 * 
 */
class Rule{

  // /**
  //  * Subclasses must provide a condition property which is a function that accepts a request.
  //  */
  // get condition(){
  //   return (request)=>{return false;};//function signature
  // }
  /**
   * 
   * @param {object} request = The http request.
   */
  check(request){

    if(this.condition(request)) {return true;}

    throw new PolicyViolation(`${this.constructor.name}!`);
  }

}


module.exports = Rule;
