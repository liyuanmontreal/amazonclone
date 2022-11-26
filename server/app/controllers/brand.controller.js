const config = require("../config/auth.config");
const db = require("../models");
const Brand = db.brand;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs"); 
var {ObjectId} = require('mongodb');

 // list all brands   ---- admin/user
 exports.getAllBrands = (req, res) => {    
    Brand.find({ },{name:1,image:1}, (err, brands) => {
    //Brand.find({ }, (err, brands) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(200).json(brands);       
      });
  };