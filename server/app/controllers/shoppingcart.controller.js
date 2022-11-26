const config = require("../config/auth.config");
const db = require("../models");
const Shoppingcart = db.shoppingcart;
const Product = db.product;
const Wishlist= db.product;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs"); 
var {ObjectId} = require('mongodb');


 
 
 // update shoppingcart (add products item) ---admin/user
exports.AddItemToShoppingcart = (req, res) => {    
    const userId = req.userId;    
    const items = req.body.cartItems;

    Shoppingcart.findOne({owner:ObjectId(userId)},(err, shoppingcart) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } else{
            if(shoppingcart){
                //for every new add product 
                // search , if already exist , add qty; // else  add new product,qty as 1
                const inCart = false;

                for(newItem in items){
                    for(curItem in shoppingcart.cartItems){
                        if (newItem.product == curItem.product){
                            //if already in shopping cart
                            inCart = true;
                            curItem.qty += newItem.qty;
                            productId = newItem.product;
                            productQty = newItem.qty;
                            break;
                        }                        
                    } 
                    if (!inCart){
                        // add new product in shopping cart
                        // update items                          
                        Product.findOne({_id :ObjectId(productId)}, (err, product) => {
                            if (err) {
                              res.status(500).send({ message: err });
                              return;
                            } else{                                  
                                const productQty =1;                          
                                const productName = product.name;
                                const productImage = product.image;
                                const productPrice = product.price;
                                shoppingcart.updateOne({_id :ObjectId(userId)}, {
                                    '$set': {
                                        cartItems: shoppingcart.cartItems.concat(
                                            {productId,productName,productQty,productImage,productPrice}),
                                    },
                                });
                            }                               
                        });
                    }
                }    
               
            }
            res.send(shoppingcart);    
        }
      });
  };

 // update shoppingcart ---admin/user
exports.updateShoppingcart = (req, res) => {    
    const userId = req.userId;  
    Shoppingcart.findOne({owner:ObjectId(userId)},(err, shoppingcart) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } else{
            if(shoppingcart){
                //update items to cartItems             
                shoppingcart.cartItems = req.body.cartItems; 
                
                  
                shoppingcart.save((err, shoppingcart) => 
                {
                    if (err) 
                    {
                        res.status(500).send({ message: err });
                        return;
                    } else
                    {
                        res.send({ message: "Shoppingcart updated successfully!" });    
                    }
                });
          
            }
         //   res.send(shoppingcart);    
        }
      });
  };

 // get current shoppingcart info ----admin/user 
 // if no shoppingcart will create a new one
 exports.getShoppingcart = (req, res) => {
    const userId = req.userId; 
    Shoppingcart.findOne({owner:ObjectId(userId)},(err, shoppingcart) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } else{
            if(!shoppingcart){
                //create a new shoppingcart  
                const shoppingcart= new Shoppingcart({
                    user : userId,
                    cartItems : [],                        
                });
                
                shoppingcart.save((err, shoppingcart) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    } 
                });
            }
            res.send(shoppingcart);    
        }
      });
  };



 // get current shoppingcart product count ----admin/user 
 // if no shoppingcart will create a new one
 app.get("/api/shoppingcart/count", [authJwt.verifyToken], controller.getShoppingcartCount);
 exports.getShoppingcartCount = (req, res) => {
    const userId = req.userId; 
    Shoppingcart.findOne({owner:ObjectId(userId)},(err, shoppingcart) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } else{
            if(!shoppingcart){
                //create a new shoppingcart  
                const shoppingcart= new Shoppingcart({
                    user : userId,
                    cartItems : [],                        
                });
                
                shoppingcart.save((err, shoppingcart) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    } 
                });
            }
            res.send(shoppingcart.cartItems.length);    
        }
      });
  };

 

 // update shoppingcart (move product to wishlist) ---admin/user
 exports.MoveItemFromCartToWishlist = (req, res) => {    
    const userId = req.userId;  
    const items = req.body.cartItems;
 
    Shoppingcart.findOne({owner:userId},(err, shoppingcart) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } else{
            if(shoppingcart){
                //if product of items user sent already in shoppingcart
                // delete items , and add to wishlist
                shoppingcart.cartItems=shoppingcart.cartItems.filter((x)=>items.every((y)=>y.product!=x.product))
                              
                //add items to wishlist, is no wishlist create a new one  
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
                        //add items to wishlist
                        updateItems = [];
                        for(newItem in items){
                            updateItems = updateItems.cat ({"product" : newItem.product});
                        }    
                        res.send(wishlist);    
                        Wishlist.updateOne({_id :ObjectId(userId)}, {
                            '$set': {
                                wishItems: wishlist.wishItems.concat(updateItems),
                            },
                        });
                    }
                    });
                    
                } 
               

            }
            res.send(shoppingcart);    
        }
      );
  };