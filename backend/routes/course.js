const path = require('path');
const express = require('express');
const multer = require('multer');
const Course = require('../models/Course');
const { title } = require('process');
const { link } = require('fs');
const Router = express.Router();

// const upload = multer({
//   storage: multer.diskStorage({
//     destination(req, file, cb) {
//       cb(null, 'files');
//     },
//     filename(req, file, cb) {
//       cb(null, `${new Date().getTime()}_${file.originalname}`);
//     }
//   }),
//   limits: {
//     fileSize: 50000000 // max file size 50MB = 50000000 bytes
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls|txt)$/)) {
//       return cb(
//         new Error(
//           'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
//         )
//       );
//     }
//     cb(undefined, true); // continue with upload
//   }
// });

Router.post(
  '/save',
  async (req, res) => {
    try {
      const { title, description,link } = req.body;
      const course = new Course({
        title,
        description,
        link
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

Router.put('/updatecourse/:id', async (req, res) => {
  const {title, description, link} = req.body;
  //create new user object
  const newCourse = {};
  if(title){newCourse.title = title};
  if(description){newCourse.description = description};
  if(link){newCourse.link = link};
  
       //Find the user will be updated and update it
      let course = await  Course.findById(req.params.id);
      if(!course){return res.status(404).send("not found")}
  
      // if(user.user.toString() !== req.user.id){
      //   return res.status(401).send("Not Allowed");
         
      // }
  
      course = await Course.findByIdAndUpdate(req.params.id, {$set: newCourse},{ new:true})
      res.json({course});
  })

Router.get('/getAllCourses', async (req, res) => {
  try {
    const courses = await Course.find({});
    const sortedByCreationDate = courses.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of courses. Try again later.');
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

//Delete the Course in the database......................................................
Router.delete('/deletecourse/:id', async (req, res) => {
  const {title, description, link} = req.body;
    try {
      //Find the user will be deleted and delete it
     let course = await Course.findById(req.params.id);
     if (!course) { return res.status(404).send("Not Found") }

      // Allow deletion only if user owns this user
      // if (user.user.toString() !== req.user.id) {
      //   return res.status(401).send("Not Allowed");
      //   }

      course = await Course.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted"});
      
    } catch (error) {
      console.error(error.message)
        res.status(500).send("Internal Server Error");
    }
  })

module.exports = Router;