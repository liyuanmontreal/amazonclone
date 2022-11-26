const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    firstName: { type: String},
    lastName: { type: String},
    address: { type: String},
    city: { type: String },
    province: {type: String},
    postalCode: { type: String },
  })
);

module.exports = User;
