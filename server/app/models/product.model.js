const mongoose = require("mongoose");
const { product } = require(".");


const Product = mongoose.model(
  "Product",
  new mongoose.Schema({   
    name: {
        type: String,
        trim: true,
        required: true     
    },
    description: {
        type: String,
        trim: true           
    },
    image: {
        type: String,
    },  
    brand: {
        type: String,        
        required: false,
        maxlength: 100
    },
    categoryNumber:{
        type: Number,  
    },
    subcategoryNumber:{
        type: Number, 
    },          
    stock: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        maxlength: 32,
        trim: true,
        default:0.0

    },
    isActive: {
        type: Boolean,
        default: true
    }
  },
  { timestamps: true })
);

module.exports = Product;

