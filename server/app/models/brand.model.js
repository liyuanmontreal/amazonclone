const mongoose = require("mongoose");
const { brand } = require(".");


const Brand = mongoose.model(
  "Brand",
  new mongoose.Schema({   
    name: {
        type: String,
        trim: true,
        required: true     
    },  
    image: {
        type: String,        
        required: false,       
    },
    isActive:{
        type:Boolean,
        default:true
    }
  },
  { timestamps: true })
);

module.exports = Brand;

