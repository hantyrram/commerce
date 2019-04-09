/**
 * @type {HT~function}
 * @func _generateEmpId
 * @desc Generates a new employee Id
 */
const EMPLOYEE_ID_PREFIX = "ht";
module.exports = (lastID)=>{
 console.log(lastID);
 let num = Number(lastID ? lastID.replace(EMPLOYEE_ID_PREFIX,"") : 0);
 console.log('num',num)
 return `${EMPLOYEE_ID_PREFIX}${num + 1}`;
}