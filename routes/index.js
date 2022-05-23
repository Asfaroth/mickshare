const express = require('express');
const fs = require('fs');
const router = express.Router({strict: true});
const multer = require('multer');

const uploadLocation = process.env.UPLOAD ?? 'uploads/';

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
const baseURI = process.env.URI ?
  process.env.URI.endsWith('/') ?
    process.env.URI:
    process.env.URI + '/':
  '/';
console.log(`Starting server at "${baseURI}" and saving files to "${uploadLocation}".`);

router.get(baseURI.slice(0, -1), (req, res) => {
  res.redirect(301, baseURI);
});

router.get(baseURI, (req, res) => {
  let options = {};
  if (process.env.NAME) options['name'] = process.env.NAME;
  res.render('index', options);
});

router.post(baseURI + 'upload', upload.single('file-input'), (req, res) => {
  let options = {};
  if (process.env.NAME) options['name'] = process.env.NAME;
  options['alert'] = {
    level: 'alert-success',
    text: 'File uploaded successfully.'
  }
  res.render('index', options);
});

module.exports = router;
