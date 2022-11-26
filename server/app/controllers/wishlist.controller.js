const config = require("../config/auth.config");
const db = require("../models");
const Wishlist = db.wishlist;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs"); 
var {ObjectId} = require('mongodb');


 // update wishlist (add product item) ---admin/user
 exports.WishlistAddItem = (req, res) => {    
    const userId = req.userId;    
    const product = req.body.product;

    Wishlist.findOne({owner:userId},(err, wishlist) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } else{
            if(wishlist){
                //add item to wishItems
                Wishlist.updateOne({_id :ObjectId(userId)}, {
                    '$set': {
                        wishItems: wishlist.wishItems.concat({ product }),
                    },
                });
            }
            res.send(wishlist);    
        }
      });
  };



 // update wishlist (move product to shoppingcart) ---admin/user
 exports.MoveItemFromWishlistToCart = (req, res) => {    
    const userId = req.userId;  
    const wishItems = req.body.wishItems;
    const cartItems =[];
    Wishlist.findOne({owner:userId},(err, wishlist) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } else{
            if(wishlist){
                //if product of product list user sent already in wishlist
                // delete items from wishlist and add to shopping cart
                for(product in wishlist.wishItems){
                    if(wishItems.indexOf(wishlist.wishItems[product]["id"])>=0)
                        //delete items from wishlist
                        wishlist.wishItems.splice(index,1);                        
                }               
               
                //add items to shoppingcart table   
               

            }
            res.send(wishlist);    
        }
      });
  };

// update wishlist  ---admin/user
 exports.UpdateWishlist = (req, res) => {    
    const userId = req.userId;  
    Wishlist.findOne({owner:userId},(err, wishlist) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } else{
            if(wishlist){
                //update item to productList              
                wishlist.wishItems = req.body.wishItems; 
                  
                wishlist.save((err, wishlist) => 
                {
                    if (err) 
                    {
                        res.status(500).send({ message: err });
                        return;
                    } else
                    {
                        res.send({ message: "Wishlist updated successfully!" });    
                    }
                });
          
            }
         //   res.send(wishlist);    
        }
      });
  };

 
  // if one item in wishlist
  app.get("/api/wishlist/confirm", [authJwt.verifyToken], controller.isItemInWishlist);
  exports.isItemInWishlist = (req, res) => {
    const userId = req.userId;  
    const product = req.body.product;    
    Wishlist.findOne({owner:userId},(err, wishlist) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } else{
            if(wishlist){
                //check if item in productList                
                wishlist.wishItems.map((item,i)=>{
                    if (item == product) {
                        //wishlist.productList.splice(i,1);    //delete repeat item
                        res.send("true");   // means item already in wishlist
                    }   
                });
            }
            //res.send(wishlist);   
            res.send("false");      //means item is not in wishlist
        }
      });
  }  


 // get wishlist info of current  user ----admin/user
 // if no wishlist will create a new one  
 exports.getWishlist = (req, res) => {
    const userId = req.userId; 
    Wishlist.findOne({owner:userId},(err, wishlist) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } else{
            if(!wishlist){
                //create a new wishlist   
                const wishlist = new Wishlist({
                    user : userId,
                    wishItems : [],                        
                });
                
                wishlist.save((err, wishlist) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    } 
                });
            }
            res.send(wishlist);    
        }
      });
  };

 

  
  