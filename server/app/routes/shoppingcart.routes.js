const { authJwt } = require("../middlewares");
const controller = require("../controllers/shoppingcart.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  // update shoppingcart (add products item) ---admin/user
  app.put("/api/shoppingcart/add", [authJwt.verifyToken], controller.AddItemToShoppingcart);
  // update shoppingcart ---admin/user
  app.put("/api/shoppingcart/edit", [authJwt.verifyToken], controller.updateShoppingcart);
  // get current shoppingcart info ----admin/user 
  // if no shoppingcart will create a new one
  app.get("/api/shoppingcart", [authJwt.verifyToken], controller.getShoppingcart);

  // get current shoppingcart product count ----admin/user 
  // if no shoppingcart will create a new one
  app.get("/api/shoppingcart/count", [authJwt.verifyToken], controller.getShoppingcartCount);

   // update shoppingcart (move product to wishlist) ---admin/user  
  app.post("/api/shoppingcart/move", [authJwt.verifyToken], controller.MoveItemFromCartToWishlist);

  /*// update shoppingcart (delete product item) ---admin/user
  app.put("/api/shoppingcart/edit/deleteitem", [authJwt.verifyToken], controller.updateShoppingcartDeleteItem);
  // update shoppingcart (edit product number) ---admin/user
  app.put("/api/shoppingcart/edit/edititem", [authJwt.verifyToken], controller.updateShoppingcartEditItem);
  // update shoppingcart (move product to wishlist) ---admin/user
  app.put("/api/shoppingcart/edit/moveitem", [authJwt.verifyToken], controller.updateShoppingcartMoveToWishlist);
  // clear shoppingcart  ---admin/user
  app.delete("/api/shoppingcart/clear", [authJwt.verifyToken], controller.updateShoppingcartClear);
*/
 

};
