const config = require("../config/auth.config");
const db = require("../models");
const Subcategory = db.subcategory;

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


  // add new subcategory --- admin only
  exports.addNewSubcategory = (req, res) => {
    const subcategory = new Subcategory({
        name: req.body.name,       
        image: req.body.image,
        isActive: req.body.isActive,        
        categoryNumber:req.body.categoryNumber ,    
        subcategoryNumber:req.body.subcategoryNumber
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
    
      subcategory.save((err, subcategory) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } else{
            res.send({ message: "Subcategory added successfully!" });    
        }
      });
  };
  
  // delete a subcategory --- admin only
  exports.deleteSubcategory = (req, res) => { 
    const subcategoryId = req.params.id; 
    Subcategory.deleteOne( {_id :ObjectId(subcategoryId)}, (err, result) => {   
        if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.status(200).json(result);       
        }); 
  };

 
  
  // update subcategory info---admin only
  exports.updateSubcategory = (req, res) => {
    const subcategoryId =  req.params.id;

    Subcategory.findOne( {_id :ObjectId(subcategoryId)}, (err, subcategory) => 
    {   
        if (err) 
        {
            res.status(500).send({ message: err });
            return;
        };         
        subcategory.name = req.body.name;       
        subcategory.image = req.body.image;     
        subcategory.isActive = req.body.isActive;  
        subcategory.categoryNumber = req.body.categoryNumber; 
        subcategory.subcategoryNumber = req.body.subcategoryNumber;  
        /*
        // for upload image    
        if (req.body.filename ) {         
          fileName:req.body.filename, 
          fileContent:req.body.filecontent
        } 
        */

         
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
              subcategory.image = data.Location;
          });
        }  
        
        */
         
        subcategory.save((err, subcategory) => 
        {
            if (err) 
            {
                res.status(500).send({ message: err });
                return;
            } else
            {
                res.send({ message: "Subcategory updated successfully!" });    
            }
        });
    });    
  };

// ---------------------------------------------Regular user------------------------------------------

 // get one subcategory info  ----admin/user
 exports.getSubcategory = (req, res) => {    
  const subcategoryId =  req.params.id;
   
  Subcategory.findOne({_id :ObjectId(subcategoryId)}, (err, subcategory) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).json(subcategory);       
    });
};


exports.getSubcategoryByCategoryNumber = (req, res) => {    
  const number =  req.params.categoryNumber;
   
  Subcategory.find({categoryNumber : number}, (err, subcategories) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).json(subcategories);       
    });
};


  
// get subcategory info by number  ------admin/user
 exports.getSubcategoryByNumber = (req, res) => {    
  const number=  req.params.number;
   
  Subcategory.findOne({subcategoryNumber :number}, (err, subcategory) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).json(subcategory);       
    });
};

