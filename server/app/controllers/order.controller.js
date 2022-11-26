const config = require("../config/auth.config");
const db = require("../models");
const Order = db.order;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs"); 
var {ObjectId} = require('mongodb');

 // list all orders---- admin only
 exports.listAllOrders = (req, res) => {       
  Order.find({}, (err, orders) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).json(orders);       
    });
}; 


 // list orders by userid---- admin/user
 exports.listOrdersOfCurrentUser = (req, res) => { 
    const userId = req.userId;      
    Order.find({user :userId}, (err, orders) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(200).json(orders);       
      });
  };

  
  // generate new order ---admin/user
  exports.generateNewOrder = (req, res) => {  

    /*const {orderItems,shippingAddress, itemsPrice,taxPrice,shippingPrice, totalPrice} = req.body;
   
    if (orderItems && orderItems.length === 0) {     
      res.status(400).send({message: "No order items" });
     
    } else {
      const order = new Order({
        orderItems,
        user: req.userId,
        shippingAddress,     
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });   */ 

      const amount = req.body.amount;
      const isPaid = true;
      const  paidAt = Date.now();
    
      const order = new Order({        
        user: req.userId,
        amount,   
        isPaid,
        paidAt,   
      });  
      
        order.save((err, order) => {
          if (err) {
              res.status(500).send({ message: err });
              return;
          } else{
              res.send({ message: "Order generated successfully!" });    
          }
        });
    }    
  

  // delete order by orderId---admin/user
  exports.deleteOrder = (req, res) => { 
    const orderId = req.params.id; 

    Order.deleteOne( {_id :ObjectId(orderId)}, (err, result) => {   
        if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.status(200).json(result);       
        }); 
  };

   // update order info by orderId---admin /user
  exports.updateOrder = (req, res) => {
    const orderId =  req.params.id;

    Order.findOne( {_id :ObjectId(orderId)}, (err, order) => 
    {   
        if (err) 
        {
            res.status(500).send({ message: err });
            return;
        };         
       
        order.prderItems = req.body.orderItems;        
        order.shippingAddress = req.body. shippingAddress;
        order.itemsPrice = req.body.itemsPrice;
        order.taxPrice = req.body.taxPrice;
        order.shippingPrice = req.body.shippingPrice;
        order.totalPrice = req.body.totalPrice;
          
        order.save((err, order) => 
        {
            if (err) 
            {
                res.status(500).send({ message: err });
                return;
            } else
            {
                res.send({ message: "Order updated successfully!" });    
            }
        });
    });    
  };

 // get order info by orderId ----admin/user
 exports.getOrderById = (req, res) => {    
  const orderId =  req.params.id;
   
  Product.findOne({_id :ObjectId(orderId)}, (err, order) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).json(order);       
    });
};


// ORDER IS PAID
exports.updateOrderToPaid = (req, res) => { 
  const orderId = req.params.id
  Order.findOne( {_id :ObjectId(orderId)}, (err, order) => 
    {   
        if (err) 
        {
            res.status(500).send({ message: err });
            return;
        };
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
              id: req.body.id,
              status: req.body.status,
              update_time: req.body.update_time,
              email_address: req.body.email_address,
            };
      
            order.save((err, updatedorder) => {
              if (err) {
                  res.status(500).send({ message: err });
                  return;
              } else{
                //res.send({ message: "Order updated successfully!" });   
                res.status(200).json(updatedOrder);   
              }
            });            
        } else {            
            res.status(500).send({ message: "Order not found"});
        }
    }         
  );  
  
};


// order is delieved
exports.updateOrderToDelieved = (req, res) => { 
  const orderId = req.params.id
  Order.findOne( {_id :ObjectId(orderId)}, (err, order) => 
    {   
        if (err) 
        {
            res.status(500).send({ message: err });
            return;
        };
        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
            order.save((err, updatedorder) => {
              if (err) {
                  res.status(500).send({ message: err });
                  return;
              } else{
                //res.send({ message: "Order updated successfully!" });   
                res.status(200).json(updatedOrder);   
              }
            });            
        } else {            
            res.status(500).send({ message: "Order not found"});
        }
    }         
  ); 
 };



