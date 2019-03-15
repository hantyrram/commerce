/**
 * @class
 * @classdesc Used when a request violates a Policy.
 */
class PolicyViolation extends Error{
  constructor(message){
    super(message);
    this.type = 'POLICY_VIOLATION';
  }
}

module.exports = PolicyViolation;