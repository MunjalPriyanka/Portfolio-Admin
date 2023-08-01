const path = require('path');
const express = require('express');
const multer = require('multer');
const File = require('../models/file');
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
  // upload.single('file'),
  async (req, res) => {
    try {
      const { title, description, link } = req.body;
      // const { path, mimetype } = req.file;
      const file = new File({
        title,
        description,
        link
        // file_path: path,
        // file_mimetype: mimetype
      });
      await file.save();
      res.send('file uploaded successfully.');
    } catch (error) {
      res.status(400).send('Error while uploading project. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

Router.put('/update/:id', async (req, res) => {
  const {title, description, link} = req.body;
  //create new user object
  const files = {};
  if(title){files.title = title};
  if(description){files.description = description};
  if(link){files.link = link};
  
       //Find the user will be updated and update it
      let file = await  File.findById(req.params.id);
      if(!file){return res.status(404).send("not found")}
  
      // if(user.user.toString() !== req.user.id){
      //   return res.status(401).send("Not Allowed");
         
      // }
  
      file = await File.findByIdAndUpdate(req.params.id, {$set: files},{ new:true})
      res.json({file});
  })

Router.get('/getAllFiles', async (req, res) => {
  try {
    const files = await File.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

//Delete the Project in the database......................................................
Router.delete('/deletefile/:id', async (req, res) => {
  const {title, description, link} = req.body;
    try {
      //Find the user will be deleted and delete it
     let file = await File.findById(req.params.id);
     if (!file) { return res.status(404).send("Not Found") }

      // Allow deletion only if user owns this user
      // if (user.user.toString() !== req.user.id) {
      //   return res.status(401).send("Not Allowed");
      //   }

      file = await File.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Project has been deleted"});
      
    } catch (error) {
      console.error(error.message)
        res.status(500).send("Internal Server Error");
    }
  })

module.exports = Router;