class _2xx{
  constructor(code = 200,type = 'UNSPECIFIED',message="Success",data){
    this.code = code;
    this.type = type;
    this.message = message;
    data ? this.data = data: null;
  }
}
module.exports = _2xx;