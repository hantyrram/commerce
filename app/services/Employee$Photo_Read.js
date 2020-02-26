
const {dependencies} = require(`${APP_ROOT}/dependencyManager`);

const GridFSBucket = require('mongodb').GridFSBucket;
const GridStore = require('mongodb').GridStore;
const ObjectId = require('mongodb').ObjectId;
const fs = require('fs');
const {PassThrough} = require('stream');
const multer = require('multer');
const upload = multer();
const path = require('path');
/**
 * @type {HT~service}
 * @func employee_add_eid_manual
 * @memberof Services
 * @desc Creates a new Employee Profile
 */
// module.exports = employee_photo_add = async (req,res,next)=>{ 

   
//    let upload = multer();

//    req.app.use(upload.single('employee-avatar'));

//    let { db } = dependencies;
//    let bucket = new GridFSBucket(db,'employee_photo_bucket');
//    req.on('data',function(data){
//       console.log(data);
//    })
  
//    res.json({ok:1})
// }

module.exports = employee_photo_read = async (req,res,next)=>{ 
      let { employee } = req.params;
      let { db } = dependencies;
      // res.set('Content-Type','image/png');
      let bucket = new GridFSBucket(db, {bucketName: 'employees-photo'}); //??? put bucketName on employee module settings file
      let stream  = new PassThrough();
      console.log('Employee Id', employee);
      let defaultAvatarRS = await fs.createReadStream(path.join(process.cwd(),'assets/images/AvatarBlue.png'));
      let cursor = await bucket.find({_id: employee }); //id does not require ObjectId wrapper
      if(await cursor.hasNext()){
         console.log('Has Next',await cursor.hasNext());
         await bucket.openDownloadStream(employee).pipe(res);
         return ;

      }
      defaultAvatarRS.pipe(res); //default avatar

   }

module.exports.api = {
   path : 'employees/:employee/photo',
   method: 'get',
   resource: 'Employee$Photo',
   op: 'read',
   description: 'Fetch Employee\'s Photo'
}