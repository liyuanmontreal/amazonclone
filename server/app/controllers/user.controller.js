
var bcrypt = require("bcryptjs");
var {ObjectId} = require('mongodb');

const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
var jwt = require("jsonwebtoken");


exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.sellerBoard = (req, res) => {
  res.status(200).send("Seller Content.");
};


 // ---------------------------------------------Admin user Only------------------------------------------
 // list all user  
 exports.listAllUser = (req, res) => {    
  User.find({ }, (err, users) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).json(users);       
    });
};

// delete a user --- admin
exports.deleteUser= (req, res) => { 
  const userId = req.params.id;      

  User.deleteOne( {_id :ObjectId(userId)}, (err, result) => {   
      if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(200).json(result);       
      }); 
};

// update user info---admin only
exports.updateUser = (req, res) => {
  const userId =  req.params.id;

  User.findOne( {_id :ObjectId(userId)}, (err, user) => 
  {   
      if (err) 
      {
          res.status(500).send({ message: err });
          return;
      }      
     
      user.username = req.body.username;
      user.email = req.body.email;   
      user.password = req.body.password;
      user.roles = req.body.roles;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.address = req.body.address;
      user.city = req.body.city;
      user.province = req.body.province;
      user.postalCode = req.body.postalCode;
     
        
      user.save((err, user) => 
      {
          if (err) 
          {
              res.status(500).send({ message: err });
              return;
          } else
          {
              res.send({ message: "User updated successfully!" });    
          }
      });
  });    
};


// get one user info
exports.getUser = (req, res) => {    
const userId =  req.params.id;
 
User.findOne({_id :ObjectId(userId)}, (err, user) => { 
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).json(user);       
  });
};


  

// update user password---admin/user
exports.updateUserPassword = (req, res) => {
  const userId =  req.params.id;

  User.findOne( {_id :ObjectId(userId)}, (err, user) => 
  {   
      if (err) 
      {
          res.status(500).send({ message: err });
          return;
      }   
      user.password= bcrypt.hashSync(req.body.password, 8)
        
      user.save((err, user) => 
      {
          if (err) 
          {
              res.status(500).send({ message: err });
              return;
          } else
          {
              res.send({ message: "Password changed successfully!" });    
          }
      });
  });    
};

// update user info---admin/user
exports.updateUserInfo = (req, res) => {
  const userId =  req.params.id;

  User.findOne( {_id :ObjectId(userId)}, (err, user) => 
  {   
      if (err) 
      {
          res.status(500).send({ message: err });
          return;
      } 
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.address = req.body.address;
      user.city = req.body.city;
      user.province = req.body.province;
      user.postalCode = req.body.postalCode;

      user.save((err, user) => 
      {
          if (err) 
          {
              res.status(500).send({ message: err });
              return;
          } else
          {
              res.send({ message: "User updated successfully!" });    
          }
      });
  });    
};