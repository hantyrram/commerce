const Rule = require('./Rule');
/**
 * Contains a collection of rules.
 */
class Policy{
  constructor(){
    //Stores the Rules, unique by Rule.name
    this.rules = [];
  }

  addRule(rule){
    if(!(rule instanceof Rule)){
      throw new TypeError('Argument should be of type Rule');
    }
    if(this.findRule(rule) !== -1){//Rule does not yet exist
      this.rules.push(rule);
    }
  }

  removeRule(rule){
    if(!(rule instanceof Rule)){
      throw new TypeError('Argument should be of type Rule');
    }
    let i = this.findRule(rule);
    this.rules.splice(i,1);
  }

  //Returns the index of the rule;
  findRule(rule){
    let i = this.rules.findIndex((r)=>{
      return r.name === rule.name;
    });
    return i;
  }
}