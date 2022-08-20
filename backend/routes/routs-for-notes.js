const express = require('express')
const router = express.Router()
var fetchuser = require('./middleware/authtoken')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');

// fetching all the notes of loged in user to show on the main screen
router.get('/allnotes', fetchuser, async (req, res) => {

  // find all the data of loged in user by user unique id that store in user field 
  let data = await Note.find({ user: req.user })
  res.send({data})
})




// for adding the new notes in the data base of notes
router.post('/addnotes', fetchuser, [
  // title must be at least 1 chars long
  body('title').isLength({ min: 1 }),
  // discreption must be at least 1 chars long
  body('discreption').isLength({ min: 1 })], async (req, res) => {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // try to creating if possible 
    try {
      //  creating the new note
      let data = await new Note({
        user: req.user,
        title: req.body.title,
        discreption: req.body.discreption
      })
      // save the note after creating the note
      data.save()
      res.json(data)
    }
    catch (err) {
      res.json(err)
    }
  })




// for updating the note by given id
router.put('/updatingnotes/:id', fetchuser, async (req, res) => {
  try {
    let { title, discreption } = req.body
    const newNote = {}
    // if title or discreption has somthing only then update them
    if (title) { newNote.title = title }
    if (discreption) { newNote.discreption = discreption }

    // try to finding the note for updating
    let data = await Note.findOne({ _id: req.params.id })
    console.log(data)

    // if found then update it
    if (data) {
      if (data.user == req.user) {
        let data = await Note.findByIdAndUpdate({ _id: req.params.id }, { $set: newNote }, { new: true })
        res.send(data)
      }
    } else {
      res.send("cant find the notes of this id")
    }
  }
  catch (err) {
    res.json(err)
  }

})





// for deleting the notes
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {

  // finding the note for deleting
  try {
    var data = await Note.findOne({ _id: req.params.id })
    console.log(data, "found")

    // if found then delete it
    if (data) {

      if (data.user == req.user) {
        let data = await Note.findOneAndDelete({ _id: req.params.id })
        res.send(data)
      }
    } else {
      res.send("cant find the notes of this id")
    }

  } catch (err) {
    res.json(err)
  }

})

module.exports = router