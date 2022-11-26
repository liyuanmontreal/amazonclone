const { authJwt } = require("../middlewares");
const controller = require("../controllers/wishlist.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  // update wishlist (add product item) ---admin/user
  app.put("/api/wishlist/add", [authJwt.verifyToken], controller.WishlistAddItem);

  // if one item in wishlist
  app.get("/api/wishlist/confirm", [authJwt.verifyToken], controller.isItemInWishlist);

  // update wishlist  ---admin/user
  app.put("/api/wishlist/edit", [authJwt.verifyToken], controller.UpdateWishlist);
  
  // update wishlist (move product to shoppingcart) ---admin/user
  app.post("/api/wishlist/move", [authJwt.verifyToken], controller.MoveItemFromWishlistToCart);

  // get wishlist info of current  user ----admin/user
  // if no wishlist will create a new one
  app.get("/api/wishlist", [authJwt.verifyToken], controller.getWishlist);

  /*// update wishlist (delete product item) ---admin/user
  app.put("/api/wishlist/edit/deleteitem", [authJwt.verifyToken], controller.WishlistDeleteItem);  
  // update wishlist (clear) ---admin/user
  app.put("/api/wishlist/edit/clear", [authJwt.verifyToken], controller.WishlistClear);*/





};
