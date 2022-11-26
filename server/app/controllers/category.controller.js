const config = require("../config/auth.config");
const db = require("../models");
const Category = db.category;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs"); 
var {ObjectId} = require('mongodb');

/*// --------for upload image to s3-------
const AWS = require('aws-sdk');
const fs = require('fs');

const AWSCredentials = {
  accessKey: process.env.REACT_APP_S3_ACCESSKEY,
  secret:  process.env.REACT_APP_S3_SECRET,
  bucketName: process.env.REACT_APP_S3_BUCKETNAME
};

const s3 = new AWS.S3({
  accessKeyId: AWSCredentials.accessKey,
  secretAccessKey: AWSCredentials.secret
}); 
// -----------------------------------*/
 
 // ---------------------------------------------Admin user Only------------------------------------------


  // add new category --- admin only
  exports.addNewCategory = (req, res) => {
    const category = new Category({
        name: req.body.name,       
        image: req.body.image,
        isActive: req.body.isActive,        
        categoryNumber:  req.body.categoryNumber  
        /*
        // for upload image   
        if (req.body.filename ) {          
          fileName:req.body.filename, 
          fileContent:req.body.filecontent
        }  
        */
      });
       /*//upload file to s3  
       if (req.body.filename ) {    
          // Setting up S3 upload parameters
          const params = {
              Bucket: AWSCredentials.bucketName,
              Key: fileName,
              Body: fileContent
          };

          // Uploading files to the bucket
          s3.upload(params, function(err, data) {
              if (err) {
                  throw err;
              }
              console.log(`File uploaded successfully. ${data.Location}`);
              category.image = data.Location;
          });
        }
        */
    
      category.save((err, category) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } else{
            res.send({ message: "Category added successfully!" });    
        }
      });
  };
  
  // delete a category --- admin only
  exports.deleteCategory = (req, res) => { 
    const categoryId = req.params.id;       
    console.log( categoryId );    
    Category.deleteOne( {_id :ObjectId(categoryId)}, (err, result) => {   
        if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.status(200).json(result);       
        }); 
  };

 
  
  // update category info---admin only
  exports.updateCategory = (req, res) => {
    const categoryId =  req.params.id;

    Category.findOne( {_id :ObjectId(categoryId)}, (err, category) => 
    {   
        if (err) 
        {
            res.status(500).send({ message: err });
            return;
        }         
        category.name = req.body.name;       
        category.image = req.body.image;     
        category.isActive = req.body.isActive;  
        category.categoryNumber = req.body.categoryNumber; 
        /*
        // for upload image     
        if (req.body.filename ) {        
          fileName:req.body.filename, 
          fileContent:req.body.filecontent
        }  
        */

         
        /*//upload file to s3  
        {
          // Setting up S3 upload parameters
          const params = {
              Bucket: AWSCredentials.bucketName,
              Key: fileName,
              Body: fileContent
          };

          // Uploading files to the bucket
          s3.upload(params, function(err, data) {
              if (err) {
                  throw err;
              }
              console.log(`File uploaded successfully. ${data.Location}`);
              category.image = data.Location;
          });
        }
        */
          
        category.save((err, category) => 
        {
            if (err) 
            {
                res.status(500).send({ message: err });
                return;
            } else
            {
                res.send({ message: "Category updated successfully!" });    
            }
        });
    });    
  };

// ---------------------------------------------Regular user------------------------------------------

 // list all categories    ---- admin/user
 exports.listAllCategory = (req, res) => {    
    Category.find({ }, (err, categories) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(200).json(categories);       
      });
  };


 // get one category info  ----admin/user
 exports.getCategory = (req, res) => {    
  const categoryId =  req.params.id;
   
  Category.findOne({_id :ObjectId(categoryId)}, (err, category) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).json(category);       
    });
};

// get scategory info by number  ------admin/user
exports.getCategoryByNumber = (req, res) => {    
  const number=  req.params.number;
   
  Category.findOne({categoryNumber :number}, (err, category) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).json(category);       
    });
};

