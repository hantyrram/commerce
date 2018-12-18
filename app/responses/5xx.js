class _5xx{
  constructor(code = 500,type="UNSPECIFIED",message = 'Internal Server Error',error){
    this.code = code;
    this.type = type;
    this.message = message;
    error ? this.error = error: null;
  }
}

module.exports = _5xx;