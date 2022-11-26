const mongoose = require("mongoose");
const { wishlist } = require(".");

const Wishlist = mongoose.model(
  "Wishlist",
  new mongoose.Schema({   
    user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
    },
    wishItems: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",    
        }        
    ],   
  },
  { timestamps: true })
);

module.exports = Wishlist;

