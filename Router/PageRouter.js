

const PageRouter  = require("express").Router();
const HomeController = require("../controller/HomeController");
const FashionController = require("../controller/FashionControllr");
const JeweleryController = require("../controller/JeweleryController");
const ElectronicController = require("../controller/ElectronicController");
const StoreController = require("./../controller/StoreController");

PageRouter.route("/").get(HomeController.HomeUrl);
// PageRouter.route("/").get(HomeController.limitHome);
PageRouter.route("/fasion").get(FashionController.Fashion);
PageRouter.route("/jewelery").get(JeweleryController.Jewelery);
PageRouter.route("/electronics").get(ElectronicController.Electronic);
PageRouter.route("/store").get(StoreController.Store);


module.exports = PageRouter;