const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.product = require("./product.model");
db.category = require("./category.model");
db.subcategory = require("./subcategory.model");
//db.brand = require("./brand.model");
db.order = require("./order.model");

db.ROLES = ["user", "admin", "seller"];

module.exports = db;