const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
const multer = require("multer");
const path = require("path");
const express = require('express');
const router = express.Router();
const requestBuilder = require('../request/request_builder');

const fileUpload = multer();

const fs = require("fs");
const Jimp = require("jimp");
const readline = require('readline');

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
    if (imageUrl != null) {

      var query = "insert into upload(imageUrl) values('" + imageUrl + "')";

      var data = await requestBuilder.INSERT(query);
      if (data['code'] == 200) {
        data.imageUrl = imageUrl;
      }
      res.send(data);
    } else {
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
    cb(null, "uploads/")
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg")
  }
})

// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
const maxSize = 1 * 1000 * 1000;

var upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {

    // Set the filetypes, it is optional
    var filetypes = /jpeg|jpg|png/;
    var mimetype = filetypes.test(file.mimetype);

    console.log("MIMetype >>", file.mimetype);

    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb("Error: File upload only supports the "
      + "following filetypes - " + filetypes);
  }

  // the name of file attribute
}).single("file");

router.post('/upload', (req, res) => {
  upload(req, res, err => {

    //   const writableStream = fs.createWriteStream('/uploads/test.jpg');
    //   writableStream.on('error',  (error) => {
    //     console.log(`An error occured while writing to the file. Error: ${error.message}`);
    // });

    //   const rl = readline.createInterface({
    //     input: process.stdin,
    //     output: process.stdout,
    //     prompt: 'Enter a sentence: '
    // });

    // rl.prompt();

    // rl.on('line', (line) => {
    //     switch (line.trim()) {
    //         case 'exit':
    //             rl.close();
    //             break;
    //         default:
    //             sentence = line + '\n'
    //             writableStream.write(sentence);
    //             rl.prompt();
    //             break;
    //     }
    // }).on('close', () => {
    //     writableStream.end();
    //     writableStream.on('finish', () => {
    //         console.log(`All your sentences have been written`);
    //     })
    //     setTimeout(() => {
    //         process.exit(0);
    //     }, 100);
    // });

    if (err) {
      console.log("Failed to upload!");
      res.send(err);
    } else {
      console.log("Successfully uploaded!");
      res.send('Successfully uploaded to Local storage');
    }
  })
})

//read image from base64
router.post('/image/base64', (req, res) => {
  var base64 = req.body.base64;
  console.log("BAse64 ", base64);

  try {
    if (base64 != null) {
      const buffer = Buffer.from(base64, "base64");
      fs.writeFileSync("uploads/new-path.jpg", buffer);
      // Jimp.read(buffer, (err, res) => {
      //   if (err) throw new Error(err);
      //   res.quality(5).write("resized.jpeg");
      // });
      console.log("Success");
      res.send("success");
    }
  } catch (error) {
    console.log(error.stack);
    res.send("fail");

  }


})

module.exports = router