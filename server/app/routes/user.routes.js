const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);  
  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
  app.get("/api/test/seller", [authJwt.verifyToken, authJwt.isSeller],  controller.sellerBoard);
  app.get("/api/test/admin",  [authJwt.verifyToken, authJwt.isAdmin],controller.adminBoard);


  
   // list  ----admin only
  // app.get("/api/admin/user", [authJwt.verifyToken, authJwt.isAdmin], controller.listAllUser);
  app.get("/api/admin/user", [authJwt.verifyToken], controller.listAllUser);

  // delete user ---admin only
  app.delete("/api/admin/user/delete/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser);

  // update user ---admin only
  app.put("/api/admin/user/edit/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.updateUser);

  // get user info  ----admin only
  //app.get("/api/user/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.getUser);
  app.get("/api/user/:id", [authJwt.verifyToken], controller.getUser);

  // update user password---admin/user
  app.put("/api/admin/user/edit/password/:id", [authJwt.verifyToken], controller.updateUserPassword);
  // update user info---admin/user
  app.put("/api/admin/user/edit/info/:id", [authJwt.verifyToken], controller.updateUserInfo);


};
