const mongoose = require("mongoose");
const { subcategory } = require(".");

const Subcategory = mongoose.model(
  "Subcategory",
  new mongoose.Schema({   
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100
    }, 
    image: {
        type: String,
    }, 
    isActive: {
        type: Boolean,
        default: true
    },  
    categoryNumber:{
        type: Number,           //1-9 
    },  
    subcategoryNumber:{
      type: Number,           
    }
       
  },
  { timestamps: true })
);

module.exports = Subcategory;

