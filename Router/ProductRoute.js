const ProductRouter  = require("express").Router();
const DetailController = require("../controller/DetailsController");


ProductRouter.route("/:id").post(DetailController.findProduct);

module.exports = ProductRouter;