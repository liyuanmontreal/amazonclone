const { authJwt } = require("../middlewares");
const controller = require("../controllers/subcategory.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    
    next();
  });

 
   // list subcategories by categoryNumber  ------admin/user
   app.get("/api/subcategory/:categoryNumber", controller.getSubcategoryByCategoryNumber);

  // get subcategory info by id  ------admin/user
  app.get("/api/subcategory/list/:id", controller.getSubcategory);

   // get subcategory info by number  ------admin/user
   app.get("/api/subcategory/number/:number", controller.getSubcategoryByNumber);

  
  // add new subcategory ---admin only
  app.post("/api/admin/subcategory/add", [authJwt.verifyToken, authJwt.isAdmin], controller.addNewSubcategory);

  
  // delete subcategory ---admin only
  app.delete("/api/admin/subcategory/delete/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteSubcategory);

  
  // update subcategory info---admin only
  app.put("/api/admin/subcategory/edit/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.updateSubcategory);

};
