const express = require('express')
const router = express.Router()
const User = require('../models/User')
var bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var fecthuser = require('./middleware/authtoken')


// adding the new user in the data base
router.post('/', [
  //  array checks the validation
  body('email').isEmail(),
  // password must be at least 5 chars long
  body('password').isLength({ min: 5 })], async (req, res) => {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // finding the user in the data base
    let data = await User.findOne({ email: req.body.email })
    // if data found then show message exist already
    if (data) {
      console.log("user already exist")
      res.send("exist already")
    }
    else {
      // for showing if data is processed successfully
      let success = false;
      // try to creat user 
      try {
        // hash password befor storing
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash

        // creat a new document in data base
        User.create(req.body).then((user) => {
          //  generating generation after id generated and user created
          // var authtoken = jwt.sign({ _id: user._id }, 'shhhhh');
          var authtoken = jwt.sign({ _id: user._id }, 'shhhhh');
          console.log(authtoken);

          // token adding into data base
          // user.tokens = user.tokens.concat({ token: token })
          user.save()
          success = true;
          res.json({ success, authtoken })
        }).
          catch((err) => {
            console.log(err)
            res.send(success, `item was not send ${err}`)
          })
      }
      // if not created then show message
      catch (error) {
        res.status().send(success, body)
      }
    }
  })





// for login user endpoint
router.post('/login', [
  body('email').isEmail(),
  body('password').exists()], async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // for showing if data is processed successfully
    let success = false;
    // try to find the user in the data base
    try {
      // finding the user in the data base
      let data = await User.findOne({ email: req.body.email })
      if (data) {
        const match = await bcrypt.compare(req.body.password, data.password);
        if (match) {
          const authtoken = jwt.sign({ _id: data._id }, 'shhhhh');
          console.log(data)

          success = true
          res.json({success,authtoken})
        }
        else {
          // this is for password error
          res.status(400).json({'success' : success, 'error': "check the details again 2"})
        }
      }
      else {
        // this is for email error
        console.log(success)
        // res.send(success,"check the details again 2")
      
        res.status(400).json({'success' : success, 'error': "check the details again 2"})

      }
    }catch (err) {
      console.log(err)
      // res.send(success,err)
      res.status(400).json({'success' : success, 'error': err})

    }
  })


// geting the user detials
// router.post('/userdetail', fecthuser, async (req, res) => {

//   try {
//     let userId = req.user
//     console.log(req.user)
//     const user = await User.findById(userId).select("-password")
//     res.send(user)

//   } catch (error) {
//     console.error(error.message);

//     res.status(500).send('internal server error');
//   }
// })
module.exports = router