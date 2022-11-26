const { authJwt } = require("../middlewares");
const controller = require("../controllers/order.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // list all orders---- admin only 
  app.get("/api/order/list", [authJwt.verifyToken,authJwt.isAdmin], controller.listAllOrders);

  // list orders of current user ---- admin/user
  app.get("/api/order", [authJwt.verifyToken], controller.listOrdersOfCurrentUser);
  
  // get order info by orderId ----admin/user
  app.get("/api/order/query/:id", [authJwt.verifyToken], controller.getOrderById);

  // generate new order ---admin/user
  app.post("/api/order/create", [authJwt.verifyToken], controller.generateNewOrder);

  // delete order by orderId---admin /user
  app.delete("/api/order/delete/:id", [authJwt.verifyToken], controller.deleteOrder);

  // update order info by orderId---admin /user
  app.put("/api/order/edit/:id",[authJwt.verifyToken], controller.updateOrder);

  // order is payed
  app.put("/api/order/payed/:id",[authJwt.verifyToken], controller.updateOrderToPaid);
 
  // order is delieved
  app.put("/api/order/delieved/:id",[authJwt.verifyToken], controller.updateOrderToDelieved);






};
