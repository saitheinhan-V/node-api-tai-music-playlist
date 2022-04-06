const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
const multer = require("multer");
const path = require("path");
const express = require('express');
const router = express.Router();
const requestBuilder = require('../request/request_builder');

const fileUpload = multer();

cloudinary.config({ 
    cloud_name: 'dthfx8c4o', 
    api_key: '925629836569881', 
    api_secret: '2PQqzAjGvPjFm-rZpgA6oyuicmA',
    secure: true
  });

  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
};

router.post('/image/upload', fileUpload.single('file'), (req, res, next) => {

    async function upload(req) {
        let result = await streamUpload(req);
        console.log(result);
        var imageUrl = result['url'];
        if(imageUrl != null){
            var query = "insert into upload(imageUrl) values('" + imageUrl + "')";

            var data = await requestBuilder.INSERT(query);
            if(data['code'] == 200){
                data.imageUrl = imageUrl;
            }
            res.send(data);
        }else{
            res.json({
                code: 500,
                message: "Image upload failed!"
            });
        }
    }

    upload(req);
});

//local file upload
// const upload = multer({ dest: "uploads/" });

// router.post('/upload', upload.single("file"),(req, res) => {
//     console.log(req.body);
//     console.log(req.body.file);
//     res.json({ message: "Successfully uploaded files" });
// })

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
  
        // Uploads is the Upload_folder_name
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now()+".jpg")
    }
  })
       
// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
const maxSize = 1 * 1000 * 1000;
    
var upload = multer({ 
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb){
    
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
  
        var extname = filetypes.test(path.extname(
                    file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes);
      } 
  
// the name of file attribute
}).single("file");  

router.post('/upload',(req, res) => {
    upload(req, res, err => {
        if(err){
            res.send(err);
        }else{
            res.send('Successfully uploaded!')
        }
    })
})

module.exports = router