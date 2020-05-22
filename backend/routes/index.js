const router = require('express').Router();
const uploader = require('../configs/cloudinary-setup');
const Image = require('../models/Image');

router.get('/', (req, res, next) => {
  res.status(200).json({ msg: 'Working' });
});

router.get('/imageList', (req, res, next) => {
  Image.find().then((movies) => {
    res.json(movies);
  });
});

router.post('/addImg', (req, res, next) => {
  Image.create(req.body).then((dbRes) => {
    res.json(dbRes);
  });
});

router.post('/createUrl', uploader.single('imageUrl'), (req, res, next) => {
  // console.log('file is: ', req.file)

  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  // get secure_url from the file object and save it in the
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
  res.json({ secure_url: req.file.secure_url });
});

module.exports = router;
