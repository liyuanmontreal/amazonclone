const mongoose = require("mongoose");
const { shoppingcart } = require(".");

const Shoppingcart = mongoose.model(
  "Shoppingcart",
  new mongoose.Schema({      
    user: 
    { type: Schema.Types.ObjectId, 
      ref: "User" 
    },
    cartItems: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },        
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true }  
      }
    ]   
  },
  { timestamps: true })
);

module.exports = Shoppingcart;

