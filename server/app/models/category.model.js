const mongoose = require("mongoose");
const { category } = require(".");

const Category = mongoose.model(
  "Category",
  new mongoose.Schema({   
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100
    }, 
    categoryNumber:{
      type: Number,    // 1-9 
    },
    image: {
        type: String,
    }, 
    isActive: {
        type: Boolean,
        default: true
    }  
      
  },
  { timestamps: true })
);

module.exports = Category;

