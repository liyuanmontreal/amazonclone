const { authJwt } = require("../middlewares");
const controller = require("../controllers/category.controller");
                                           

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
   
    next();
  });


  // list  ----admin/user  
  app.get("/api/category/list", controller.listAllCategory);
  
  // get category info by id ------admin/user
  app.get("/api/category/:id", controller.getCategory);

   // get scategory info by number  ------admin/user
   app.get("/api/category/number/:id", controller.getCategoryByNumber);

  // add new category ---admin only
  app.post("/api/admin/category/add", [authJwt.verifyToken, authJwt.isAdmin], controller.addNewCategory);

  // delete category ---admin only
  app.delete("/api/admin/category/delete/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteCategory);

  // update category info---admin only
  app.put("/api/admin/category/edit/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.updateCategory);



};
