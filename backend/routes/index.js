const router = require('express').Router();
const uploader = require('../configs/cloudinary-setup');
const Image = require('../models/Image');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'animipax@gmail.com',
    pass: 'ironhackproject3'
  }
});


router.post('/sendEmail', (req, res, next) => {
  
  var mailOptions = {
    from: 'animipax@gmail.com',
    to: req.body,
    subject: 'Your trip has ended!',
    text: `Thank you for using Splitex during your trip, we hope you had an amazing experience.
    If you want to go back and look at your pictures or receipts, we have saved this under Profile > Past Trips. In there you will see a list of all your past trips as well as your data.
    `
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});

{/* <>
              <ListItem button key={i} onClick={()=> goToTrip(userID, el.id)}>
                <ListItemText primary={el.name} secondary={el.date} />
              </ListItem>
              <Divider />
            </> */}

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
