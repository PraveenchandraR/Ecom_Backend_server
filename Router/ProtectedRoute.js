const ProtectedRouter  = require("express").Router();
const CartController = require("../controller/CartController");

ProtectedRouter.route("/addItem").post(CartController.AddToCart);
ProtectedRouter.route("/").post(CartController.showCart);

module.exports = ProtectedRouter;