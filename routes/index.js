const express = require('express');
const fs = require('fs');
const router = express.Router({strict: true});
const multer = require('multer');

const uploadLocation = process.env.upload ?
  process.env.upload:
  'uploads/';

if (!fs.existsSync(uploadLocation)) {
  fs.mkdirSync(uploadLocation);
} else if (!fs.lstatSync(uploadLocation).isDirectory()) {
  throw 'Upload path is file!';
}

const upload = multer({storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadLocation);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()} - ${file.originalname}`);
    }
  })});

// making sure that the URI ends with a slash to make sure that the form action leads to the correct URI
const baseURI = process.env.uri ?
  process.env.uri.endsWith('/') ?
    process.env.uri:
    process.env.uri + '/':
  '/';
console.log(`Starting server at "${baseURI}" and saving files to "${uploadLocation}".`);

router.get(baseURI, (req, res) => {
  let options = {};
  if (process.env.name) options['name'] = process.env.name;
  res.render('index', options);
});

router.post(baseURI + 'upload', upload.single('file-input'), (req, res) => {
  res.render('index', {name: 'Patrick', alert: {level: 'alert-success', text: 'File uploaded successfully.'}});
});

module.exports = router;
