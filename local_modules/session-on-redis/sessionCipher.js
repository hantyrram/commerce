const crypto = require('crypto');
const iv = Buffer.alloc(16);
iv.fill('6y7YYhng56YqwR58');

// const cipher = crypto.createCipheriv('aes-192-cbc',process.env.COOKIE_SECRET,iv);
// const decipher = crypto.createDecipheriv('aes-192-cbc',process.env.COOKIE_SECRET,iv);

function encrypted(rawStr){
 const cipher = crypto.createCipheriv('aes-192-cbc',process.env.COOKIE_SECRET,iv);
 return new Promise((resolve,reject)=>{
    if(!rawStr){reject({message: 'Cipher Encrypt No Data'});}

    let encryptedString = '';
    cipher.on('readable',function(){
     let data = cipher.read();
     if(data){
      encryptedString += data.toString('hex');
     }
    });
    cipher.on('end',function(){
     resolve(encryptedString);
    });
    cipher.write(rawStr);
    cipher.end();
   });
}

function decrypted(encryptedString){
 const decipher = crypto.createDecipheriv('aes-192-cbc',process.env.COOKIE_SECRET,iv);
 return new Promise((resolve,reject)=>{
    if(!encryptedString){reject({message: 'Cipher Decrypt No Data'});}
    let decryptedString = '';
    decryptedString = decipher.update(encryptedString,'hex');
    decryptedString += decipher.final('utf8');
    resolve(decryptedString);
   });
}


module.exports.encrypt = async function(data){
 return await encrypted(data);
}

module.exports.decrypt = async function(encryptedData){
 return await decrypted(encryptedData);
}

