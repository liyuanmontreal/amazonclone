const { authJwt } = require("../middlewares");
const controller = require("../controllers/stripepayment.controller");


module.exports = function(app) {
    /*app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        //"x-access-token, Origin, Content-Type, Accept"
        "Origin, Content-Type, Accept"
      );
      next();
    });*/

    //app.post("/payment", [authJwt.verifyToken], controller.payment)
    app.post("/charge",  controller.payment)
};

