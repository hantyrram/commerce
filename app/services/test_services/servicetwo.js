const excel = require('xlsx');
const path = require('path');
let workbook = excel.readFile(path.join(process.cwd(),'assets/PSGCPublication.xlsx'));
let data = excel.utils.sheet_to_json(workbook.Sheets["PSGC"]);
module.exports = function servicetwo_read(req,res,next){
   console.log(data)
   res.json({
      data
   });
}


module.exports.apiVersion = 1; //default equals to 1
