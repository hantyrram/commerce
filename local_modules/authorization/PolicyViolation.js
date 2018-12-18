class PolicyViolation extends Error{
  constructor(message){
    super(message);
    this.type = 'PolicyViolation';
  }
}

module.exports = PolicyViolation;