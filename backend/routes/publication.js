const path = require('path');
const express = require('express');
const multer = require('multer');
const Publication = require('../models/Publication');
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
      const publication = new Publication({
        title,
        description,
        link
      });
      await publication.save();
      res.send('Publication uploaded successfully.');
    } catch (error) {
      res.status(400).send('Error while uploading publication. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

Router.put('/updatepublication/:id', async (req, res) => {
  const {title, description, link} = req.body;
  //create new user object
  const newPublication = {};
  if(title){newPublication.title = title};
  if(description){newPublication.description = description};
  if(link){newPublication.link = link};
  
       //Find the user will be updated and update it
      let publication = await  Publication.findById(req.params.id);
      if(!publication){return res.status(404).send("not found")}
  
      // if(user.user.toString() !== req.user.id){
      //   return res.status(401).send("Not Allowed");
         
      // }
  
      publication = await Publication.findByIdAndUpdate(req.params.id, {$set: newPublication},{ new:true})
      res.json({publication});
  })

Router.get('/getAllPublications', async (req, res) => {
  try {
    const publications = await Publication.find({});
    const sortedByCreationDate = publications.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of publications. Try again later.');
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

//Delete the Publication in the database......................................................
Router.delete('/deletepublication/:id', async (req, res) => {
  const {title, description, link} = req.body;
    try {
      //Find the user will be deleted and delete it
     let publication = await Publication.findById(req.params.id);
     if (!publication) { return res.status(404).send("Not Found") }

      // Allow deletion only if user owns this user
      // if (user.user.toString() !== req.user.id) {
      //   return res.status(401).send("Not Allowed");
      //   }

      publication = await Publication.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Publication has been deleted"});
      
    } catch (error) {
      console.error(error.message)
        res.status(500).send("Internal Server Error");
    }
  })

module.exports = Router;