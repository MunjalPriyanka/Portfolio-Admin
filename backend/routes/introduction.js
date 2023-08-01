const path = require('path');
const express = require('express');
const multer = require('multer');
const Introduction = require('../models/Introduction');
const { title } = require('process');
const { link } = require('fs');
const Router = express.Router();



Router.post(
  '/save',
  async (req, res) => {
    try {
      const { description } = req.body;
      const course = new Introduction({
        
        description
        
      });
      await course.save();
      res.send('Course uploaded successfully.');
    } catch (error) {
      res.status(400).send('Error while uploading course. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

Router.put('/update/:id', async (req, res) => {
  const {description} = req.body;
  //create new user object
  const newIntroduction = {};
  if(description){newIntroduction.description = description};
  
       //Find the user will be updated and update it
      let introduction = await  Introduction.findById(req.params.id);
      if(!introduction){return res.status(404).send("not found")}
  
      introduction = await Introduction.findByIdAndUpdate(req.params.id, {$set: newIntroduction},{ new:true})
      res.json({introduction});
  })

Router.get('/getIntroductions', async (req, res) => {
  try {
    const introductions = await Introduction.find({});
    const sortedByCreationDate = introductions.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of introductions. Try again later.');
  }
});

// Router.get('/download/:id', async (req, res) => {
//   try {
//     const file = await File.findById(req.params.id);
//     res.set({
//       'Content-Type': file.file_mimetype
//     });
//     res.sendFile(path.join(__dirname, '../../', file.file_path));
//   } catch (error) {
//     res.status(400).send('Error while downloading file. Try again later.');
//   }
// });

// //Delete the Course in the database......................................................
// Router.delete('/deletecourse/:id', async (req, res) => {
//   const {title, description, link} = req.body;
//     try {
//       //Find the user will be deleted and delete it
//      let course = await Course.findById(req.params.id);
//      if (!course) { return res.status(404).send("Not Found") }

//       // Allow deletion only if user owns this user
//       // if (user.user.toString() !== req.user.id) {
//       //   return res.status(401).send("Not Allowed");
//       //   }

//       course = await Course.findByIdAndDelete(req.params.id)
//         res.json({ "Success": "Note has been deleted"});
      
//     } catch (error) {
//       console.error(error.message)
//         res.status(500).send("Internal Server Error");
//     }
//   })

module.exports = Router;