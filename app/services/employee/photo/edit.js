
const {dependencies} = require(`${APP_ROOT}/dependencyManager`);

const GridFSBucket = require('mongodb').GridFSBucket;
const ObjectId = require('mongodb').ObjectId;
const fs = require('fs');
const {PassThrough} = require('stream');
const multer = require('multer');
const upload = multer();
/**
 * @type {HT~service}
 * @func employee_photo_edit
 * @memberof Services
 * @desc Changes the photo of the employee.
 */

module.exports = employee_photo_edit = [
  
   upload.single('employeeAvatar'),

  async (req,res,next)=>{ 
   let { employee } = req.params; // employee = _id
   let { db } = dependencies;

   let bucket = new GridFSBucket(db,{bucketName: 'employees-photo'});//??? put bucketName on employee module settings file

   if(!req.file){
      res.json({
         error: {
            type: 'INVALID_FILE_TYPE',
            text: 'Image is not in acceptable format!'
         }
      });
      return;
   }
   let index = (req.file.originalname.toLowerCase().search(/.jpg|.jpeg|.png$/));

   if(index === -1){
      res.json({
         error: {
            type: 'INVALID_FILE_TYPE',
            text: 'Image is not in acceptable format!'
         }
      });
      return;
   }

   //delete photo if it exist
   let deletePhotoPromise = new Promise(function(resolve,reject){
      (async function(){
         let cursor = await bucket.find({_id: employee }); //id does not require ObjectId wrapper
         if(await cursor.hasNext()){
            console.log('Has Photo');
            bucket.delete(employee,function(error){
               if(error){
                  console.log(error);
                  reject(error);
                  return;
               }
               resolve('photo-delete-ok');
            });
         }

         resolve('photo-delete-ok'); //resolve if _id does not yet exist, this op will add photo
      })()
   });

   try {

      let e = await deletePhotoPromise;
      console.log(e);

   } catch (error) {
      console.log('Delete Photo Error : ', error);
      res.json({
         error: {
            type: 'SERVER_ERROR',
            text: 'Error Changing Photo, Please try again later.'
         }
      })
   }

   

   let fileExtension = req.file.originalname.substring(index);

   let fileName = `${employee}-avatar${fileExtension}`; ///??? * put on settings
   
   // use PassThrough to engulp file buffer and pipe to bucket upload stream
   let readableStream = new PassThrough();

   readableStream.end(req.file.buffer); 

   readableStream
      .pipe(bucket.openUploadStreamWithId(employee,fileName))
         .on('error',function(error){
            console.log('Error Saving Photo',error);
            if(error){
               res.json({
                  error: {
                     type: 'WRITE_FILE_ERROR',
                     text: 'There was an error saving the image. Contact Administrator.'
                  }
               })
               return;
            }
            
            
         })
         .on('finish',function(){
            //set employee.photo field
            (async function(){
               let photo = null;
               let cursor = await bucket.find({_id: employee});
               if(await cursor.hasNext()){
                  photo = await cursor.next();
                  await db.collection('employees').updateOne(
                     {_id: ObjectId(employee)},
                     {
                        $set : {
                           photo: photo
                        }
                     }
                  )
               }

               res.json({
                  ok:1,
                  message: {
                     type: 'SUCCESS',
                     text: 'Employee Photo Was Changed.'
                  },
                  resource: photo,
                  type: 'Photo'
               });

            })(); 
           
         });

      
   }
]

module.exports.label = 'Add Employee Photo';
