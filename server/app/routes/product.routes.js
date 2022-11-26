const { authJwt } = require("../middlewares");
const controller = require("../controllers/product.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    
    next();
  });


   // list  ----admin /user
   app.get("/api/admin/product", controller.listAllProduct);

  // add new product ---admin only
  app.post("/api/admin/product/add", [authJwt.verifyToken, authJwt.isAdmin], controller.addNewProduct);

  // delete product ---admin only
  app.delete("/api/admin/product/delete/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteProduct);

  // update product info---admin only
  app.put("/api/admin/product/edit/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.updateProduct);

  // get product list ---- admin/user
  app.get("/api/productlist/:categoryNumber", controller.getProductsByCategoryNumber);
  app.get("/api/productlist/:categoryNumber/:subcategoryNumber", controller.getProductsByCategoryAndSubcategoryNumber);
  
  // get brand list
  app.get("/api/subcategory/brand", controller.getBrandsByCategoryAndSubcategoryNumber);
  app.get("/api/category/brand", controller.getBrandsByCategoryNumber);

  // get product info  ----admin/user
  app.get("/api/product/:id", controller.getProduct);

 // get products by search term ----admin/user
 app.get("/api/search", controller.getProductsBySearch);

 //test
 app.get("/api/ly/test", [authJwt.verifyToken], controller.getProductsWithName);
};
