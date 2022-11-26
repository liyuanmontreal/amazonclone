const config = require("../config/auth.config");
const db = require("../models");
const Product = db.product;
const Category = db.category;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs"); 
var {ObjectId} = require('mongodb');



// --------for upload image to s3-------
const AWS = require('aws-sdk');
const fs = require('fs');

/*const AWSCredentials = {
  accessKey: process.env.REACT_APP_S3_ACCESSKEY,
  secret:  process.env.REACT_APP_S3_SECRET,
  bucketName: process.env.REACT_APP_S3_BUCKETNAME
};
const s3 = new AWS.S3({
  accessKeyId: AWSCredentials.accessKey,
  secretAccessKey: AWSCredentials.secret
});*/ 


const s3 = new AWS.S3({
  accessKeyId: "AccessID",
  secretAccessKey: "AccessKey"
});



// -----------------------------------*/
 
 
 // ---------------------------------------------Admin user Only------------------------------------------
 // list all product
exports.listAllProduct = (req, res) => {    
  Product.find({ }, (err, products) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).json(products);       
    });
};

// add new product --- admin
exports.addNewProduct = (req, res) => 
{
  const product = new Product
  ({
      name: req.body.name,
      description:req.body.description,     
      image: req.body.image,
      brand: req.body.brand,
      categoryNumber: req.body.categoryNumber,
      subcategoryNumber:  req.body.subcategoryNumber,
      stock: req.body.stock,
      price: req.body.price,
      isActive: req.body.isActive,  
  });

  if (req.body.fileName) {
    // for upload image         
    const fileName = req.body.fileName;
    const fileContent=req.body.fileContent;  
        
    //const fileContent = fs.readFileSync('./image1.jpg');
    //fs.readFile('./image1.jpg', 'utf8',  (err,fileContent)=> {
    if (fileContent) {
        //return console.log(err);
        console.log(fileContent);
    }     

    //upload file to s3  
    // Setting up S3 upload parameters
    const params = {
        //Bucket: AWSCredentials.bucketName,
        Bucket: "amazonclonefsd03",
        Key: fileName,
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) 
    {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
        product.image = data.Location;

        // save s3 url as image url 
        product.save((err, product) => {
          if (err) {
              res.status(500).send({ message: err });
              return;
          } else{
              //res.send({ message: "Product added successfully!" });    
              res.send(product);
          }
        });
    });

  } else {
    // save user sent url as image url
    product.save((err, product) => 
    {
      if (err) {
          res.status(500).send({ message: err });
          return;
      } else{
          res.send({ message: "Product added successfully!" });    
          //res.send(product);
      }
    });
  }  
};

  
// delete a product --- admin
exports.deleteProduct = (req, res) => { 
  const productId = req.params.id;       
  console.log( productId );    
  Product.deleteOne( {_id :ObjectId(productId)}, (err, result) => {   
      if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(200).json(result);       
      }); 
};

 
  
  // update product info---admin only
  exports.updateProduct = (req, res) => {
    const productId =  req.params.id;

    Product.findOne( {_id :ObjectId(productId)}, (err, product) => 
    {   
        if (err) 
        {
            res.status(500).send({ message: err });
            return;
        }         
        product.name = req.body.name;
        product.description = req.body.description;   
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.categoryNumber = req.body.categoryNumber;
        product.subcategoryNumber =  req.body.subcategoryNumber;
        product.stock = req.body.stock;
        product.price = req.body.price;
        product.isActive = req.body.isActive;  
        
        // for upload image         
        if (req.body.fileName) {
          // for upload image         
          const fileName = req.body.fileName;
          const fileContent=req.body.fileContent;  
          
          if (fileContent) {
            //return console.log(err);
            console.log(fileContent);
          }     
      
          //upload file to s3  
          // Setting up S3 upload parameters
          const params = {
              //Bucket: AWSCredentials.bucketName,
              Bucket: "amazonclonefsd03",
              Key: fileName,
              Body: fileContent
          };
      
          // Uploading files to the bucket
          s3.upload(params, function(err, data) 
          {
              if (err) {
                  throw err;
              }
              console.log(`File uploaded successfully. ${data.Location}`);
              // save s3 url as image url
              product.image = data.Location;
          });  
        }

        product.save((err, product) => 
        {
            if (err) 
            {
                res.status(500).send({ message: err });
                return;
            } else
            {
                res.send({ message: "Product updated successfully!" });    
            }
        });
    });    
  };

// ---------------------------------------------Regular user------------------------------------------
   
// list products in one category
exports.getProductsByCategoryNumber = (req, res) => {
    //const categoryName = req.body.category;  
    const categoryNumber = req.params.categoryNumber; 
    Product.find({categoryNumber : categoryNumber}, (err, products) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(200).json(products);       
      });
};

// list products in one subcategory
exports.getProductsByCategoryAndSubcategoryNumber = (req, res) => {
    //const categoryName = req.body.category;  
    //const subcategoryName= req.body.subcategory;  
    const categoryNumber = req.params.categoryNumber;  
    const subcategoryNumber= req.params.subcategoryNumber; 
    Product.find({categoryNumber : categoryNumber,subcategoryNumber : subcategoryNumber}, (err, products) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(200).json(products);       
      });
};

 // get one product info
 exports.getProduct = (req, res) => {    
  const productId =  req.params.id;
   
  Product.findOne({_id :ObjectId(productId)}, (err, product) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).json(product);       
    });
};


// get products by search term ----admin/user
exports.getProductsBySearch = (req, res) => { 
  const searchTerm = req.body.searchTerm; 
  var condition = searchTerm ? { name: { $regex: new RegExp(searchTerm), $options: "i" } } : {};      
 
  Product.find(condition ,(err, products) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).json(products);       
  });
}; 

// list brands in one subcategory
exports.getBrandsByCategoryAndSubcategoryNumber = (req, res) => {
  //const categoryName = req.body.category;  
  //const subcategoryName= req.body.subcategory;  
  const categoryNumber = req.body.categoryNumber;  
  const subcategoryNumber= req.body.subcategoryNumber; 
  Product.find({categoryNumber : categoryNumber,subcategoryNumber : subcategoryNumber},{brand:1}, (err, brands) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).json(brands);       
    });
};

// list brands in one category
exports.getBrandsByCategoryNumber = (req, res) => {   
  const categoryNumber = req.params.categoryNumber;  

  Product.find({categoryNumber : categoryNumber},{brand:1}, (err, brands) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).json(brands);       
    });
};

//test product list
exports.getProductsWithName = (req, res) => {   
  const cNumber = req.params.categoryNumber;  
  const subcNumber = req.params.subcategoryNumber; 

   
    
    Product.aggregate([
     
      //      {  $match:{categoryNumber:1}},
      {
        $match: {
          $and: [
            {categoryNumber:cNumber},
            {subcategoryNumber:subcNumber}
          ]
        },
      },  
      {
          $lookup: {
              from: Category.collection.name,  //important, or use "categories",use category or categorys can't get results
              localField: "categoryNumber",
              foreignField: "categoryNumber",
              as: "category"
          }
      }     
    ], function (err, products) {
      res.status(200).json(products);   
    })
  
};



